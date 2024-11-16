"use client";
import { ThirdwebProvider } from "thirdweb/react";
import * as NProgress from "nprogress";
import NextTopLoader from "nextjs-toploader";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
import { wagmiAdapter } from "./wagmiConfig";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
// import { Toaster } from "sonner";

export const usePRouter = () => {
  const router = useRouter();

  const { push } = router;

  router.prefetch = (href) => {
    NProgress.start();
    push(href);
  };

  return router;
};
const queryClient = new QueryClient();

function Provider2({
  children,
  cookies,
}: {
  children: React.ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  return (
    <ThirdwebProvider>
      <WagmiProvider
        config={wagmiAdapter.wagmiConfig as Config}
        initialState={initialState}
      >
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <NextTopLoader
              color="#2299DD"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={false}
              easing="ease"
              speed={200}
              shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            />
            {children}
            {/* <Toaster richColors /> */}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThirdwebProvider>
  );
}

export default Provider2;
