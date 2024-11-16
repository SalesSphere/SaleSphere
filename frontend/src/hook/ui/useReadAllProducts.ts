/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useReadContract } from "wagmi";

const useReadAllProductsContract = ({
  contractAddress,
  abi,
  functionName,
  args = [],
}: {
  contractAddress: any;
  abi: any;
  functionName: string;
  args: any[];
}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    data: contractData,
    isError,
    isLoading: loading,
  } = useReadContract({
    address: contractAddress,
    abi,
    functionName,
    args,
  });

  useEffect(() => {
    setIsLoading(loading);
    if (isError) {
      setError("Failed to read contract data");
    } else {
      setData(contractData as any);
    }

    return () => {
      setData(null);
      setIsLoading(false);
      setError("");
    };
  }, [contractData, loading, isError]);

  return { data, isLoading, error };
};

export default useReadAllProductsContract;
