import { CHAIN } from "@/app/chain";
import { client } from "@/app/client";
import { CONTRACTADDRESS } from "@/lib/constants";
import { getContract, defineChain } from "thirdweb";
import {
  useActiveAccount,
  useReadContract,
  useWalletBalance,
} from "thirdweb/react";

const liskSepolia = defineChain(4202);

interface Staff {
  staffID: number;
  name: string;
  role: number;
}

interface ContractMethods {
  getAllStaff: () => Staff[];
}
export default function useGetStaffs(Staff?: number) {
  const contract = getContract({
    client,
    address: CONTRACTADDRESS,
    chain: liskSepolia,
  });

  const {
    data: allStaffData,
    isLoading: allStaffLoading,
    error: allStaffError,
  } = useReadContract({
    contract,
    method:
      "function getAllStaff() view returns ((uint256 staffID, string name, string email, uint256 phoneNumber, uint8 status, uint256 dateJoined, uint8 role)[] allStaffs)",
  });

  return {
    allStaffData,
    allStaffLoading,
    allStaffError,
  };
}
