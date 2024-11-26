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
import { useAddUserStore } from "@/store/addUser";

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
  const setIsOpen = useAddUserStore((state) => state.setIsOpen);
  const { refetchUsers } = useGetStaffs();
  const contract = getContract({
    client,
    address: CONTRACTADDRESS,
    chain: liskSepolia,
  });
  const {
    mutateAsync: sendTransaction,
    isError,
    isPending,
    error,
  } = useSendTransaction();

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

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
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
        // values._barcode || "",
      ], // type safe params
    });
    sendTransaction(transaction).then(() => {
      refetchUsers();
      toast({
        title: "Success",
        description: "User added successfully",
      });
      setIsOpen(false);
      form.reset();
      form.setValue("_address", "");
      form.setValue("_id", "");
      form.setValue("_name", "");
      form.setValue("_email", "");
      form.setValue("_phoneNumber", "");
      form.setValue("_role", "");
    });
  }

  return {
    form,
    onSubmit,
    isError,
    isPending,
    error,
  };
};
