import app from "./app.ts";
Bun.serve({
    port: 3000,
    fetch: app.fetch
  });

console.log("Server running!");