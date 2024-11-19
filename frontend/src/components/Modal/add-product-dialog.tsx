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

import { useAddProduct } from "@/hooks/useAddProduct";
import { AddProductDialogProps } from "@/lib/types";

export default function AddProductDialog({
  open,
  onOpenChange,
}: AddProductDialogProps) {
  const { form, onSubmit, isPending, isError, error } = useAddProduct();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        {isError && (
          <p className="text-destructive text-sm">{error?.message}</p>
        )}
        <DialogHeader>
          <DialogTitle>Add new Product</DialogTitle>
          <DialogDescription>
            Fill in the form below to input the product information
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="_productName"
              // @ts-ignore
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {" "}
                    Product Name<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="_productPrice"
              // @ts-ignore
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Product Price<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter product price"
                      {...field}
                      type="number"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="_quantity"
              // @ts-ignore
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Number of quantity
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter product quantity"
                      {...field}
                      type="number"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="_barcode"
              // @ts-ignore
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Bar/QR code number
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product bar/QR code" {...field} />
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
              {isPending ? "Adding..." : "Add new Product"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
