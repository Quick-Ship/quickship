import { EmailTemplate } from "@/components";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import "../../globals.css";

const resend = new Resend("re_itHjuTZq_8d7EuBcQwhRGRtW8Evq6gPou");

export async function POST(request: Request) {
  const { email, firstName, url } = await request.json();

  try {
    const data = await resend.emails.send({
      from: "Quickship <onboarding@resend.dev>",
      to: email,
      subject: "Reset Password",
      react: EmailTemplate({ firstName, url }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
