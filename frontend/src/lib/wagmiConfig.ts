// config/index.tsx

import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { liskSepolia } from "@reown/appkit/networks";

// Get projectId from https://cloud.reown.com
export const projectId = "153911e6992ff7988874a9dc6ce9f840";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [liskSepolia];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
