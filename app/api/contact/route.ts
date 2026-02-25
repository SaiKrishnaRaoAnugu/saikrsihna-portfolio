// ✅ Force Node.js runtime (VERY IMPORTANT for Vercel env variables)
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // ✅ Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // ✅ Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // ✅ Read environment variables safely
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CONTACT_EMAIL = process.env.CONTACT_EMAIL;
    const SEND_FROM_EMAIL =
      process.env.SEND_FROM_EMAIL || "onboarding@resend.dev";

    // 🚨 Check if API key exists
    if (!RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY not found in environment variables");

      return NextResponse.json(
        { error: "Server email configuration missing." },
        { status: 500 }
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    console.log("📨 Sending email with:", {
      from: SEND_FROM_EMAIL,
      to: CONTACT_EMAIL,
      subject: `New Portfolio Contact: ${subject}`,
    });

    // ✅ Send email
    const sendResult = await resend.emails.send({
      from: SEND_FROM_EMAIL,
      to: CONTACT_EMAIL || "saikrishnraoanugu@gmail.com",
      subject: `New Portfolio Contact: ${subject}`,
      html: `
        <h2>New Message from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    // 🚨 Handle resend errors
    if ((sendResult as any)?.error) {
      console.error("❌ Resend returned error:", sendResult);
      return NextResponse.json(
        { error: "Failed to send email." },
        { status: 500 }
      );
    }

    console.log("✅ Email sent successfully:", (sendResult as any)?.id);

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully! I'll get back to you soon.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Contact form error:", error);

    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}