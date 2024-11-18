"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ContextProps {
  userAddress: string;
  setUserAddress: Dispatch<SetStateAction<string>>;
}

const initialState: ContextProps = {
  userAddress: "",
  setUserAddress: () => {},
};

const WalletContext = createContext<ContextProps>(initialState);

export default function WalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userAddress, setUserAddress] = useState<string>("");

  return (
    <WalletContext.Provider value={{ userAddress, setUserAddress }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
