import { db } from "../../database/supabase";
import { logger } from "./logger";
export const register = async(name: string, email: string, password: string, role: string) => {
    if(!name || !email || !password || !role) {
        logger.error("invalid credentials")
        return
    }
    const {data, error} = await db.from("users").insert([{name, email, password, role}])
    if(error) {
        logger.error(error)
    }
    logger.success("signup successful")
    return data
}

