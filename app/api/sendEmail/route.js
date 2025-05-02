import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { to, subject, text } = await req.json();

  try {
    const data = await resend.emails.send({
      from: 'Pulse Check <onboarding@resend.dev>', 
      to,
      subject,
      text,
    });
    console.log(data);
    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (error) {
    console.error("Resend error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
