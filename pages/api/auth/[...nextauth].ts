import type { InitOptions, User } from "next-auth";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import type { NextApiHandler } from "next";
import type { GenericObject, SessionBase } from "next-auth/_utils";

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/drive.appdata",
];
const JWT_SECRET = String(process.env.NEXTAUTH_JWT_SECRET);
const authorizationUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
authorizationUrl.searchParams.set("prompt", "consent");
authorizationUrl.searchParams.set("access_type", "offline");
authorizationUrl.searchParams.set("response_type", "code");

const options: InitOptions = {
  providers: [
    Providers.Google({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
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
    async jwt(token: GenericObject, user: User, account: GenericObject): Promise<GenericObject> {
      if (account) {
        token.accessToken = account?.accessToken;
        token.refreshToken = account?.refreshToken;
      }

      return token;
    },
    async session(session: SessionBase, user: any): Promise<GenericObject> {
      session.accessToken = user.accessToken;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      session.refreshToken = user.refreshToken;

      return session;
    },
  },
};

const AuthHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default AuthHandler;
