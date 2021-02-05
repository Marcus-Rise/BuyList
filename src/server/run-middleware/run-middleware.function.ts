import type { NextApiRequest, NextApiResponse } from "next";

type CallBackResult = unknown;
type CallBack = (result: CallBackResult) => void;

type MiddleWare = (req: NextApiRequest, res: NextApiResponse, callback: CallBack) => void;

const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: MiddleWare): Promise<CallBackResult> =>
  new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });

export { runMiddleware };
