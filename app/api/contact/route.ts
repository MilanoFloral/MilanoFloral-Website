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

type InlineAttachment = {
  filename: string;
  content: Buffer;
  cid: string;
  contentType: "image/png";
};

/* =========================================================
   HELPERS
========================================================= */

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

function sanitizeEmailSubject(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, 100);
}

/* =========================================================
   GMAIL SMTP
========================================================= */

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const appPassword = process.env.SMTP_APP_PASSWORD;

  if (!host || !user || !appPassword) {
    throw new Error(
      "Gmail SMTP is not configured. Check SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_APP_PASSWORD in .env.local."
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

/* =========================================================
   EMAIL LOGO
========================================================= */

async function loadEmailLogo(): Promise<Buffer | null> {
  try {
    const logoPath = path.join(
      process.cwd(),
      "public",
      "milanofloral-logo-light.png"
    );

    return await readFile(logoPath);
  } catch (error) {
    console.warn(
      "MilanoFloral email logo could not be loaded. Text branding will be used instead.",
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
        width="170"
        style="
          display: block;
          width: 170px;
          max-width: 170px;
          height: auto;
          margin: 0 auto;
          border: 0;
          outline: none;
          text-decoration: none;
        "
      />
    `;
  }

  return `
    <div
      style="
        color: #ffffff;
        -webkit-text-fill-color: #ffffff;
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 34px;
        font-style: italic;
        line-height: 1.2;
        text-align: center;
      "
    >
      MilanoFloral
    </div>
  `;
}

/* =========================================================
   EMAIL STYLES

   This attempts to keep the same light card in both
   light and dark modes.
========================================================= */

function getEmailHead(): string {
  return `
    <head>
      <meta charset="UTF-8" />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />

      <meta name="color-scheme" content="light only" />
      <meta name="supported-color-schemes" content="light" />

      <style>
        :root {
          color-scheme: light only;
          supported-color-schemes: light;
        }

        html,
        body {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          background-color: #f8f4ef !important;
          background-image: linear-gradient(
            #f8f4ef,
            #f8f4ef
          ) !important;
        }

        body,
        table,
        td,
        p,
        a,
        h1,
        h2 {
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
        }

        table {
          border-collapse: collapse;
          border-spacing: 0;
        }

        img {
          display: block;
          border: 0;
          outline: none;
          text-decoration: none;
        }

        .email-page {
          background-color: #f8f4ef !important;
          background-image: linear-gradient(
            #f8f4ef,
            #f8f4ef
          ) !important;
        }

        .email-card,
        .email-content {
          background-color: #ffffff !important;
          background-image: linear-gradient(
            #ffffff,
            #ffffff
          ) !important;
        }

        .email-header {
          background-color: #302a28 !important;
          background-image: linear-gradient(
            #302a28,
            #302a28
          ) !important;
        }

        .email-soft-box {
          background-color: #f8f4ef !important;
          background-image: linear-gradient(
            #f8f4ef,
            #f8f4ef
          ) !important;
        }

        .email-footer {
          background-color: #ead8d2 !important;
          background-image: linear-gradient(
            #ead8d2,
            #ead8d2
          ) !important;
        }

        .text-dark {
          color: #302a28 !important;
          -webkit-text-fill-color: #302a28 !important;
        }

        .text-body {
          color: #554945 !important;
          -webkit-text-fill-color: #554945 !important;
        }

        .text-muted {
          color: #766863 !important;
          -webkit-text-fill-color: #766863 !important;
        }

        .text-brand {
          color: #b58378 !important;
          -webkit-text-fill-color: #b58378 !important;
        }

        .text-footer {
          color: #70524b !important;
          -webkit-text-fill-color: #70524b !important;
        }

        .text-light {
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
        }

        .email-link {
          color: #9b685e !important;
          -webkit-text-fill-color: #9b685e !important;
        }

        .email-divider {
          border-color: #eee5e0 !important;
        }

        @media (prefers-color-scheme: dark) {
          html,
          body,
          .email-page {
            background-color: #f8f4ef !important;
            background-image: linear-gradient(
              #f8f4ef,
              #f8f4ef
            ) !important;
          }

          .email-card,
          .email-content {
            background-color: #ffffff !important;
            background-image: linear-gradient(
              #ffffff,
              #ffffff
            ) !important;
          }

          .email-header {
            background-color: #302a28 !important;
            background-image: linear-gradient(
              #302a28,
              #302a28
            ) !important;
          }

          .email-soft-box {
            background-color: #f8f4ef !important;
            background-image: linear-gradient(
              #f8f4ef,
              #f8f4ef
            ) !important;
          }

          .email-footer {
            background-color: #ead8d2 !important;
            background-image: linear-gradient(
              #ead8d2,
              #ead8d2
            ) !important;
          }

          .text-dark {
            color: #302a28 !important;
            -webkit-text-fill-color: #302a28 !important;
          }

          .text-body {
            color: #554945 !important;
            -webkit-text-fill-color: #554945 !important;
          }

          .text-muted {
            color: #766863 !important;
            -webkit-text-fill-color: #766863 !important;
          }

          .text-brand {
            color: #b58378 !important;
            -webkit-text-fill-color: #b58378 !important;
          }

          .text-footer {
            color: #70524b !important;
            -webkit-text-fill-color: #70524b !important;
          }

          .text-light {
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
          }

          .email-link {
            color: #9b685e !important;
            -webkit-text-fill-color: #9b685e !important;
          }
        }

        [data-ogsc] .email-page {
          background-color: #f8f4ef !important;
        }

        [data-ogsc] .email-card,
        [data-ogsc] .email-content {
          background-color: #ffffff !important;
        }

        [data-ogsc] .email-header {
          background-color: #302a28 !important;
        }

        [data-ogsc] .email-soft-box {
          background-color: #f8f4ef !important;
        }

        [data-ogsc] .email-footer {
          background-color: #ead8d2 !important;
        }

        [data-ogsc] .text-dark {
          color: #302a28 !important;
        }

        [data-ogsc] .text-body {
          color: #554945 !important;
        }

        [data-ogsc] .text-muted {
          color: #766863 !important;
        }

        [data-ogsc] .text-brand {
          color: #b58378 !important;
        }

        [data-ogsc] .text-footer {
          color: #70524b !important;
        }

        @media only screen and (max-width: 620px) {
          .email-wrapper {
            padding: 12px !important;
          }

          .email-header {
            padding: 26px 20px !important;
          }

          .email-content {
            padding: 34px 22px !important;
          }

          .email-heading {
            font-size: 31px !important;
          }

          .detail-label {
            width: 100px !important;
          }
        }
      </style>
    </head>
  `;
}

/* =========================================================
   OWNER EMAIL
========================================================= */

function createOwnerEmail(
  enquiry: ContactInput,
  hasLogo: boolean
): string {
  return `
    <!doctype html>

    <html lang="en">
      ${getEmailHead()}

      <body
        class="email-page"
        bgcolor="#f8f4ef"
        style="
          margin: 0;
          padding: 0;
          background-color: #f8f4ef;
          background-image: linear-gradient(#f8f4ef, #f8f4ef);
          color: #302a28;
          font-family: Arial, Helvetica, sans-serif;
        "
      >
        <table
          role="presentation"
          width="100%"
          bgcolor="#f8f4ef"
          class="email-page"
          style="
            width: 100%;
            background-color: #f8f4ef;
            background-image: linear-gradient(#f8f4ef, #f8f4ef);
          "
        >
          <tr>
            <td
              align="center"
              class="email-wrapper"
              style="padding: 24px;"
            >
              <table
                role="presentation"
                width="100%"
                bgcolor="#ffffff"
                class="email-card"
                style="
                  width: 100%;
                  max-width: 680px;
                  overflow: hidden;
                  background-color: #ffffff;
                  background-image: linear-gradient(#ffffff, #ffffff);
                  border: 1px solid #eee5e0;
                  border-radius: 22px;
                "
              >
                <tr>
                  <td
                    align="center"
                    bgcolor="#302a28"
                    class="email-header"
                    style="
                      padding: 32px 24px;
                      background-color: #302a28;
                      background-image: linear-gradient(#302a28, #302a28);
                      text-align: center;
                    "
                  >
                    ${getLogoHtml(hasLogo)}

                    <p
                      class="text-light"
                      style="
                        margin: 18px 0 0;
                        color: #ffffff;
                        -webkit-text-fill-color: #ffffff;
                        font-size: 11px;
                        font-weight: 700;
                        letter-spacing: 2.5px;
                        text-transform: uppercase;
                      "
                    >
                      New website enquiry
                    </p>
                  </td>
                </tr>

                <tr>
                  <td
                    bgcolor="#ffffff"
                    class="email-content"
                    style="
                      padding: 38px 32px;
                      background-color: #ffffff;
                      background-image: linear-gradient(#ffffff, #ffffff);
                    "
                  >
                    <h1
                      class="text-dark email-heading"
                      style="
                        margin: 0;
                        color: #302a28;
                        -webkit-text-fill-color: #302a28;
                        font-family: Georgia, 'Times New Roman', serif;
                        font-size: 30px;
                        font-weight: 400;
                        line-height: 1.3;
                      "
                    >
                      New enquiry from ${escapeHtml(enquiry.name)}
                    </h1>

                    <p
                      class="text-muted"
                      style="
                        margin: 12px 0 28px;
                        color: #766863;
                        -webkit-text-fill-color: #766863;
                        font-size: 14px;
                        line-height: 1.7;
                      "
                    >
                      A customer submitted an enquiry through the
                      MilanoFloral website.
                    </p>

                    <table
                      role="presentation"
                      width="100%"
                      style="
                        width: 100%;
                        font-size: 14px;
                      "
                    >
                      <tr>
                        <td
                          class="text-muted email-divider detail-label"
                          style="
                            width: 145px;
                            padding: 14px 10px;
                            border-bottom: 1px solid #eee5e0;
                            color: #766863;
                          "
                        >
                          Name
                        </td>

                        <td
                          class="text-dark email-divider"
                          style="
                            padding: 14px 10px;
                            border-bottom: 1px solid #eee5e0;
                            color: #302a28;
                            font-weight: 700;
                          "
                        >
                          ${escapeHtml(enquiry.name)}
                        </td>
                      </tr>

                      <tr>
                        <td
                          class="text-muted email-divider"
                          style="
                            padding: 14px 10px;
                            border-bottom: 1px solid #eee5e0;
                            color: #766863;
                          "
                        >
                          Email
                        </td>

                        <td
                          class="email-divider"
                          style="
                            padding: 14px 10px;
                            border-bottom: 1px solid #eee5e0;
                            word-break: break-word;
                          "
                        >
                          <a
                            href="mailto:${escapeHtml(enquiry.email)}"
                            class="email-link"
                            style="
                              color: #9b685e;
                              -webkit-text-fill-color: #9b685e;
                              text-decoration: underline;
                            "
                          >
                            ${escapeHtml(enquiry.email)}
                          </a>
                        </td>
                      </tr>

                      <tr>
                        <td
                          class="text-muted email-divider"
                          style="
                            padding: 14px 10px;
                            border-bottom: 1px solid #eee5e0;
                            color: #766863;
                          "
                        >
                          Phone
                        </td>

                        <td
                          class="text-dark email-divider"
                          style="
                            padding: 14px 10px;
                            border-bottom: 1px solid #eee5e0;
                            color: #302a28;
                          "
                        >
                          ${escapeHtml(
                            enquiry.phone || "Not provided"
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td
                          class="text-muted email-divider"
                          style="
                            padding: 14px 10px;
                            border-bottom: 1px solid #eee5e0;
                            color: #766863;
                          "
                        >
                          Event type
                        </td>

                        <td
                          class="text-dark email-divider"
                          style="
                            padding: 14px 10px;
                            border-bottom: 1px solid #eee5e0;
                            color: #302a28;
                          "
                        >
                          ${escapeHtml(enquiry.eventType)}
                        </td>
                      </tr>

                      <tr>
                        <td
                          class="text-muted email-divider"
                          style="
                            padding: 14px 10px;
                            border-bottom: 1px solid #eee5e0;
                            color: #766863;
                          "
                        >
                          Event date
                        </td>

                        <td
                          class="text-dark email-divider"
                          style="
                            padding: 14px 10px;
                            border-bottom: 1px solid #eee5e0;
                            color: #302a28;
                          "
                        >
                          ${escapeHtml(
                            enquiry.eventDate || "Not decided"
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td
                          class="text-muted email-divider"
                          style="
                            padding: 14px 10px;
                            border-bottom: 1px solid #eee5e0;
                            color: #766863;
                          "
                        >
                          Budget
                        </td>

                        <td
                          class="text-dark email-divider"
                          style="
                            padding: 14px 10px;
                            border-bottom: 1px solid #eee5e0;
                            color: #302a28;
                          "
                        >
                          ${escapeHtml(
                            enquiry.budget ||
                              "Customer prefers to discuss"
                          )}
                        </td>
                      </tr>
                    </table>

                    <h2
                      class="text-dark"
                      style="
                        margin: 30px 0 14px;
                        color: #302a28;
                        font-family: Georgia, 'Times New Roman', serif;
                        font-size: 22px;
                        font-weight: 400;
                      "
                    >
                      Customer message
                    </h2>

                    <table
                      role="presentation"
                      width="100%"
                      bgcolor="#f8f4ef"
                      class="email-soft-box"
                      style="
                        width: 100%;
                        background-color: #f8f4ef;
                        background-image: linear-gradient(#f8f4ef, #f8f4ef);
                        border-radius: 14px;
                      "
                    >
                      <tr>
                        <td
                          class="text-body"
                          style="
                            padding: 20px;
                            color: #554945;
                            font-size: 14px;
                            line-height: 1.8;
                            white-space: pre-wrap;
                          "
                        >${escapeHtml(enquiry.message)}</td>
                      </tr>
                    </table>

                    <table
                      role="presentation"
                      align="center"
                      style="margin: 30px auto 0;"
                    >
                      <tr>
                        <td
                          align="center"
                          bgcolor="#b58378"
                          style="
                            background-color: #b58378;
                            background-image: linear-gradient(#b58378, #b58378);
                            border-radius: 999px;
                          "
                        >
                          <a
                            href="mailto:${escapeHtml(enquiry.email)}"
                            style="
                              display: inline-block;
                              padding: 14px 26px;
                              color: #ffffff;
                              -webkit-text-fill-color: #ffffff;
                              font-size: 13px;
                              font-weight: 700;
                              text-decoration: none;
                            "
                          >
                            Reply to ${escapeHtml(
                              getFirstName(enquiry.name)
                            )}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

/* =========================================================
   CUSTOMER CONFIRMATION EMAIL
========================================================= */

function createCustomerEmail(
  enquiry: ContactInput,
  hasLogo: boolean
): string {
  const firstName = escapeHtml(
    getFirstName(enquiry.name)
  );

  return `
    <!doctype html>

    <html lang="en">
      ${getEmailHead()}

      <body
        class="email-page"
        bgcolor="#f8f4ef"
        style="
          margin: 0;
          padding: 0;
          background-color: #f8f4ef;
          background-image: linear-gradient(#f8f4ef, #f8f4ef);
          color: #302a28;
          font-family: Arial, Helvetica, sans-serif;
        "
      >
        <table
          role="presentation"
          width="100%"
          bgcolor="#f8f4ef"
          class="email-page"
          style="
            width: 100%;
            background-color: #f8f4ef;
            background-image: linear-gradient(#f8f4ef, #f8f4ef);
          "
        >
          <tr>
            <td
              align="center"
              class="email-wrapper"
              style="padding: 24px;"
            >
              <table
                role="presentation"
                width="100%"
                bgcolor="#ffffff"
                class="email-card"
                style="
                  width: 100%;
                  max-width: 640px;
                  overflow: hidden;
                  background-color: #ffffff;
                  background-image: linear-gradient(#ffffff, #ffffff);
                  border: 1px solid #eee5e0;
                  border-radius: 22px;
                "
              >
                <tr>
                  <td
                    align="center"
                    bgcolor="#302a28"
                    class="email-header"
                    style="
                      padding: 32px 24px;
                      background-color: #302a28;
                      background-image: linear-gradient(#302a28, #302a28);
                      text-align: center;
                    "
                  >
                    ${getLogoHtml(hasLogo)}
                  </td>
                </tr>

                <tr>
                  <td
                    align="center"
                    bgcolor="#ffffff"
                    class="email-content"
                    style="
                      padding: 44px 34px;
                      background-color: #ffffff;
                      background-image: linear-gradient(#ffffff, #ffffff);
                      text-align: center;
                    "
                  >
                    <p
                      class="text-brand"
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
                      class="text-dark email-heading"
                      style="
                        margin: 0;
                        color: #302a28;
                        font-family: Georgia, 'Times New Roman', serif;
                        font-size: 36px;
                        font-weight: 400;
                        line-height: 1.25;
                      "
                    >
                      Thank you, ${firstName}.
                    </h1>

                    <p
                      class="text-muted"
                      style="
                        max-width: 480px;
                        margin: 24px auto 0;
                        color: #766863;
                        font-size: 15px;
                        line-height: 1.8;
                      "
                    >
                      Your message has been sent successfully and has
                      reached the MilanoFloral team.
                    </p>

                    <table
                      role="presentation"
                      width="100%"
                      bgcolor="#f8f4ef"
                      class="email-soft-box"
                      style="
                        width: 100%;
                        max-width: 470px;
                        margin: 30px auto;
                        background-color: #f8f4ef;
                        background-image: linear-gradient(#f8f4ef, #f8f4ef);
                        border-radius: 16px;
                      "
                    >
                      <tr>
                        <td
                          align="center"
                          style="padding: 24px;"
                        >
                          <p
                            class="text-body"
                            style="
                              margin: 0;
                              color: #554945;
                              font-family: Georgia, 'Times New Roman', serif;
                              font-size: 20px;
                              line-height: 1.6;
                            "
                          >
                            We will review your enquiry and reply as
                            soon as possible, depending on availability.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <p
                      class="text-muted"
                      style="
                        max-width: 480px;
                        margin: 0 auto;
                        color: #766863;
                        font-size: 14px;
                        line-height: 1.8;
                      "
                    >
                      We look forward to learning more about your
                      celebration and helping you create something
                      beautifully personal.
                    </p>

                    <div
                      class="email-divider"
                      style="
                        margin-top: 34px;
                        padding-top: 28px;
                        border-top: 1px solid #eee5e0;
                      "
                    >
                      <p
                        class="text-dark"
                        style="
                          margin: 0;
                          color: #302a28;
                          font-size: 15px;
                          font-weight: 700;
                        "
                      >
                        MilanoFloral
                      </p>

                      <p
                        class="text-muted"
                        style="
                          margin: 10px 0 0;
                          color: #766863;
                          font-size: 13px;
                          line-height: 1.9;
                        "
                      >
                        <a
                          href="tel:+94771122907"
                          class="email-link"
                          style="
                            color: #9b685e;
                            text-decoration: none;
                          "
                        >
                          ${BUSINESS_PHONE}
                        </a>

                        <br />

                        <a
                          href="mailto:${BUSINESS_EMAIL}"
                          class="email-link"
                          style="
                            color: #9b685e;
                            text-decoration: underline;
                          "
                        >
                          ${BUSINESS_EMAIL}
                        </a>
                      </p>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td
                    align="center"
                    bgcolor="#ead8d2"
                    class="email-footer"
                    style="
                      padding: 20px;
                      background-color: #ead8d2;
                      background-image: linear-gradient(#ead8d2, #ead8d2);
                      text-align: center;
                    "
                  >
                    <p
                      class="text-footer"
                      style="
                        margin: 0;
                        color: #70524b;
                        font-size: 11px;
                        letter-spacing: 1.5px;
                        text-transform: uppercase;
                      "
                    >
                      Celebrations, beautifully felt.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

/* =========================================================
   PLAIN-TEXT FALLBACKS
========================================================= */

function createOwnerText(
  enquiry: ContactInput
): string {
  return `
New MilanoFloral website enquiry

Name: ${enquiry.name}
Email: ${enquiry.email}
Phone: ${enquiry.phone || "Not provided"}
Event type: ${enquiry.eventType}
Event date: ${enquiry.eventDate || "Not decided"}
Budget: ${
    enquiry.budget || "Customer prefers to discuss"
  }

Message:
${enquiry.message}
  `.trim();
}

function createCustomerText(
  enquiry: ContactInput
): string {
  return `
Thank you, ${getFirstName(enquiry.name)}.

Your message has been sent successfully and has reached the MilanoFloral team.

We will review your enquiry and reply as soon as possible, depending on availability.

MilanoFloral
${BUSINESS_PHONE}
${BUSINESS_EMAIL}
  `.trim();
}

/* =========================================================
   CONTACT API
========================================================= */

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

    // Honeypot spam-protection field
    if (parsed.data.website) {
      return NextResponse.json({
        message:
          "Thank you. Your enquiry has been received.",
      });
    }

    const enquiry = parsed.data;
    const smtpUser = process.env.SMTP_USER;

    const contactToEmail =
      process.env.CONTACT_TO_EMAIL ||
      BUSINESS_EMAIL;

    if (!smtpUser) {
      throw new Error(
        "SMTP_USER is missing from .env.local."
      );
    }

    const transporter = createTransporter();

    const logoBuffer = await loadEmailLogo();
    const hasLogo = Boolean(logoBuffer);

    /*
      No contentDisposition property is needed.
      The CID automatically embeds the image inline.
    */
    const attachments: InlineAttachment[] =
      logoBuffer
        ? [
            {
              filename:
                "milanofloral-logo-light.png",
              content: logoBuffer,
              cid: "milanofloral-logo",
              contentType: "image/png",
            },
          ]
        : [];

    await Promise.all([
      transporter.sendMail({
        from: `"MilanoFloral Website" <${smtpUser}>`,
        to: contactToEmail,
        replyTo: enquiry.email,
        subject: `New ${sanitizeEmailSubject(
          enquiry.eventType
        )} enquiry from ${sanitizeEmailSubject(
          enquiry.name
        )}`,
        text: createOwnerText(enquiry),
        html: createOwnerEmail(
          enquiry,
          hasLogo
        ),
        attachments,
      }),

      transporter.sendMail({
        from: `"MilanoFloral" <${smtpUser}>`,
        to: enquiry.email,
        replyTo: BUSINESS_EMAIL,
        subject:
          "We received your MilanoFloral enquiry",
        text: createCustomerText(enquiry),
        html: createCustomerEmail(
          enquiry,
          hasLogo
        ),
        attachments,
      }),
    ]);

    console.log(
      "MilanoFloral enquiry emails sent:",
      {
        owner: contactToEmail,
        customer: enquiry.email,
      }
    );

    return NextResponse.json({
      message:
        "Your enquiry has been sent successfully. Please check your email for confirmation.",
    });
  } catch (error) {
    console.error(
      "Contact email error:",
      error
    );

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