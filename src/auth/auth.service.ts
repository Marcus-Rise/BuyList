import type { IAuthService, Session } from "./auth.service.interface";
import { injectable } from "inversify";

@injectable()
class AuthService implements IAuthService {
  session: Session;

  constructor() {
    this.session = null;
  }
}

export { AuthService };
