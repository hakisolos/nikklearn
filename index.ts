import app from "./src/app";
const PORT = Number(process.env.PORT)


Bun.serve({
    fetch: app.fetch,
    port: PORT
})
console.log(`app running on http://localhost:${PORT}`);
