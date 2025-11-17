'use server'

import nodemailer from 'nodemailer'
import { z } from 'zod'

// Validation Schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  projectType: z.string().optional(),
  budget: z.string().optional(),
})

export async function sendContactEmail(formData: any) {
  console.log("--- Contact Form Submission Started ---");
  
  // 1. Check Environment Variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("❌ Error: Missing EMAIL_USER or EMAIL_PASS in .env.local");
    return { success: false, error: "Server configuration error." };
  }

  // 2. Validate Input
  const result = contactFormSchema.safeParse(formData)

  if (!result.success) {
    console.error("❌ Validation Failed:", result.error.flatten());
    return { success: false, error: "Validation failed. Please check inputs (Message > 10 chars)." }
  }

  const { name, email, subject, message, projectType, budget } = result.data
  console.log("✅ Validation Passed. Sending email...");

  // 3. Configure Transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
  })

  try {
    // 4. Send Email with Enhanced Template
    const info = await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: message,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 20px;">
            <tr>
              <td align="center">
                <!-- Main Container -->
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                        💼 New Contact Message
                      </h1>
                      <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 14px;">
                        From your portfolio website
                      </p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      
                      <!-- Sender Info Card -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #667eea; margin-bottom: 30px;">
                        <tr>
                          <td style="padding: 20px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding: 8px 0;">
                                  <span style="color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">From</span>
                                  <p style="margin: 5px 0 0 0; color: #111827; font-size: 16px; font-weight: 600;">${name}</p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 8px 0;">
                                  <span style="color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
                                  <p style="margin: 5px 0 0 0;">
                                    <a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-size: 15px;">${email}</a>
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Project Details -->
                      ${projectType || budget ? `
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                        <tr>
                          <td>
                            <h2 style="margin: 0 0 15px 0; color: #111827; font-size: 18px; font-weight: 600;">Project Details</h2>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <table width="100%" cellpadding="0" cellspacing="0">
                              ${projectType ? `
                              <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                                  <span style="color: #6b7280; font-size: 14px;">Project Type</span>
                                  <p style="margin: 5px 0 0 0; color: #111827; font-size: 15px; font-weight: 500;">${projectType}</p>
                                </td>
                              </tr>
                              ` : ''}
                              ${budget ? `
                              <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                                  <span style="color: #6b7280; font-size: 14px;">Budget</span>
                                  <p style="margin: 5px 0 0 0; color: #111827; font-size: 15px; font-weight: 500;">${budget}</p>
                                </td>
                              </tr>
                              ` : ''}
                            </table>
                          </td>
                        </tr>
                      </table>
                      ` : ''}

                      <!-- Message -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <h2 style="margin: 0 0 15px 0; color: #111827; font-size: 18px; font-weight: 600;">Message</h2>
                          </td>
                        </tr>
                        <tr>
                          <td style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
                            <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                          </td>
                        </tr>
                      </table>

                      <!-- Action Button -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                        <tr>
                          <td align="center">
                            <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 6px rgba(102, 126, 234, 0.25);">
                              Reply to ${name.split(' ')[0]}
                            </a>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <p style="margin: 0; color: #6b7280; font-size: 13px;">
                        Sent from your portfolio contact form
                      </p>
                      <p style="margin: 10px 0 0 0; color: #9ca3af; font-size: 12px;">
                        ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })

    console.log("✅ Email Sent Successfully! ID:", info.messageId);
    return { success: true }
  } catch (error) {
    console.error("❌ Nodemailer Error:", error)
    return { success: false, error: "Failed to send email. Check server logs." }
  }
}