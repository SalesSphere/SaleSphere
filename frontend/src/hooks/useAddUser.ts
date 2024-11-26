import { useState } from "react";
import { CONTRACTADDRESS } from "@/lib/constants";
import { defineChain, getContract, prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { client } from "@/app/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toBigInt } from "ethers";
import useGetStaffs from "./useGetStaffs";
import { useToast } from "./use-toast";

const liskSepolia = defineChain(4202);

const formSchema = z.object({
  _name: z.string().min(1, {
    message: "This field is required",
  }),
  _email: z.string().email({
    message: "Please enter a valid email",
  }),
  _phoneNumber: z.string().min(1, {
    message: "This field is required",
  }),
  _address: z.string().min(1, {
    message: "This field is required",
  }),
  _id: z.string().optional(),
  _role: z.string().min(1, {
    message: "This field is required",
  }),
});

export const useAddUser = () => {
  const { toast } = useToast();
  const { refetchUsers } = useGetStaffs();
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const contract = getContract({
    client,
    address: CONTRACTADDRESS,
    chain: liskSepolia,
  });

  const { mutateAsync: sendTransaction } = useSendTransaction();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _name: "",
      _address: "",
      _email: "",
      _phoneNumber: "",
      _id: "",
      _role: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    setIsError(false);
    setError(null);

    try {
      const transaction = prepareContractCall({
        contract,
        method:
          "function addStaff(address _addr,uint256 _staffID, string memory _name, string memory _email, uint256 _phoneNumber, uint8 _role) public",
        params: [
          values._address,
          toBigInt(Math.floor(Math.random() * 1000000)),
          values._name,
          values._email,
          toBigInt(values._phoneNumber),
          Number(values._role),
        ],
      });

      await sendTransaction(transaction);
      await refetchUsers();

      toast({
        title: "Success",
        description: "User added successfully",
        variant: "default",
      });

      form.reset();
    } catch (err) {
      setIsError(true);
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setIsPending(false);
    }
  }

  return {
    form,
    onSubmit,
    isError,
    isPending,
    error,
  };
};
