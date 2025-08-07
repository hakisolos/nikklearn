import type { MiddlewareHandler } from "hono";
import jwt from "jsonwebtoken"
const jWT_SECRET = String(process.env.JWT_SECRET)
export const verifyToken: MiddlewareHandler = async (c, next) => {
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return c.json({ error: "Missing or invalid token" }, 401);
    }
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, jWT_SECRET);
        c.set("user", decoded); 
        await next();
    } catch (err) {
        return c.json({ error: "Invalid or expired token" }, 403);
    }
};
 
