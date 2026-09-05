import { NextRequest, NextResponse } from "next/server";

// Where leads go, and who they appear to come from.
// FROM_EMAIL must be on a domain VERIFIED in Resend. The verified
// domain is the subdomain contact.taysfix.com, not the root domain,
// so the From address has to sit on that subdomain or Resend rejects
// the send with a 403.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "taysfix@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Tays Fix and Finish <hello@contact.taysfix.com>";

// Guardrails. Images are downscaled in the browser before upload,
// so these should never be hit in normal use.
const MAX_FILES = 8;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "The form isn't configured yet." },
      { status: 500 }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Could not read the form." }, { status: 400 });
  }

  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const phone = String(form.get("phone") || "").trim();
  const service = String(form.get("service") || "").trim();
  const message = String(form.get("message") || "").trim();

  if (!name || !email) {
    return NextResponse.json(
      { error: "Please include your name and email." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });
  }

  // Attachments
  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > MAX_FILES) {
    return NextResponse.json(
      { error: `Please attach no more than ${MAX_FILES} photos.` },
      { status: 400 }
    );
  }

  const totalBytes = files.reduce((sum, f) => sum + f.size, 0);
  if (totalBytes > MAX_TOTAL_BYTES) {
    return NextResponse.json(
      { error: "Those photos are too large to send. Try attaching fewer." },
      { status: 400 }
    );
  }

  const attachments = await Promise.all(
    files.map(async (file, i) => ({
      filename: file.name || `photo-${i + 1}.jpg`,
      content: Buffer.from(await file.arrayBuffer()).toString("base64"),
    }))
  );

  // Phrased so it still reads correctly to the customer if Zach simply
  // hits Reply — "Re: Drywall Repair inquiry — Jane Smith".
  const subject = service
    ? `${service} inquiry — ${name}`
    : `Website inquiry — ${name}`;

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "—"],
    ["Project type", service || "—"],
  ];

  // NOTE: Gmail quotes this entire body underneath Zach's reply, so the
  // customer ends up reading it too. Every line here must make sense to
  // BOTH audiences - no internal framing, no instructions addressed to Zach.
  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;color:#1a1a1a">
      <h2 style="color:#2a4e51;margin:0 0 4px">Project Request</h2>
      <p style="color:#546162;font-size:13px;margin:0 0 20px">Submitted via taysfix.com</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([label, value]) => `
        <tr>
          <td style="padding:8px 12px 8px 0;color:#546162;white-space:nowrap;vertical-align:top">${label}</td>
          <td style="padding:8px 0;font-weight:600">${escapeHtml(value)}</td>
        </tr>`
          )
          .join("")}
      </table>
      ${
        message
          ? `<div style="margin-top:20px;padding:16px;background:#f4f4f4;border-radius:8px">
               <div style="font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#5f9798;font-weight:700;margin-bottom:8px">Message</div>
               <div style="font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</div>
             </div>`
          : ""
      }
      ${
        attachments.length
          ? `<p style="margin-top:20px;font-size:13px;color:#546162">📎 ${attachments.length} photo${attachments.length > 1 ? "s" : ""} attached.</p>`
          : ""
      }
    </div>`;

  try {
    // Resend's REST API directly — no SDK, so there is no extra
    // dependency to keep up to date.
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject,
        html,
        attachments,
      }),
    });

    if (!res.ok) {
      console.error("Resend error:", res.status, await res.text());
      return NextResponse.json({ error: "We couldn't send that just now." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route failed:", err);
    return NextResponse.json({ error: "We couldn't send that just now." }, { status: 500 });
  }
}
