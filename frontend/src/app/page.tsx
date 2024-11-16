"use client";

import SimpleNav from "@/components/simple-nav";
import { ConnectButton } from "thirdweb/react";
import { client } from "./client";
import { inAppWallet } from "thirdweb/wallets";
import { defineChain } from "thirdweb";


const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "discord",
        "telegram",
        "farcaster",
        "email",
        "x",
        "passkey",
        "phone",
      ],
    },
  }),
];
  const page = () => {
  return (
    <div>
      <SimpleNav />
      <ConnectButton
        client={client}
        wallets={wallets}
        connectModal={{ size: "compact" }}
      />

      {/* <div className="flex justify-center mb-20">
        <ConnectButton
          client={client}
          connectModal={{ size: "compact" }}
          wallets={[
            inAppWallet({
              auth: {
                options: ["google", "email", "phone", "wallet"],
              },
            }),
          ]}
          accountAbstraction={{
            chain: defineChain(4202),
            sponsorGas: true,
          }}
        />
      </div> */}
    </div>
  );
};

export default page;
