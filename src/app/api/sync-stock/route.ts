import { NextResponse } from 'next/server';

/**
 * API Route to trigger a Vercel redeployment
 * This is called by Vercel Cron Jobs to refresh stock data
 *
 * The redeployment will run the prebuild script which syncs stock from AutoTrader
 */
export async function GET(request: Request) {
  // Verify this is a legitimate cron request (from Vercel)
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  // If CRON_SECRET is set, verify the request
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK;

  if (!deployHookUrl) {
    return NextResponse.json(
      { error: 'VERCEL_DEPLOY_HOOK environment variable not set' },
      { status: 500 }
    );
  }

  try {
    // Trigger Vercel deployment via deploy hook
    const response = await fetch(deployHookUrl, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Deploy hook failed: ${response.status}`);
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      message: 'Deployment triggered successfully',
      deployment: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to trigger deployment:', error);
    return NextResponse.json(
      { error: 'Failed to trigger deployment', details: String(error) },
      { status: 500 }
    );
  }
}
