import type { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import { google } from "googleapis";

const TestHandler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401);
  }

  const auth = new google.auth.OAuth2({
    clientId: String(process.env.GOOGLE_CLIENT_ID),
    clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
  });
  auth.apiKey = String(process.env.GOOGLE_API_KEY);
  auth.setCredentials({
    access_token: session?.accessToken,
    refresh_token: session?.refreshToken,
    scope: "https://www.googleapis.com/auth/drive.appdata",
  });

  const drive = google.drive({ auth, version: "v3" });

  await drive.files
    .list()
    .then((data) => {
      console.debug(data.data);
      res.json(data.data);
    })
    .catch((e) => {
      const error = e?.stack ?? e?.response?.data?.error;
      res.status(error?.code ?? 500).json(error ?? e);
    });
};

export default TestHandler;
