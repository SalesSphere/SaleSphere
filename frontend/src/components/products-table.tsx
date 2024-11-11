"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Copy, Link2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  uploader: {
    name: string;
    avatar: string;
  };
  quantity: number;
  dateAdded: string;
  barcode: string;
}

const products: Product[] = [
  {
    id: "11dac73902f246dfcc",
    name: "Fresh Del Monte Ap...",
    price: 1000,
    uploader: {
      name: "Boma Pakabo",
      avatar: "/salesUser.svg",
    },
    quantity: 200,
    dateAdded: "08 Nov, 24",
    barcode: "11dac73902f246dfcc",
  },
  {
    id: "06200066d56e9281d",
    name: "Green Giant Vegeta...",
    price: 500,
    uploader: {
      name: "Funke Oyelowo",
      avatar: "/salesUser.svg",
    },
    quantity: 50,
    dateAdded: "08 Nov, 24",
    barcode: "11dac73902f246dfcc",
  },
  {
    id: "46eb2a65c93013e0a",
    name: "Dole Bananas",
    price: 750,
    uploader: {
      name: "Lara Adeyemi",
      avatar: "/salesUser.svg",
    },
    quantity: 150,
    dateAdded: "10 Nov, 24",
    barcode: "11dac73902f246dfcc",
  },
  {
    id: "2f5fe6b9d3e7b7400",
    name: "Ocean Spray Cranbe...",
    price: 1200,
    uploader: {
      name: "Tolu Ogunlade",
      avatar: "/salesUser.svg",
    },
    quantity: 100,
    dateAdded: "10 Nov, 24",
    barcode: "11dac73902f246dfcc",
  },
  {
    id: "c1a3c44e9b72c446b",
    name: "Chiquita Pineapple",
    price: 900,
    uploader: {
      name: "Kemi Bakare",
      avatar: "/salesUser.svg",
    },
    quantity: 120,
    dateAdded: "10 Nov, 24",
    barcode: "11dac73902f246dfcc",
  },
  {
    id: "9d6cf1b1b686c9d5b",
    name: "Sunkist Oranges",
    price: 1050,
    uploader: {
      name: "Femi Akindele",
      avatar: "/salesUser.svg",
    },
    quantity: 80,
    dateAdded: "10 Nov, 24",
    barcode: "11dac73902f246dfcc",
  },
  {
    id: "db5e1f9b8a3f8196e",
    name: "NatureSweet Tomat...",
    price: 800,
    uploader: {
      name: "Temi Osagie",
      avatar: "/salesUser.svg",
    },
    quantity: 70,
    dateAdded: "10 Nov, 24",
    barcode: "11dac73902f246dfcc",
  },
  {
    id: "8b1d7fc47e6d3c1e2",
    name: "SunMaid Raisins",
    price: 1100,
    uploader: {
      name: "Tayo Adebayo",
      avatar: "/salesUser.svg",
    },
    quantity: 90,
    dateAdded: "10 Nov, 24",
    barcode: "11dac73902f246dfcc",
  },
  {
    id: "39a1d6a32d2f4b7c4",
    name: "Wonderful Pistachios",
    price: 1350,
    uploader: {
      name: "Yemi Fashola",
      avatar: "/salesUser.svg",
    },
    quantity: 110,
    dateAdded: "10 Nov, 24",
    barcode: "11dac73902f246dfcc",
  },
];

export default function ProductsTable() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="grid grid-cols-7 gap-4 bg-[#292D321A] pt-4 pb-1 rounded-md">
            <TableHead className="text-left">Product ID</TableHead>
            <TableHead className="text-left">Product name</TableHead>
            <TableHead className="text-left">Product price</TableHead>
            <TableHead className="text-left">Uploader</TableHead>
            <TableHead className="text-left">Quantity</TableHead>
            <TableHead className="text-left">Date added</TableHead>
            <TableHead className="text-left">Barcode</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="grid grid-cols-7 gap-4 py-2">
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {product.id}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyToClipboard(product.id)}>
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy product ID</span>
                  </Button>
                </div>
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>₦{product.price.toLocaleString()}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={product.uploader.avatar}
                      alt={product.uploader.name}
                    />
                    <AvatarFallback>{product.uploader.name[0]}</AvatarFallback>
                  </Avatar>
                  {product.uploader.name}
                </div>
              </TableCell>
              <TableCell className="text-left">{product.quantity}</TableCell>
              <TableCell>{product.dateAdded}</TableCell>
              <TableCell className="text-left">
                <a
                  href={`#${product.barcode}`}
                  className="inline-flex items-center gap-2 text-blue-500 hover:underline">
                  {product.barcode}
                  <Link2 className="h-4 w-4" />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
