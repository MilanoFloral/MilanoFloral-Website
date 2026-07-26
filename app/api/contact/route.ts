import { readFile } from "node:fs/promises";
import path from "node:path";

import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

import {
  contactSchema,
  type ContactInput,
} from "@/lib/validations";

export const runtime = "nodejs";

const BUSINESS_PHONE = "077 112 2907";
const BUSINESS_EMAIL = "milanofloral09@gmail.com";

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      (
        {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#039;",
          '"': "&quot;",
        } as Record<string, string>
      )[character] || character
  );
}

function getFirstName(name: string): string {
  return name.trim().split(/\s+/)[0] || "there";
}

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const appPassword = process.env.SMTP_APP_PASSWORD;

  if (!host || !user || !appPassword) {
    throw new Error(
      "Gmail SMTP is not configured. Check SMTP_HOST, SMTP_USER and SMTP_APP_PASSWORD in .env.local."
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass: appPassword,
    },
  });
}

async function loadLogo(): Promise<Buffer | null> {
  try {
    const logoPath = path.join(
      process.cwd(),
      "public",
      "milanofloral-logo-light.png"
    );

    return await readFile(logoPath);
  } catch (error) {
    console.warn(
      "Email logo could not be loaded. Emails will use the text logo instead.",
      error
    );

    return null;
  }
}

function getLogoHtml(hasLogo: boolean): string {
  if (hasLogo) {
    return `
      <img
        src="cid:milanofloral-logo"
        alt="MilanoFloral"
        width="190"
        style="
          display: block;
          width: 190px;
          max-width: 100%;
          height: auto;
          margin: 0 auto;
        "
      />
    `;
  }

  return `
    <div
      style="
        color: #ffffff;
        font-family: Georgia, serif;
        font-size: 34px;
        font-style: italic;
        text-align: center;
      "
    >
      MilanoFloral
    </div>
  `;
}

function createOwnerEmail(
  enquiry: ContactInput,
  hasLogo: boolean
): string {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width" />
      </head>

      <body
        style="
          margin: 0;
          padding: 24px;
          background: #f8f4ef;
          color: #302a28;
          font-family: Arial, Helvetica, sans-serif;
        "
      >
        <div
          style="
            max-width: 680px;
            margin: 0 auto;
            overflow: hidden;
            background: #ffffff;
            border-radius: 22px;
            box-shadow: 0 12px 40px rgba(48, 42, 40, 0.08);
          "
        >
          <div
            style="
              padding: 34px 28px;
              background: #302a28;
              text-align: center;
            "
          >
            ${getLogoHtml(hasLogo)}

            <p
              style="
                margin: 18px 0 0;
                color: rgba(255,255,255,0.65);
                font-size: 11px;
                font-weight: 700;
                letter-spacing: 2.5px;
                text-transform: uppercase;
              "
            >
              New website enquiry
            </p>
          </div>

          <div style="padding: 34px 30px;">
            <h1
              style="
                margin: 0;
                font-family: Georgia, serif;
                font-size: 30px;
                font-weight: 400;
                line-height: 1.3;
              "
            >
              New enquiry from ${escapeHtml(enquiry.name)}
            </h1>

            <p
              style="
                margin: 10px 0 28px;
                color: #766863;
                font-size: 14px;
                line-height: 1.7;
              "
            >
              A customer submitted an enquiry through the MilanoFloral
              website.
            </p>

            <table
              role="presentation"
              style="
                width: 100%;
                border-collapse: collapse;
                font-size: 14px;
              "
            >
              <tr>
                <td
                  style="
                    width: 145px;
                    padding: 13px 10px;
                    border-bottom: 1px solid #eee5e0;
                    color: #8b7770;
                  "
                >
                  Name
                </td>

                <td
                  style="
                    padding: 13px 10px;
                    border-bottom: 1px solid #eee5e0;
                    font-weight: 700;
                  "
                >
                  ${escapeHtml(enquiry.name)}
                </td>
              </tr>

              <tr>
                <td
                  style="
                    padding: 13px 10px;
                    border-bottom: 1px solid #eee5e0;
                    color: #8b7770;
                  "
                >
                  Email
                </td>

                <td
                  style="
                    padding: 13px 10px;
                    border-bottom: 1px solid #eee5e0;
                  "
                >
                  <a
                    href="mailto:${escapeHtml(enquiry.email)}"
                    style="color: #9b685e;"
                  >
                    ${escapeHtml(enquiry.email)}
                  </a>
                </td>
              </tr>

              <tr>
                <td
                  style="
                    padding: 13px 10px;
                    border-bottom: 1px solid #eee5e0;
                    color: #8b7770;
                  "
                >
                  Phone
                </td>

                <td
                  style="
                    padding: 13px 10px;
                    border-bottom: 1px solid #eee5e0;
                  "
                >
                  ${escapeHtml(enquiry.phone || "Not provided")}
                </td>
              </tr>

              <tr>
                <td
                  style="
                    padding: 13px 10px;
                    border-bottom: 1px solid #eee5e0;
                    color: #8b7770;
                  "
                >
                  Event type
                </td>

                <td
                  style="
                    padding: 13px 10px;
                    border-bottom: 1px solid #eee5e0;
                  "
                >
                  ${escapeHtml(enquiry.eventType)}
                </td>
              </tr>

              <tr>
                <td
                  style="
                    padding: 13px 10px;
                    border-bottom: 1px solid #eee5e0;
                    color: #8b7770;
                  "
                >
                  Event date
                </td>

                <td
                  style="
                    padding: 13px 10px;
                    border-bottom: 1px solid #eee5e0;
                  "
                >
                  ${escapeHtml(enquiry.eventDate || "Not decided")}
                </td>
              </tr>

              <tr>
                <td
                  style="
                    padding: 13px 10px;
                    border-bottom: 1px solid #eee5e0;
                    color: #8b7770;
                  "
                >
                  Budget
                </td>

                <td
                  style="
                    padding: 13px 10px;
                    border-bottom: 1px solid #eee5e0;
                  "
                >
                  ${escapeHtml(
                    enquiry.budget || "Customer prefers to discuss"
                  )}
                </td>
              </tr>
            </table>

            <h2
              style="
                margin: 30px 0 12px;
                font-family: Georgia, serif;
                font-size: 22px;
                font-weight: 400;
              "
            >
              Customer message
            </h2>

            <div
              style="
                padding: 20px;
                background: #f8f4ef;
                border-radius: 14px;
                color: #554945;
                font-size: 14px;
                line-height: 1.8;
                white-space: pre-wrap;
              "
            >${escapeHtml(enquiry.message)}</div>

            <div
              style="
                margin-top: 28px;
                text-align: center;
              "
            >
              <a
                href="mailto:${escapeHtml(enquiry.email)}"
                style="
                  display: inline-block;
                  padding: 14px 26px;
                  background: #b58378;
                  color: #ffffff;
                  border-radius: 999px;
                  font-size: 13px;
                  font-weight: 700;
                  text-decoration: none;
                "
              >
                Reply to ${escapeHtml(getFirstName(enquiry.name))}
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

function createCustomerEmail(
  enquiry: ContactInput,
  hasLogo: boolean
): string {
  const firstName = escapeHtml(getFirstName(enquiry.name));

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width" />
      </head>

      <body
        style="
          margin: 0;
          padding: 24px;
          background: #f8f4ef;
          color: #302a28;
          font-family: Arial, Helvetica, sans-serif;
        "
      >
        <div
          style="
            max-width: 640px;
            margin: 0 auto;
            overflow: hidden;
            background: #ffffff;
            border-radius: 22px;
            box-shadow: 0 12px 40px rgba(48, 42, 40, 0.08);
          "
        >
          <div
            style="
              padding: 38px 28px;
              background: #302a28;
              text-align: center;
            "
          >
            ${getLogoHtml(hasLogo)}
          </div>

          <div
            style="
              padding: 44px 34px;
              text-align: center;
            "
          >
            <p
              style="
                margin: 0 0 14px;
                color: #b58378;
                font-size: 11px;
                font-weight: 700;
                letter-spacing: 2.5px;
                text-transform: uppercase;
              "
            >
              Enquiry received
            </p>

            <h1
              style="
                margin: 0;
                font-family: Georgia, serif;
                font-size: 34px;
                font-weight: 400;
                line-height: 1.25;
              "
            >
              Thank you, ${firstName}.
            </h1>

            <p
              style="
                max-width: 480px;
                margin: 22px auto 0;
                color: #766863;
                font-size: 15px;
                line-height: 1.8;
              "
            >
              Your message has been sent successfully and has reached the
              MilanoFloral team.
            </p>

            <div
              style="
                max-width: 470px;
                margin: 28px auto;
                padding: 22px;
                background: #f8f4ef;
                border-radius: 16px;
              "
            >
              <p
                style="
                  margin: 0;
                  color: #554945;
                  font-family: Georgia, serif;
                  font-size: 20px;
                  line-height: 1.6;
                "
              >
                We will review your enquiry and reply as soon as possible,
                depending on availability.
              </p>
            </div>

            <p
              style="
                max-width: 480px;
                margin: 0 auto;
                color: #766863;
                font-size: 14px;
                line-height: 1.8;
              "
            >
              We look forward to learning more about your celebration and
              helping you create something beautifully personal.
            </p>

            <div
              style="
                margin-top: 32px;
                padding-top: 26px;
                border-top: 1px solid #eee5e0;
              "
            >
              <p
                style="
                  margin: 0;
                  color: #302a28;
                  font-weight: 700;
                "
              >
                MilanoFloral
              </p>

              <p
                style="
                  margin: 8px 0 0;
                  color: #8b7770;
                  font-size: 13px;
                  line-height: 1.8;
                "
              >
                ${BUSINESS_PHONE}<br />

                <a
                  href="mailto:${BUSINESS_EMAIL}"
                  style="color: #9b685e;"
                >
                  ${BUSINESS_EMAIL}
                </a>
              </p>
            </div>
          </div>

          <div
            style="
              padding: 18px;
              background: #ead8d2;
              text-align: center;
            "
          >
            <p
              style="
                margin: 0;
                color: #70524b;
                font-size: 11px;
                letter-spacing: 1.4px;
                text-transform: uppercase;
              "
            >
              Celebrations, beautifully felt.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function createOwnerText(enquiry: ContactInput): string {
  return `
New MilanoFloral website enquiry

Name: ${enquiry.name}
Email: ${enquiry.email}
Phone: ${enquiry.phone || "Not provided"}
Event type: ${enquiry.eventType}
Event date: ${enquiry.eventDate || "Not decided"}
Budget: ${enquiry.budget || "Customer prefers to discuss"}

Message:
${enquiry.message}
  `.trim();
}

function createCustomerText(enquiry: ContactInput): string {
  return `
Thank you, ${getFirstName(enquiry.name)}.

Your message has been sent successfully and has reached the MilanoFloral team.

We will review your enquiry and reply as soon as possible, depending on availability.

MilanoFloral
${BUSINESS_PHONE}
${BUSINESS_EMAIL}
  `.trim();
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = contactSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message:
            parsed.error.issues[0]?.message ||
            "Please check the details you entered.",
        },
        {
          status: 400,
        }
      );
    }

    // Hidden spam-protection field
    if (parsed.data.website) {
      return NextResponse.json({
        message: "Thank you. Your enquiry has been received.",
      });
    }

    const enquiry = parsed.data;
    const smtpUser = process.env.SMTP_USER;
    const contactToEmail =
      process.env.CONTACT_TO_EMAIL || BUSINESS_EMAIL;

    if (!smtpUser) {
      throw new Error("SMTP_USER is missing from .env.local.");
    }

    const transporter = createTransporter();
    const logoBuffer = await loadLogo();
    const hasLogo = Boolean(logoBuffer);

    const attachments = logoBuffer
      ? [
          {
            filename: "milanofloral-logo-light.png",
            content: logoBuffer,
            cid: "milanofloral-logo",
          },
        ]
      : [];

    await Promise.all([
      // Full enquiry sent to MilanoFloral
      transporter.sendMail({
        from: `"MilanoFloral Website" <${smtpUser}>`,
        to: contactToEmail,
        replyTo: enquiry.email,
        subject: `New ${enquiry.eventType} enquiry from ${enquiry.name}`,
        text: createOwnerText(enquiry),
        html: createOwnerEmail(enquiry, hasLogo),
        attachments,
      }),

      // Confirmation sent to the customer
      transporter.sendMail({
        from: `"MilanoFloral" <${smtpUser}>`,
        to: enquiry.email,
        replyTo: BUSINESS_EMAIL,
        subject: "We received your MilanoFloral enquiry",
        text: createCustomerText(enquiry),
        html: createCustomerEmail(enquiry, hasLogo),
        attachments,
      }),
    ]);

    console.log("MilanoFloral enquiry emails sent:", {
      owner: contactToEmail,
      customer: enquiry.email,
    });

    return NextResponse.json({
      message:
        "Your enquiry has been sent successfully. Please check your email for confirmation.",
    });
  } catch (error) {
    console.error("Contact email error:", error);

    return NextResponse.json(
      {
        message:
          "We could not send your enquiry. Please try again or email milanofloral09@gmail.com.",
      },
      {
        status: 500,
      }
    );
  }
}