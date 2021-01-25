import type { NextApiHandler } from "next";
import { inject } from "../../../src/server/ioc";
import type { IGoogleDriveService } from "../../../src/server/google";
import { GOOGLE_DRIVE_SERVICE } from "../../../src/server/google";
import { AuthMiddleware } from "../../../src/server/auth/auth.middleware";

const TestHandler: NextApiHandler = async (
  req,
  res,
  googleDrive = inject<IGoogleDriveService>(GOOGLE_DRIVE_SERVICE),
) => {
  await AuthMiddleware(req, res);

  await googleDrive
    .createJsonFile("test.json", { foo: "bar" })
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
