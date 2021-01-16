import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import type { NextApiHandler } from "next";

const options = {
  providers: [
    Providers.Google({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
};

const AuthHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default AuthHandler;
