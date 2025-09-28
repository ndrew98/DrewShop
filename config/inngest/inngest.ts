import { Inngest } from "inngest";
import prisma from "../../prisma/client";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "drewstore" });

//Innjest Function to save user data to database
export const syncUserCreation = inngest.createFunction(
   { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
   async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url,created_at } = event.data;


    console.log("User created event received:", event.data);

     // Map Clerk data -> Prisma model
    const userData = {
      id,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      email: email_addresses[0]?.email_address || "",
      imageUrl: image_url || "",
      createdAt: new Date(created_at),
    };

    // Insert into DB with Prisma
    const user = await prisma.user.upsert({
      where: { id: userData.id },
      update: userData,
      create: userData,
    });

    console.log("User saved to DB:", user);

    return { success: true, user };
  }
);

//Inngest function to update user data in database
export const syncUserUpdate = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },      
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data; 
     console.log("User update event received:", event.data);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        email: email_addresses[0]?.email_address || "",
        imageUrl: image_url || "",
        // updatedAt gets refreshed automatically because of @updatedAt
      },
    });

    console.log("User updated in DB:", updatedUser);

    return { success: true, user: updatedUser };
  }
);

//Inngest function to delete user data from database
export const syncUserDelete = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;

    console.log("User delete event received:", event.data);

    try {
      const deletedUser = await prisma.user.delete({
        where: { id },
      });

      console.log("User deleted from DB:", deletedUser);

      return { success: true, userId: id };
    } catch (error) {
      console.error("Error deleting user:", error);

      // In case user doesn’t exist in DB (already deleted)
      return { success: false, error: "User not found", userId: id };
    }
  }
);