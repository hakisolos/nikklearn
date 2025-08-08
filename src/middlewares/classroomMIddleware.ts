import type { MiddlewareHandler } from "hono";

export const requireRole = (role: string) : MiddlewareHandler => {
    return async(c, next) => {
        const user = c.get("user")
        if(!user) {
            return c.json({error: "not authorized"}, 401)
        }
        const userrole = user.role

        if(userrole !== role) {
            return c.json({error: `insufficiuent permissions, you must be a/an ${role}`}, 401)
        }
        await next()
    }
}

