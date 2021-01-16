import type { InitOptions } from "next-auth";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import type { NextApiHandler } from "next";

const options: InitOptions = {
  providers: [
    Providers.Google({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
};

const AuthHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default AuthHandler;
