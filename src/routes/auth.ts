import { Hono } from "hono";
import { register } from "./controllers/authController";
import bcrypt from "bcrypt"
import { db } from "../database/supabase";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/authMiddleware";
const auth = new Hono()


const JWT_SECRET = String(process.env.JWT_SECRET)
auth.post("/register", async(c) => {
    const body = await c.req.json()
    if(!body.name || !body.email || !body.password || !body.role) {
        return c.json({error: "bad request"}, 401)
    }
    const password = await bcrypt.hash(body.password, 10)
    const data = await register(body.name, body.email, password, body.role)
    return c.json({message: "signup successful", data: data}, 200)
})


auth.post("/login", async(c) => {
    const body = await c.req.json()
    if(!body.email || !body.password ) {
        return c.json({error: "bad request"}, 401)
    }
    const {data, error} = await db.from("users").select("*").eq("email", body.email).single()
    if(error) {
        return c.json({error: error})
    }
    const hash = data.password
    const isMatch = await bcrypt.compare(body.password, hash)
    if(!isMatch) {
        return c.json({error: "invalid credentials"})
    }
    const token = jwt.sign(
        {
            id: data.id,
            email: data.email,
            role: data.role
        },
        JWT_SECRET,
        {expiresIn: "10d"}
    )
    return c.json({message: "login successful", token, user: {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role
    }}, 200)
})

auth.get("/protected", verifyToken, async (c) => {
    const user = c.get("user"); 

    return c.json({
        message: "You're authorized",
        user
    });
});

export default auth