"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireTokens } from "@/lib/auth";
import { activitySchema } from "@/schemas/schemas";
import { addActivity } from "@/services/activities/addActivity-service";
import { updateActivity } from "@/services/activities/updateActivity-service";
import { deleteActivity } from "@/services/activities/deleteActivity-service";

//---------- Create activity from Instructor  ----------
export async function createActivityData(prevState, formData) {
  
  const { token } = await requireTokens();

  const newData = {
    name: formData.get("name"),
    description: formData.get("description"),
    weekday: formData.get("weekday"),
    time: formData.get("time"),
    minAge: formData.get("minAge"),
    maxAge: formData.get("maxAge"),
    maxParticipants: formData.get("maxParticipants"),
    file: formData.get("file")
  };

  if ( prevState?.values && 
        newData.name === prevState.values.name && 
        newData.description === prevState.values.description && 
        newData.weekday === prevState.values.weekday &&
        newData.time === prevState.values.time &&
        newData.maxParticipants === prevState.values.maxParticipants &&
        newData.minAge === prevState.values.minAge &&
        newData.maxAge === prevState.values.maxAge &&
        newData.file === prevState.values.file
      ) {
    return prevState;
  }
 
  const validationResult = activitySchema.safeParse(newData);

  if (!validationResult.success) {
    return {
      values: newData,
      errors: z.flattenError(validationResult.error).fieldErrors,
    };
  }

  const payload = new FormData();
  payload.append("name", newData.name);
  payload.append("description", newData.description);
  payload.append("weekday", newData.weekday);
  payload.append("time", newData.time);
  payload.append("maxParticipants", newData.maxParticipants);
  payload.append("minAge", newData.minAge);
  payload.append("maxAge", newData.maxAge);
  payload.append("file", newData.file);
  
  try {    
    await addActivity(token, payload);
  } catch (err) {
    return {
      payload,
      errors: { form: err.message || "Something went wrong" },
    };
  };
  
  redirect("/instructor");
}

//------ Update activity from Instructor -----------//
export async function updateActivityData(id, prevState, formData) {
  const { token } = await requireTokens();

  const name = formData.get("name");
  const description = formData.get("description");
  const weekday = formData.get("weekday");
  const time = formData.get("time");
  const maxParticipants = formData.get("maxParticipants");
  const minAge = formData.get("minAge");
  const maxAge = formData.get("maxAge");
  const file = formData.get("file");

  if ( prevState?.values && 
        name === prevState.values.name && 
        description === prevState.values.description && 
        weekday === prevState.values.weekday &&
        time === prevState.values.time &&
        maxParticipants === prevState.values.maxParticipants &&
        minAge === prevState.values.minAge &&
        maxAge === prevState.values.maxAge &&
        file === prevState.values.file
      ) {
    return prevState;
  }

  //Build FormData
  const payload = new FormData();

  payload.append("name", name);
  payload.append("description", description);
  payload.append("weekday", weekday);
  payload.append("time", time);
  payload.append("maxParticipants", maxParticipants);
  payload.append("minAge", minAge);
  payload.append("maxAge", maxAge);
  // payload.append("file", file);
  if (file && file.size > 0) {
    payload.append("file", file);
  }

  try {
    await updateActivity(token, id, payload);
    revalidatePath(`/activities/${id}`);
  } catch (err) {
    return {
      payload,
      errors: { form: "Something went wrong" },
    };
  }
  redirect("/instructor");
}

//----------- Delete Activity Action from Instructor ----------
export async function removeActivity(id) {
  await deleteActivity(id);
  redirect("/instructor");
}
