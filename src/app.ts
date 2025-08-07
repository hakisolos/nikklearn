import { Hono } from "hono";
import auth from "./routes/auth";
const app = new Hono()

app.route("/auth", auth)


app.get("/", (c) => {
    return c.text("sucess")
})


export default app