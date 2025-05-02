import { auth, db } from "../../../firebase/admin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { idToken, githubUsername } = body;

    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get("session")?.value;
    if (!sessionCookie) return null;
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    // Save to Firestore
    await db.collection("users").doc(decodedClaims.uid).set({
      githubUsername: githubUsername ?? null,
    }, { merge: true });

    return NextResponse.json({ error: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Session login error:", error.message);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}