import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch(
      "https://tryhackme.com/api/v2/public-profile?username=jihad269200",
      { 
        next: { revalidate: 300 }, // Cache 5 minutes pour mise à jour plus fréquente
        headers: {
          'Accept': 'application/json',
        }
      }
    )
    
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch TryHackMe data" },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
