import { existsSync, rmSync } from "fs";
import { join } from "path";
import net from "net";

const nextDir = join(process.cwd(), ".next");
const isPredev = process.env.npm_lifecycle_event === "predev";
const devPorts = [3000, 3001, 3002, 3003, 3004, 3005];

async function isPortOpen(port) {
  return new Promise((resolve) => {
    const socket = net
      .createConnection({ host: "127.0.0.1", port })
      .once("connect", () => {
        socket.destroy();
        resolve(true);
      })
      .once("error", () => resolve(false))
      .setTimeout(250, () => {
        socket.destroy();
        resolve(false);
      });
  });
}

async function hasRunningDevServer() {
  const checks = await Promise.all(devPorts.map((port) => isPortOpen(port)));
  return checks.some(Boolean);
}

if (isPredev && (await hasRunningDevServer())) {
  console.error("A local Next.js dev server is already running on port 3000-3005. Stop the old server before starting this one.");
  process.exit(1);
}

if (existsSync(nextDir)) {
  rmSync(nextDir, { recursive: true, force: true });
  console.log("Removed stale .next directory.");
}
