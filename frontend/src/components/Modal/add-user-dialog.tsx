/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { useAddUser } from "@/hooks/useAddUser";
import { AddProductDialogProps } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdduserDialog({
  open,
  onOpenChange,
}: AddProductDialogProps) {
  const { form, onSubmit, isPending, isError, error } = useAddUser();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        {isError && (
          <p className="text-destructive text-sm">{error?.message}</p>
        )}
        <DialogHeader>
          <DialogTitle>Add new user</DialogTitle>
          <DialogDescription>
            Fill in the form below to input the user information
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="_name"
              // @ts-ignore
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {" "}
                    Name<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="_address"
              // @ts-ignore
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Wallet address<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter users Wallet address"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="_email"
              // @ts-ignore
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email address<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter users email address"
                      {...field}
                      type="email"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="_phoneNumber"
              // @ts-ignore
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Phone number<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter users phone number"
                      {...field}
                      type="tel"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="_role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    user role
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="h-8 w-full text-xs py-5">
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={"0"}>Admin</SelectItem>
                        <SelectItem value={"1"}>
                          Sales Representative
                        </SelectItem>
                        {/* <SelectItem value={"3"}>Moderator</SelectItem>
                        <SelectItem value={"4"}>Guest</SelectItem> */}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isPending}
              type="submit"
              className="w-full bg-[#17ABEC]"
            >
              {isPending ? "Adding..." : "Add New User"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
