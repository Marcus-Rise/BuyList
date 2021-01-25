import type { GaxiosResponse } from "gaxios";

type JsonData = Record<string, unknown>;

interface IGoogleDriveService {
  createJsonFile(name: string, data: JsonData): Promise<GaxiosResponse>;

  getJsonData(name: string): Promise<JsonData>;
}

export type { IGoogleDriveService, JsonData };
