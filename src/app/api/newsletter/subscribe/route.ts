import { NextRequest, NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Subscribe an email address to the Mailchimp audience.
 * Single opt-in (status: "subscribed") — the footer form shows a consent notice.
 */
export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName } = await request.json();

    if (!email || typeof email !== 'string' || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
    const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

    if (!apiKey || !audienceId || !serverPrefix) {
      console.error('Missing Mailchimp configuration');
      return NextResponse.json(
        { error: 'Newsletter service is not configured.' },
        { status: 500 }
      );
    }

    // Mailchimp uses HTTP Basic auth with any username and the API key as password.
    const authHeader = Buffer.from(`anystring:${apiKey}`).toString('base64');

    const response = await fetch(
      `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${authHeader}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            FNAME: typeof firstName === 'string' ? firstName : '',
            LNAME: typeof lastName === 'string' ? lastName : '',
          },
          tags: ['Website Footer'],
        }),
      }
    );

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'Thanks for subscribing!' });
    }

    const data = await response.json().catch(() => ({}));

    // Already on the list — treat as a success from the visitor's perspective.
    if (data?.title === 'Member Exists') {
      return NextResponse.json({
        success: true,
        message: "You're already subscribed — thank you!",
      });
    }

    console.error('Mailchimp API error:', response.status, data?.title, data?.detail);
    return NextResponse.json(
      { error: 'We could not subscribe that address. Please check it and try again.' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
