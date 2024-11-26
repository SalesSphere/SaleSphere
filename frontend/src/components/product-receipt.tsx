"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MemoCancel from "@/icons/Cancel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRecordSales } from "@/hooks/useRecordSales";
import useProduct from "@/hooks/useReadContract";
import { DashboardLayout } from "./DashboardLayout";
import { navigation } from "@/lib/data";
import DashboardHeader from "./DashboardHeader";
import { useToast } from "@/hooks/use-toast";
import EditCash from "./EditMoney";

interface Product {
  productID: bigint;
  productName: string;
  productPrice: bigint;
  quantity: bigint;
  uploader: string;
  dateAdded: bigint;
  barcode: string;
}

interface ReceiptItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function ProductReceipt() {
  const { recordSale, isError, isPending, error } = useRecordSales();
  const {
    allProductData: products,
    allProductLoading,
    allProductError,
  } = useProduct();
  const { toast } = useToast();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>();
  const [quantity, setQuantity] = useState(1);
  const [receiptItems, setReceiptItems] = useState<ReceiptItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isReceiptDialogOpen, setIsReceiptDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Track the last successful checkout items and payment method
  const [lastCheckoutItems, setLastCheckoutItems] = useState<ReceiptItem[]>([]);
  const [lastPaymentMethod, setLastPaymentMethod] = useState("");

  // useEffect(() => {
  //   if (products && products.length > 0 && !selectedProduct) {
  //     setSelectedProduct(products[0]);
  //   }
  // }, [products, selectedProduct]);

  if (allProductLoading) return <div>Loading...</div>;
  if (allProductError)
    return <div>Error loading products: {allProductError.message}</div>;

  const addProduct = () => {
    if (selectedProduct) {
      const existingItemIndex = receiptItems.findIndex(
        (item) => item.id === Number(selectedProduct.productID)
      );

      if (existingItemIndex > -1) {
        // If product already exists, update its quantity
        const updatedItems = [...receiptItems];
        updatedItems[existingItemIndex].quantity += quantity;
        setReceiptItems(updatedItems);
      } else {
        // Add new product
        setReceiptItems([
          ...receiptItems,
          {
            id: Number(selectedProduct.productID),
            name: selectedProduct.productName,
            price: Number(selectedProduct.productPrice),
            quantity,
          },
        ]);
      }
    }
  };

  const removeProduct = (id: number) => {
    setReceiptItems(receiptItems.filter((item) => item.id !== id));
  };

  const subtotal = receiptItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const vat = subtotal * 0.1;
  const total = subtotal + vat;

  const handleCheckout = async () => {
    const paymentModeMap = { card: 0, "bank-transfer": 1, cash: 2 };
    try {
      setCheckoutError(null);
      await recordSale(
        receiptItems.map((item) => ({
          productId: Number(item.id),
          quantity: item.quantity,
        })),
        Number(BigInt(Math.round(total * 100))),
        paymentModeMap[paymentMethod as keyof typeof paymentModeMap]
      );

      // Store the current checkout items and payment method
      setLastCheckoutItems(receiptItems);
      setLastPaymentMethod(paymentMethod);

      toast({
        title: "Success",
        description: "Sales recorded successfully!",
      });
      setIsDialogOpen(false);
      setIsReceiptDialogOpen(true);
    } catch (err) {
      console.error("Error during checkout:", err);
      setCheckoutError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  const handleCloseReceiptDialog = () => {
    setIsReceiptDialogOpen(false);
    setReceiptItems([]);
    setPaymentMethod("");
    setLastCheckoutItems([]);
    setLastPaymentMethod("");
  };
  // console.log(selectedProduct.productPrice);
  return (
    <DashboardLayout showHeader={true} navigation={navigation}>
      <div className="space-y-6">
        <DashboardHeader
          title="Checkout page"
          subtitle="View and edit all product info present in your store"
          showSearch={false}
          showExport={false}
          showAddUser={false}
          showAddProduct={false}
          showMainExport={false}
          showProceed={false}
          showSortProduct={false}
          showApproveAll={false}
          onApproveAllClick={() => {}}
          period="Last 360 days"
          onSearchClick={() => {}}
          onAddUserClick={() => {}}
          onAddProductClick={() => {}}
        />
        <div className="flex flex-col lg:flex-row gap-8 p-4">
          <Card className="w-full lg:max-w-[35rem] bg-[#292D320D] p-4 lg:p-6 rounded-lg shadow-md h-[470px] flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Add new Product
              </CardTitle>
              <p className="text-sm text-gray-500">
                Fill in the form below to input the product information
              </p>
            </CardHeader>
            <CardContent className="!space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name<span className="text-red-500">*</span>
                </label>
                <Select
                  onValueChange={(value) =>
                    setSelectedProduct(
                      products?.find((p) => p.productName === value) || null
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Enter product name" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#FFFFFF]">
                    {products?.map((product) => (
                      <SelectItem
                        key={product.productName}
                        value={product.productName}
                      >
                        {product.productName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Price<span className="text-red-500">*</span>
                </label>
                <Input
                  defaultValue={0}
                  value={
                    selectedProduct ? `₦${selectedProduct.productPrice}` : ""
                  }
                  readOnly
                  className="bg-gray-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of quantity<span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  placeholder="Enter product quantity"
                />
              </div>
              <Button
                className="w-full bg-[#17ABEC] hover:bg-[#17ABEC] py-6 text-white"
                onClick={addProduct}
              >
                Add Product
              </Button>
            </CardContent>
          </Card>

          <Card className="w-full lg:max-w-[35rem] border-[#292D321A] p-4 lg:p-6 rounded-lg shadow-md">
            <CardHeader className="text-right">
              <CardTitle className="text-xl font-semibold">Receipt</CardTitle>
              <div className="text-sm text-gray-500">
                <p>SaleSphere</p>
                <p>REG: 000000000000</p>
                <p>sale@salesphere.com | +64 123 1234 123</p>
                <p>Receipt Number: INV-0002</p>
                <p>Date: {new Date().toLocaleDateString()}</p>
                <p>Time: {new Date().toLocaleTimeString()}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#292D321A]">
                    <tr className="border-b">
                      <th className="text-left py-2 px-2">Product</th>
                      <th className="py-2 px-1">Qty</th>
                      <th className="text-right py-2">Unit Price</th>
                      <th className="text-right py-2">Amount</th>
                      <th className="py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {receiptItems.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-2">{item.name}</td>
                        <td className="text-center px-4 py-2">
                          {/* {item.quantity} */}
                          <EditCash amount={item.quantity} />
                        </td>
                        <td className="text-right py-2">
                          {/* ${item.price.toFixed(2)} */}
                          <EditCash amount={item.price} isMoney />
                        </td>
                        <td className="text-right py-2">
                          {/* ${(item.price * item.quantity).toFixed(2)} */}
                          <EditCash
                            amount={item.price * item.quantity}
                            isMoney
                          />
                        </td>
                        <td className="text-right py-2">
                          <Button
                            variant="ghost"
                            onClick={() => removeProduct(item.id)}
                          >
                            <MemoCancel className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="space-y-2 mt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    {/* ${subtotal.toFixed(2)} */}
                    <EditCash amount={subtotal} isMoney />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>VAT</span>
                  <span>
                    <EditCash amount={vat} isMoney />
                    {/* ${vat.toFixed(2)} */}
                  </span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>
                    <EditCash amount={total} isMoney />
                    {/* ${total.toFixed(2)} */}
                  </span>
                </div>
              </div>
              <div className="flex justify-end">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="mt-4 bg-transparent border border-[#292D3280] hover:bg-transparent text-[#292D32]">
                      {isPending ? "Processing..." : "Checkout"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold mb-4">
                        Payment Method
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-lg">Choose payment method</p>
                      <p className="text-lg font-semibold">
                        Total amount to be paid
                      </p>
                      <Input
                        value={`₦${total.toFixed(2)}`}
                        readOnly
                        className="bg-gray-200"
                      />
                      <div>
                        <p className="text-lg font-semibold mb-2">
                          Payment method
                        </p>
                        <Select onValueChange={setPaymentMethod}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="card">Card</SelectItem>
                            <SelectItem value="bank-transfer">
                              Bank Transfer
                            </SelectItem>
                            <SelectItem value="cash">Cash</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        className="w-full bg-[#17ABEC] hover:bg-[#17ABEC] text-white"
                        onClick={handleCheckout}
                        disabled={!paymentMethod || isPending}
                      >
                        {isPending ? "Processing..." : "Proceed to receipt"}
                      </Button>
                      {(isError || checkoutError) && (
                        <p className="text-red-500 text-sm">
                          Error:{" "}
                          {error?.message ||
                            checkoutError ||
                            "An error occurred"}
                        </p>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Receipt Dialog */}
      <Dialog
        open={isReceiptDialogOpen}
        onOpenChange={(open) => {
          if (!open) handleCloseReceiptDialog();
        }}
      >
        <DialogContent className="max-w-lg p-6 rounded-lg shadow-lg">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-4">
            <h2></h2>
            <div className="text-sm mt-4 text-gray-500 text-right">
              <h2 className="text-2xl font-bold">Receipt</h2>
              <p>SaleSphere</p>
              <p>REG: 000000000000</p>
              <p>sale@salesphere.com | +64 123 1234 123</p>
              <p>Receipt Number: INV-0002</p>
              <p>Date: {new Date().toLocaleDateString()}</p>
              <p>Time: {new Date().toLocaleTimeString()}</p>
            </div>
          </div>

          {/* Payment Badge */}
          <div className="mb-4 text-right">
            <span className="px-4 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-lg">
              {lastPaymentMethod} payment
            </span>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-sm text-gray-600 uppercase">
                <tr>
                  <th className="py-2 px-4">Product</th>
                  <th className="py-2 px-4 text-center">Qty</th>
                  <th className="py-2 px-4 text-right">Unit Price</th>
                  <th className="py-2 px-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {lastCheckoutItems.map((item) => (
                  <tr key={item.id} className="border-b last:border-none">
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 px-4 text-center">
                      <EditCash amount={item.quantity} />
                    </td>
                    <td className="py-2 px-4 text-right">
                      {/* ${item.price.toFixed(2)} */}
                      <EditCash amount={item.price} isMoney />
                    </td>
                    <td className="py-2 px-4 text-right">
                      {/* ${(item.price * item.quantity).toFixed(2)} */}
                      <EditCash amount={item.price * item.quantity} isMoney />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div className="mt-6 space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                <EditCash amount={subtotal} isMoney />
              </span>
            </div>
            <div className="flex justify-between">
              <span>VAT</span>
              <span>
                <EditCash amount={vat} isMoney />
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>
                <EditCash amount={total} isMoney />
              </span>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => console.log("Printing receipt...")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
            >
              Print Receipt
            </button>
            <button
              onClick={handleCloseReceiptDialog}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
