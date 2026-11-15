// Shared API response helpers for Route Handlers

export function ok<T>(data: T, status = 200): Response {
  return Response.json(data, { status });
}

export function created<T>(data: T): Response {
  return Response.json(data, { status: 201 });
}

export function noContent(): Response {
  return new Response(null, { status: 204 });
}

export function badRequest(message: string): Response {
  return Response.json({ error: message }, { status: 400 });
}

export function unauthorized(message = 'Unauthorised'): Response {
  return Response.json({ error: message }, { status: 401 });
}

export function forbidden(message = 'Forbidden'): Response {
  return Response.json({ error: message }, { status: 403 });
}

export function notFound(message = 'Not found'): Response {
  return Response.json({ error: message }, { status: 404 });
}

export function conflict(message: string): Response {
  return Response.json({ error: message }, { status: 409 });
}

export function serverError(err: unknown): Response {
  console.error('[API error]', err);
  return Response.json({ error: 'Internal server error' }, { status: 500 });
}
