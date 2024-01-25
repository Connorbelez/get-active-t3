'use server'
 
import { revalidatePath } from 'next/cache'
 
export async function revalid() {
  try {
    // ...
  } catch (error) {
    // ...
  }
 
  
  revalidatePath('/')
  revalidatePath("/events")
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/manageevents")
}
