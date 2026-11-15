import { NextResponse } from "next/server";
import { checkBreachWithHIBP } from "@/lib/securityUtils";

/**
 * POST /api/checkBreach
 * 
 * Endpoint to check password against HIBP breach database.
 * Password is hashed (SHA-1) before being sent to HIBP API.
 * 
 * @param {Request} req - Incoming request with JSON body containing { password }
 * @returns {NextResponse} JSON response with breach analysis or error
 */
export async function POST(req) {
  try {
    const { password } = await req.json();

    // Validate input
    if (!password) {
      return NextResponse.json(
        { message: "Password field required" }, 
        { status: 400 }
      );
    }

    // Perform breach check via HIBP (hash-based)
    const result = await checkBreachWithHIBP(password);
    return NextResponse.json(result);

  } catch (err) {
    console.error("❌ HIBP Breach Check API Error:", err);

    return NextResponse.json(
      { 
        message: "Internal server error during breach analysis", 
        error: err.message 
      }, 
      { status: 500 }
    );
  }
}