// Phone-width screenshots via the Chrome DevTools Protocol (no dependencies).
// Usage (server running on :3124):  MSYS_NO_PATHCONV=1 node docs/notes/tools/phone-shots.mjs <outDir> / /programs /book
// Prints scrollWidth vs viewport width (must be equal: no sideways scroll) and saves phone_*.png.
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
const [, , outDir, ...paths] = process.argv;
const W = Number(process.env.WIDTH ?? 390); // set WIDTH=1280 for desktop
const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe",
  ["--headless=new", "--remote-debugging-port=9333", `--user-data-dir=${outDir}/cdpprof`, "about:blank"]);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 30 && !target; i++) {
  try { target = (await (await fetch("http://127.0.0.1:9333/json")).json()).find((t) => t.type === "page"); } catch { await wait(300); }
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map();
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } };
const send = (method, params = {}) => new Promise((r) => { pending.set(++id, r); ws.send(JSON.stringify({ id, method, params })); });
await send("Emulation.setDeviceMetricsOverride", { width: W, height: 900, deviceScaleFactor: Number(process.env.SCALE ?? (W > 800 ? 1 : 2)), mobile: W <= 800 });
for (const p of paths) {
  await send("Page.navigate", { url: `http://localhost:3124${p}` }); await wait(2500);
  const { result } = await send("Runtime.evaluate", { expression: "JSON.stringify({sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth})", returnByValue: true });
  console.log(p, "scrollWidth vs viewport:", result.value);
  const { data } = await send("Page.captureScreenshot", { captureBeyondViewport: true, format: "png" });
  writeFileSync(`${outDir}/w${W}${p.replace(/\W/g, "_") || "_"}.png`, Buffer.from(data, "base64"));
}
ws.close(); chrome.kill();
