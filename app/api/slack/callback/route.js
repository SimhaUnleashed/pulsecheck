import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { auth, db } from "../../../../firebase/admin";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  const res = await fetch("https://slack.com/api/oauth.v2.access", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET,
      code,
      redirect_uri: process.env.NEXT_PUBLIC_SLACK_REDIRECT_URI,
    }),
  });

  const data = await res.json();

  if (!data.ok) {
    return NextResponse.json({ error: data.error }, { status: 400 });
  }

  const accessToken = data.access_token;
  const userId = data.authed_user?.id;

  if (!userId) {
    return NextResponse.json({ error: "User ID not found in OAuth response" }, { status: 400 });
  }

  // Get user info using users.info
  const userInfoRes = await fetch(`https://slack.com/api/users.info?user=${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const userInfo = await userInfoRes.json();

  if (!userInfo.ok) {
    return NextResponse.json({ error: userInfo.error }, { status: 400 });
  }

  const name = userInfo.user.real_name;
  console.log("Slack User Name:", name);

  const cookieStore = await cookies();
  
      const sessionCookie = cookieStore.get("session")?.value;
      if (!sessionCookie) return null;
      const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
  
      // Save to Firestore
      await db.collection("users").doc(decodedClaims.uid).set({
        slackUsername: name ?? null,
      }, { merge: true });

  // Redirect or return user data
  return NextResponse.redirect("pulsecheck-theta.vercel.app");
}
