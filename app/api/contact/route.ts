import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      // Fallback: tell client to use mailto
      return NextResponse.json({ fallback: true })
    }

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f8f5ee;border-radius:12px">
        <h2 style="color:#1A3D2B;font-size:24px;margin-bottom:16px">New Portfolio Message</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#8A9280;font-size:13px;width:100px">From</td>
              <td style="padding:8px 0;color:#1A1A18;font-weight:600">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#8A9280;font-size:13px">Email</td>
              <td style="padding:8px 0;color:#1A3D2B"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#8A9280;font-size:13px">Subject</td>
              <td style="padding:8px 0;color:#1A1A18">${subject || 'Portfolio Enquiry'}</td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #E4E0D6;margin:16px 0"/>
        <p style="color:#1A1A18;line-height:1.7;white-space:pre-wrap">${message}</p>
        <hr style="border:none;border-top:1px solid #E4E0D6;margin:16px 0"/>
        <p style="color:#8A9280;font-size:12px">Sent from siddharthjain.dev portfolio</p>
      </div>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: ['sidnov6@gmail.com'],
        reply_to: email,
        subject: `[Portfolio] ${subject || 'New message'} — from ${name}`,
        html,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Resend error:', err)
      return NextResponse.json({ fallback: true })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ fallback: true })
  }
}
