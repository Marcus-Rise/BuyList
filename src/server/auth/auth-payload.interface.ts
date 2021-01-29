import type { User } from "next-auth";
import type { ProductListStorageId } from "../product-list/product-list.service.interface";

interface AuthPayload {
  user: User;
  accessToken: string;
  accessTokenExpires: number;
  refreshToken: string;
  error?: string;
  storageId: ProductListStorageId;
}

export type { AuthPayload };
