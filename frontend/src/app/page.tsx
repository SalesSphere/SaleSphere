"use client";

import SimpleNav from "@/components/simple-nav";
import {
  ConnectButton,
  useActiveAccount,
  useWalletBalance,
} from "thirdweb/react";
import { client } from "./client";
import { inAppWallet } from "thirdweb/wallets";
import { CHAIN } from "./chain";
const page = () => {
  const account = useActiveAccount();

  // Wallet balance hook
  const { data: balance, isLoading: balanceLoading } = useWalletBalance({
    client: client,
    chain: CHAIN,
    address: account?.address,
  });
  const accountAbstraction = {
    chain: CHAIN,
    FactoryAddress: "0xEEE22bCdb24934E35A4E526A54e280CB3f8b59E4",
    gasless: true,
  };
  return (
    <div>
      <SimpleNav />

      <div className="flex justify-center mb-20">
        {/* <ConnectButton
          client={client}
          connectModal={{ size: "compact" }}
          wallets={[
            inAppWallet({
              auth: {
                options: ["google", "email", "phone", "wallet",],
              },
            }),
          ]}
          connectButton={{
            label: "Login",
          }}
        /> */}
        <ConnectButton client={client} />
      </div>
      <p>Wallet address: {account?.address}</p>
      <p>
        Wallet balance: {balance?.displayValue} {balance?.symbol}
      </p>
    </div>
  );
};

export default page;
