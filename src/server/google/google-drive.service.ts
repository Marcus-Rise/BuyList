import type { IGoogleDriveService, JsonData } from "./google-drive.service.interface";
import type { IGoogleConfig } from "./google.config.interface";
import type { drive_v3 } from "googleapis";
import { google } from "googleapis";
import type { GaxiosResponse } from "gaxios";
import type { IAuthConfig } from "../auth";
import { AUTH_CONFIG } from "../auth";
import { inject, injectable } from "inversify";
import { GOOGLE_CONFIG } from "./google.module-keys";

@injectable()
class GoogleDriveService implements IGoogleDriveService {
  constructor(
    @inject(GOOGLE_CONFIG) private readonly config: IGoogleConfig,
    @inject(AUTH_CONFIG) private readonly authConfig: IAuthConfig,
  ) {}

  private get drive(): drive_v3.Drive {
    const auth = new google.auth.OAuth2({
      clientId: this.config.clientId,
      clientSecret: this.config.clientSecret,
    });
    auth.forceRefreshOnFailure = true;
    auth.setCredentials({
      access_token: this.authConfig.accessToken,
      refresh_token: this.authConfig.refreshToken,
    });

    return google.drive({ auth, version: "v3" });
  }

  async createJsonFile(name: string, data: JsonData): Promise<GaxiosResponse> {
    return this.drive.files.create({
      requestBody: { name },
      media: { mimeType: "application/json", body: JSON.stringify(data) },
    });
  }

  async getJsonData(name: string): Promise<JsonData> {
    return {};
  }
}

export { GoogleDriveService };
