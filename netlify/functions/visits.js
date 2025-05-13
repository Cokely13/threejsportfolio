// functions/visits.js
import { sendEmail } from "./mail";
import { db } from "./db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("VISIT!!");
    const now = Date.now();
    await db.collection("visits").add({ time: now });
    await sendEmail({
      to: "ryan.cokely@gmail.com",
      subject: "👋 New Guest Arrived!",
      text: `Someone just entered your world at ${new Date(
        now
      ).toLocaleString()}`,
    });
    return res.status(200).json({ ok: true });
  }
  res.status(405).end();
}
