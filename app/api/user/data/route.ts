//Get user data from database
import { NextRequest, NextResponse } from "next/server";
import  prisma  from "@/prisma/client";
import { getAuth } from "@clerk/nextjs/server";

// GET /api/user/data
export async function GET(request: NextRequest) {
  try {
    // Get the user ID from the request using Clerk's auth
    const { userId } = getAuth(request);
    
    // If no user ID is found, return a 401 Unauthorized response
    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // Fetch the user data from the database using Prisma
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    // If no user is found, return a 404 Not Found response
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ success: false, error: "An error occurred while fetching user data" }, { status: 500 });
  }
}