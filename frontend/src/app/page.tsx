"use client";

import SimpleNav from "@/components/simple-nav";
import {
  ConnectButton,
  useActiveAccount,
  // useReadContract,
  useWalletBalance,
} from "thirdweb/react";
import { client } from "./client";
import { CHAIN } from "./chain"; // import { getContract } from "thirdweb";
import useReadAllProductsContract from "@/hook/ui/useReadAllProducts";
import helperAbi from "@/lib/abi/abi.json";

// const kcon = getContract({
//   client,
//   chain: CHAIN,
//   address: "0xcD7530ae96194c9ebc486C23d1c711A84D1AEb59",
// });

const Home = () => {
  const account = useActiveAccount();

  const { data, isLoading } = useReadAllProductsContract({
    contractAddress:
      "0xcD7530ae96194c9ebc486C23d1c711A84D1AEb59" as `0x${string}`,
    abi: helperAbi,
    functionName: "getAllProduct",
    args: [],
  });

  // const { data: kdata, isLoading: kloadin } = useReadContract({
  //   contract: kcon,
  //   method:
  //     "function getAllProduct() public view returns (SalesStorage.Product[] memory)",
  // });

  console.log({ data, isLoading });

  // Wallet balance hook
  const { data: balance } = useWalletBalance({
    client: client,
    chain: CHAIN,
    address: account?.address,
  });
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

export default Home;
