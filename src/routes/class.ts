import { Hono } from "hono";
import { requireRole } from "../middlewares/classroomMIddleware";
import { generateRandom } from "./controllers/utils";
import { db } from "../database/supabase";
import { verifyToken } from "../middlewares/authMiddleware";
import type { User } from "../types";
const classroom = new Hono()



classroom.post("/newClass", verifyToken, requireRole("teacher"), async(c) => {
    let {title, description, createdBy, joinCode, students = [], isLive, schedule} = await c.req.json()
    if(!title || !description  || !schedule) {
        return c.json({error: "bad request"}, 401)
    }
    joinCode = generateRandom(10)
    isLive = false
    const teacher = c.get("user") as User
    const name = teacher.email.split("@")[0]
    if(!teacher) {
        return c.json({error: "not authorized"})
    }
    const parsedSchedule = new Date(schedule);
    if (isNaN(parsedSchedule.getTime())) {
    return c.json({ error: "Invalid date format" }, 400);
    }
  
    const {data, error} = await db.from("classroom").insert([{
        title: title,
        description: description,
        createdBy: name,
        joinCode: joinCode,
        students: students,
        isLive: isLive,
        schedule: parsedSchedule.toISOString(),
    }]).select()
    if(error) {
        return c.json({error: error})
    }
    return c.json({message: "classroom created successfully", data: data}, 200)
})



classroom.post("/startClass", verifyToken, requireRole("teacher"), async (c) => {
    const { joinCode } = await c.req.json();
    if (!joinCode) {
        return c.json({ error: "bad request" }, 400);
    }
    const { data, error } = await db
        .from("classroom")
        .select("*")
        .eq("joinCode", joinCode)
        .single();

    if (error) {
        return c.json({ error: error.message }, 500);
    }
    if (!data) {
        return c.json({ error: "classroom not found" }, 404);
    }
    if (data.isLive) {
        return c.json({ message: "classroom already live" }, 200);
    }
    const { error: updateError } = await db
        .from("classroom")
        .update({ isLive: true })
        .eq("joinCode", joinCode);

    if (updateError) {
        return c.json({ error: updateError.message }, 500);
    }
    return c.json({
        message: "Classroom is now live",
        classroom: {
            title: data.title,
            createdBy: data.createdBy,
            joinCode: data.joinCode,
            schedule: data.schedule,
            isLive: true,
        },
    }, 200);
});


classroom.post("/endClass", verifyToken, requireRole("teacher"), async (c) => {
    const { joinCode } = await c.req.json();
    if (!joinCode) {
        return c.json({ error: "bad request" }, 400);
    }
    const { data, error } = await db
        .from("classroom")
        .select("*")
        .eq("joinCode", joinCode)
        .single();

    if (error) {
        return c.json({ error: error.message }, 500);
    }
    if (!data) {
        return c.json({ error: "classroom not found" }, 404);
    }
    if (!data.isLive) {
        return c.json({ message: "classroom already ended " }, 200);
    }

    const { error: updateError } = await db
        .from("classroom")
        .update({ isLive: false })
        .eq("joinCode", joinCode);

    if (updateError) {
        return c.json({ error: updateError.message }, 500);
    }
    return c.json({
        message: "Classroom has ended",
        classroom: {
            title: data.title,
            createdBy: data.createdBy,
            joinCode: data.joinCode,
            schedule: data.schedule,
            isLive: false,
        },
    }, 200);
});

classroom.get("/board/:id", verifyToken, async(c) => {
    const roomcode = c.req.param("id")
    if(!roomcode) {
        return c.json({error: "roomcode needed as /id"}, 200)
    }
    const {data, error} = await db.from("classroom").select("*").eq("joinCode", roomcode).single()
    if(error){
        return c.json({error: error})
    }
    if(!data) {
        return c.json({error: "no classroom open with this code"})
    }
    return c.json({
       classDetails: {
        title: data.title,
        createdBy: data.createdBy,
        joinCode: data.joinCode,
        schedule: data.schedule,
        isLive: data.isLive
       }
    }, 200)  
})




export default classroom;





