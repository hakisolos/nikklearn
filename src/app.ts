import { Hono } from "hono";
import auth from "./routes/auth";
import classroom from "./routes/class";
const app = new Hono()

app.route("/auth", auth)
app.route("/class", classroom)

app.get("/", (c) => {
    return c.text("worked")
})


export default app