"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selected: boolean;
}

export default function ProductOrderTable() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "11dac73902f246dfcc",
      name: "Fresh Del Monte Apple",
      price: 1000,
      quantity: 20,
      selected: true,
    },
    {
      id: "11dac73902f246dfcc",
      name: "Chiquita Pineapple",
      price: 1500,
      quantity: 1,
      selected: true,
    },
    {
      id: "11dac73902f246dfcc",
      name: "Dole Bananas",
      price: 700,
      quantity: 30,
      selected: true,
    },
    {
      id: "11dac73902f246dfcc",
      name: "Ocean Spray Cranberries",
      price: 800,
      quantity: 15,
      selected: true,
    },
    {
      id: "11dac73902f246dfcc",
      name: "Bolthouse Farms Carrots",
      price: 600,
      quantity: 25,
      selected: true,
    },
    {
      id: "11dac73902f246dfcc",
      name: "Driscoll's Strawberries",
      price: 1200,
      quantity: 10,
      selected: true,
    },
    {
      id: "11dac73902f246dfcc",
      name: "Sunkist Oranges",
      price: 2000,
      quantity: 0,
      selected: false,
    },
    {
      id: "11dac73902f246dfcc",
      name: "Green Giant Vegetables",
      price: 2000,
      quantity: 0,
      selected: false,
    },
    {
      id: "11dac73902f246dfcc",
      name: "Wonderful Pistachios",
      price: 2000,
      quantity: 0,
      selected: false,
    },
    {
      id: "11dac73902f246dfcc",
      name: "SunMaid Raisins",
      price: 15000,
      quantity: 0,
      selected: false,
    },
  ]);

  const updateQuantity = (index: number, increment: boolean) => {
    setProducts(
      products.map((product, i) => {
        if (i === index) {
          const newQuantity = increment
            ? product.quantity + 1
            : Math.max(0, product.quantity - 1);
          return { ...product, quantity: newQuantity };
        }
        return product;
      })
    );
  };

  const toggleSelection = (index: number) => {
    setProducts(
      products.map((product, i) => {
        if (i === index) {
          return { ...product, selected: !product.selected };
        }
        return product;
      })
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 rounded-md overflow-hidden py-4">
            <TableHead className="w-[50px] py-5"></TableHead>
            <TableHead className="py-4">Product ID</TableHead>
            <TableHead className="py-4">Product name</TableHead>
            <TableHead className="text-left py-5">Selling price</TableHead>
            <TableHead className="text-left py-5">Quantity</TableHead>
            <TableHead className="text-left py-5">Total price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="h-5 !border-none" />
          {products.map((product, index) => (
            <TableRow key={`${product.id}-${index}`}>
              <TableCell>
                <Checkbox
                  checked={product.selected}
                  onCheckedChange={() => toggleSelection(index)}
                />
              </TableCell>
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell className="text-left">
                ₦{product.price.toLocaleString()}
              </TableCell>
              <TableCell className="flex items-center justify-start gap-2">
                {/* <div className="flex items-center justify-start gap-2"> */}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(index, false)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{product.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(index, true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                {/* </div> */}
              </TableCell>
              <TableCell className="text-left">
                ₦{(product.quantity * product.price).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
