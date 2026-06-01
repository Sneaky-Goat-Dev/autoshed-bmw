import { NextRequest, NextResponse } from 'next/server';
import { FinanceApplicationFormData, SignioSubmissionResponse } from '@/types/signio';
import { buildSignioXML, validateSAIdNumber } from '@/lib/signio';

export async function POST(request: NextRequest) {
  try {
    const formData: FinanceApplicationFormData = await request.json();

    // Validate required fields
    if (!formData.firstName || !formData.surname || !formData.idNumber) {
      return NextResponse.json(
        { error: 'Missing required fields: firstName, surname, and idNumber are required' },
        { status: 400 }
      );
    }

    // Validate SA ID number
    if (!validateSAIdNumber(formData.idNumber)) {
      return NextResponse.json(
        { error: 'Invalid SA ID number' },
        { status: 400 }
      );
    }

    // Check for required environment variables
    const apiUrl = process.env.SIGNIO_API_URL;
    const username = process.env.SIGNIO_USERNAME;
    const password = process.env.SIGNIO_PASSWORD;
    const authToken = process.env.SIGNIO_AUTH_TOKEN;
    const dealerCode = process.env.SIGNIO_DEALER_CODE;

    if (!apiUrl || !username || !password || !authToken || !dealerCode) {
      console.error('Missing Signio configuration');
      // In development/staging, return a mock success response
      if (process.env.NODE_ENV !== 'production') {
        return NextResponse.json({
          success: true,
          message: 'Application submitted successfully (development mode)',
          referenceNumber: `DEV-${Date.now()}`,
          isDevelopment: true,
        });
      }
      return NextResponse.json(
        { error: 'Finance service configuration error' },
        { status: 500 }
      );
    }

    // Build the XML payload
    const xmlPayload = buildSignioXML(formData, dealerCode);

    // Opt-in debug logging of the outgoing XML (set SIGNIO_DEBUG=true).
    // Contains applicant PII, so this stays off unless explicitly enabled.
    if (process.env.SIGNIO_DEBUG === 'true') {
      console.log('[signio] outgoing XML payload:\n' + xmlPayload);
    }

    // Create Basic Auth header
    const authHeader = Buffer.from(`${username}:${password}`).toString('base64');

    // Submit to Signio API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authHeader}`,
        'X-Auth-Token': authToken,
        'Content-Type': 'application/xml',
        'Accept': 'application/json',
      },
      body: xmlPayload,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Signio API error:', response.status, errorText);
      return NextResponse.json(
        { error: `Finance submission failed: ${response.statusText}` },
        { status: response.status }
      );
    }

    const result: SignioSubmissionResponse = await response.json();

    if (result.results?.referenceNumber) {
      return NextResponse.json({
        success: true,
        message: result.results.message || 'Application submitted successfully',
        referenceNumber: result.results.referenceNumber,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      data: result,
    });
  } catch (error) {
    console.error('Finance submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process finance application' },
      { status: 500 }
    );
  }
}
