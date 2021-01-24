import type { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import { google } from "googleapis";
import { inject } from "../../../src/ioc";
import type { IGoogleConfig } from "../../../src/google";
import { GOOGLE_CONFIG } from "../../../src/google";

const TestHandler: NextApiHandler = async (req, res, googleConfig = inject<IGoogleConfig>(GOOGLE_CONFIG)) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401);
  }

  const accessToken = session?.accessToken;
  const refreshToken = session?.refreshToken;

  const auth = new google.auth.OAuth2({
    clientId: googleConfig.clientId,
    clientSecret: googleConfig.clientSecret,
  });
  auth.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  const drive = google.drive({ auth, version: "v3" });

  await drive.files
    .list({ spaces: "appDataFolder" })
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
