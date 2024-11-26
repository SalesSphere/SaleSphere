import { client } from "@/app/client";
import { CONTRACTADDRESS } from "@/lib/constants";
import { getContract, defineChain } from "thirdweb";
import { useReadContract } from "thirdweb/react";

const liskSepolia = defineChain(4202);

export default function useGetStaffs() {
  const contract = getContract({
    client,
    address: CONTRACTADDRESS,
    chain: liskSepolia,
  });

  const {
    data: allStaffData,
    isLoading: allStaffLoading,
    error: allStaffError,
    refetch:refetchUsers
  } = useReadContract({
    contract,
    method:
      "function getAllStaff() view returns ((uint256 staffID, string name, string email, uint256 phoneNumber, address addr, uint8 status, uint256 dateJoined, uint8 role)[] allStaffs)",
  });
  return {
    allStaffData,
    allStaffLoading,
    allStaffError,
    refetchUsers,
  };
}
