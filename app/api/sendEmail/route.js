import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

const SENDING_EMAIL_ADDRESS = 'pulsecheck@test-z0vklo66v2xl7qrx.mlsender.net';
const SENDER_NAME = 'PulseCheck';

export async function POST(req) {
  const { to, subject, text } = await req.json();

  const recipients = Array.isArray(to)
    ? to.map(email => new Recipient(email))
    : [new Recipient(to)];

  const sentFrom = new Sender(SENDING_EMAIL_ADDRESS, SENDER_NAME);

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject(subject)
    .setText(text);

  try {
    const response = await mailerSend.email.send(emailParams);

    return new Response(JSON.stringify({ success: true, data: response }), { status: 200 });

  } catch (error) {
    console.error("MailerSend error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
