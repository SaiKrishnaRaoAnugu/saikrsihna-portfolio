import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // TODO: Configure your email service here
    // Option 1: Using Resend (recommended for Next.js)
    // Install: npm install resend
    // Get API key from https://resend.com and add to `.env.local` as `RESEND_API_KEY`
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        console.log("Sending email with:", {
          from: process.env.SEND_FROM_EMAIL,
          to: process.env.CONTACT_EMAIL,
          subject: `New Portfolio Contact: ${subject}`,
        });

        const sendResult = await resend.emails.send({
          from: process.env.SEND_FROM_EMAIL || "noreply@yourdomain.com",
          to: process.env.CONTACT_EMAIL || "saikrishnraoanugu@gmail.com",
          subject: `New Portfolio Contact: ${subject}`,
          html: `
            <h2>New Message from ${name}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          `,
        });

        console.log("Resend response:", JSON.stringify(sendResult, null, 2));

        // Check if there's an error in the response
        if ((sendResult as any).error) {
          console.error("❌ Resend returned error:", (sendResult as any).error);
          return NextResponse.json(
            { 
              error: "Failed to send email",
              details: (sendResult as any).error,
            }, 
            { status: 500 }
          );
        }

        console.log("✅ Email sent successfully:", (sendResult as any).id);

        return NextResponse.json(
          { 
            success: true,
            message: "Message sent successfully! I'll get back to you soon.",
            emailId: (sendResult as any).id,
          },
          { status: 200 }
        );
      } catch (resendErr: any) {
        console.error("❌ Resend error:", resendErr);
        return NextResponse.json(
          { 
            error: "Failed to send email via Resend.",
            details: resendErr?.message || String(resendErr),
          }, 
          { status: 500 }
        );
      }
    } else {
      // Resend not configured yet; log submission and return success placeholder
      console.log("⚠️ RESEND_API_KEY not found - skipping email send. Submission:", {
        name,
        email,
        subject,
        message,
      });
      return NextResponse.json(
        {
          success: true,
          message:
            "Submission received. RESEND_API_KEY is not configured yet — add it to .env.local and restart the server to enable email sending.",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
