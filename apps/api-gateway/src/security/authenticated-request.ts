import type { Request } from "express";

export interface AuthenticationContext {
  userId: string;
  sessionId: string;
}

export interface AuthenticatedRequest extends Request {
  authentication: AuthenticationContext;
}
