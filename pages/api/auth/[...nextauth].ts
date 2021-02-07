import type { InitOptions, User } from "next-auth";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import type { NextApiHandler } from "next";
import type { GenericObject } from "next-auth/_utils";
import type { IGoogleConfig } from "../../../src/server/google";
import { GOOGLE_CONFIG } from "../../../src/server/google";
import { inject } from "../../../src/server/ioc";
import type { AuthPayload } from "../../../src/server/auth/auth-payload.interface";

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
const refreshAccessToken = async (
  payload: AuthPayload,
  clientId: string,
  clientSecret: string,
): Promise<AuthPayload> => {
  try {
    const url = new URL("https://oauth2.googleapis.com/token");
    url.searchParams.set("client_id", clientId);
    url.searchParams.set("client_secret", clientSecret);
    url.searchParams.set("grant_type", "refresh_token");
    url.searchParams.set("refresh_token", payload.refreshToken);

    const response = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshToken = await response.json();

    if (!response.ok) {
      throw refreshToken;
    }

    // Give a 10 sec buffer
    const now = new Date();
    const accessTokenExpires = now.setSeconds(now.getSeconds() + refreshToken.expires_in - 10);

    return {
      ...payload,
      accessToken: refreshToken.access_token,
      accessTokenExpires,
      refreshToken: refreshToken.refresh_token,
    };
  } catch (error) {
    console.error(error);

    return {
      ...payload,
      error: "RefreshAccessTokenError",
    };
  }
};

const AuthHandler: NextApiHandler = (req, res, googleConfig = inject<IGoogleConfig>(GOOGLE_CONFIG)) => {
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/drive.appdata",
    "https://www.googleapis.com/auth/drive.file",
  ];
  const JWT_SECRET = String(process.env.NEXTAUTH_JWT_SECRET);
  const authorizationUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authorizationUrl.searchParams.set("prompt", "consent");
  authorizationUrl.searchParams.set("access_type", "offline");
  authorizationUrl.searchParams.set("response_type", "code");

  const options: InitOptions = {
    providers: [
      Providers.Google({
        clientId: googleConfig.clientId,
        clientSecret: googleConfig.clientSecret,
        authorizationUrl: authorizationUrl.toString(),
        scope: scopes.join(" "),
      }),
    ],
    secret: JWT_SECRET,
    jwt: {
      encryption: true,
      secret: JWT_SECRET,
    },
    debug: process.env.NODE_ENV === "development",
    callbacks: {
      async jwt(payload: AuthPayload, user: User, account: GenericObject): Promise<AuthPayload> {
        let res: AuthPayload;

        const now = Date.now();

        // Signing in
        if (account && user) {
          const accessToken = account.accessToken;
          const refreshToken = account.refreshToken;

          res = {
            accessToken,
            accessTokenExpires: account.accessTokenExpires,
            refreshToken,
            user,
          };
        } else if (now < payload.accessTokenExpires) {
          // Subsequent use of JWT, the user has been logged in before
          // access token has not expired yet
          res = payload;
        } else {
          // access token has expired, try to update it
          res = await refreshAccessToken(payload, googleConfig.clientId, googleConfig.clientSecret);
        }

        return res;
      },
      async session(_, payload: GenericObject): Promise<GenericObject> {
        return payload;
      },
    },
  };

  return NextAuth(req, res, options);
};

export default AuthHandler;
