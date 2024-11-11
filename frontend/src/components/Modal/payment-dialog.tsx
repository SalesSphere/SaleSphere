"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PaymentDialogProps } from "@/lib/types";
import MemoShieldTick from "@/icons/shield-tick";
import MemoCard from "@/icons/Card";
import MemoCreditCardNotFound from "@/icons/credit-card-not-found";

export default function PaymentDialog({
  open,
  onOpenChange,
  items,
}: PaymentDialogProps) {
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const vat = subtotal * 0.075; // 7.5% VAT
  const total = subtotal + vat;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 flex items-center flex-col justify-center  text-center space-y-4">
          <p className="text-muted-foreground">Total amount</p>
          <DialogTitle className="text-4xl font-bold">
            {total.toLocaleString("en-NG", {
              style: "decimal",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </DialogTitle>
          <div className="flex items-center justify-center gap-2 text-[#292D32B2]">
            <MemoShieldTick className="h-5 w-5" />
            <span>Card payment</span>
          </div>
        </DialogHeader>

        <Separator className="my-0" />

        <ScrollArea className="flex-grow px-6 py-4">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Payment Summary</h3>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} pieces
                      </p>
                    </div>
                    <p className="font-medium">
                      ₦{item.amount.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-muted-foreground">Subtotal</p>
                <p className="font-medium">₦{subtotal.toLocaleString()}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-muted-foreground">VAT</p>
                <p className="font-medium">₦{vat.toLocaleString()}</p>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between">
              <p className="font-semibold">Total</p>
              <p className="font-semibold">₦{total.toLocaleString()}</p>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="p-6">
          <div className="flex gap-2 w-full">
            <Button className="w-full bg-[#17ABEC] hover:bg-[#17ABEC]/90 rounded-xl py-6">
              <MemoCard className="h-6 w-6" />
              Make payment
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-xl py-6"
              onClick={() => onOpenChange(false)}>
              <MemoCreditCardNotFound className="h-6 w-6" />
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
