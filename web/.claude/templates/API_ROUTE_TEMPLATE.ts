import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route Handler Template
 * Use this as a template for creating API endpoints
 *
 * Example: app/api/events/route.ts
 */

/**
 * GET handler
 * @path /api/resource
 * @query page, limit, filter
 */
export async function GET(request: NextRequest) {
  try {
    // Extract query parameters
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';

    // Validate authorization
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'UNAUTHORIZED', message: 'Missing authentication token' },
        { status: 401 }
      );
    }

    // TODO: Add your business logic here
    const data = [];

    return NextResponse.json(
      {
        success: true,
        data,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: 0,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET /api/resource error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

/**
 * POST handler
 * @path /api/resource
 * @body { name: string, email: string }
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate input
    if (!body.name || !body.email) {
      return NextResponse.json(
        {
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // TODO: Add your business logic here

    return NextResponse.json(
      {
        success: true,
        data: {
          id: 'generated_id',
          ...body,
        },
        message: 'Resource created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          error: 'INVALID_JSON',
          message: 'Invalid request body',
        },
        { status: 400 }
      );
    }

    console.error('POST /api/resource error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT handler (update)
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // TODO: Add update logic

    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    console.error('PUT /api/resource error:', error);
    return NextResponse.json(
      { success: false, error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler
 */
export async function DELETE(request: NextRequest) {
  try {
    // TODO: Add delete logic

    return NextResponse.json({
      success: true,
      message: 'Resource deleted successfully',
    });
  } catch (error) {
    console.error('DELETE /api/resource error:', error);
    return NextResponse.json(
      { success: false, error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 }
    );
  }
}

/**
 * Error Handler Utility
 */
function handleError(error: unknown, context: string) {
  console.error(`Error in ${context}:`, error);

  if (error instanceof SyntaxError) {
    return NextResponse.json(
      { success: false, error: 'INVALID_JSON' },
      { status: 400 }
    );
  }

  if (error instanceof Error) {
    return NextResponse.json(
      { success: false, error: 'ERROR', message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: false, error: 'INTERNAL_SERVER_ERROR' },
    { status: 500 }
  );
}
