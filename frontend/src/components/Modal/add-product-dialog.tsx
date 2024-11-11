"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddProductDialogProps } from "@/lib/types";

export default function AddProductDialog({
  open,
  onOpenChange,
}: AddProductDialogProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new Product</DialogTitle>
          <DialogDescription>
            Fill in the form below to input the product information
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="product-name">
              Product Name<span className="text-destructive">*</span>
            </Label>
            <Input
              id="product-name"
              placeholder="Enter product name"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="product-price">
              Product Price<span className="text-destructive">*</span>
            </Label>
            <Input
              id="product-price"
              type="number"
              placeholder="Enter product price"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quantity">
              Number of quantity<span className="text-destructive">*</span>
            </Label>
            <Input
              id="quantity"
              type="number"
              placeholder="Enter product quantity"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="barcode">
              Bar/QR code number<span className="text-destructive">*</span>
            </Label>
            <Input
              id="barcode"
              placeholder="Enter product bar/QR code"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="uploader">
              Uploader Name<span className="text-destructive">*</span>
            </Label>
            <Input id="uploader" placeholder="Enter uploader name" required />
          </div>
          <Button type="submit" className="w-full bg-[#17ABEC]">
            Add new Product
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
