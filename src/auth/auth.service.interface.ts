type Session = unknown;

interface IAuthService {
  session?: Session | null;
}

export type { IAuthService, Session };
