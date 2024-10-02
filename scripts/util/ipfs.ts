import { create } from "ipfs-http-client";
import { getEnv } from "./env";

const IPFS_ENDPOINT = getEnv("DEPLOYMENT_IPFS_ENDPOINT", true) ?? "";
const IPFS_KEY = getEnv("DEPLOYMENT_IPFS_API_KEY", true) || "";

export const ipfsClient = create({
  url: IPFS_ENDPOINT,
  headers: { "X-API-KEY": IPFS_KEY, Accept: "application/json" },
});
