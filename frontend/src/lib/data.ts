import MemoDashboard from "@/icons/Dashboard";
import { Sale } from "./types";
import { Inventory } from "./types";
import MemoProducts from "@/icons/Products";
import MemoSales from "@/icons/Sales";
import MemoUsers from "@/icons/Users";
import MemoSettings from "@/icons/Settings";
import MemoInventory from "@/icons/Inventory";
import MemoNotification from "@/icons/Notification";
import InventoryIcon from "@/icons/Inventory";

export const navigation = [
  { name: "Dashboard", href: "/r/dashboard/overview", icon: MemoDashboard },
  { name: "Products", href: "/r/dashboard/products", icon: MemoProducts },
  { name: "Sales", href: "/r/dashboard/sales", icon: MemoSales },
  { name: "Users", href: "/r/dashboard/users", icon: MemoUsers },
  { name: "Checkout", href: "/r/dashboard/checkout", icon: InventoryIcon },
  { name: "Settings", href: "/r/dashboard/settings", icon: MemoSettings },
];
export const managerNavigation = [
  { name: "Dashboard", href: "/m/dashboard/overview", icon: MemoDashboard },
  { name: "Products", href: "/m/dashboard/products", icon: MemoProducts },
  { name: "Sales", href: "/m/dashboard/sales", icon: MemoSales },
  { name: "Settings", href: "/m/dashboard/settings", icon: MemoSettings },
];
export const adminNavigation = [
  { name: "Dashboard", href: "/a/dashboard/overview", icon: MemoDashboard },
  { name: "Products", href: "/a/dashboard/products", icon: MemoProducts },
  { name: "Sales", href: "/a/dashboard/sales", icon: MemoSales },
  { name: "Users", href: "/a/dashboard/users", icon: MemoUsers },
  { name: "Settings", href: "/a/dashboard/settings", icon: MemoSettings },
  { name: "Inventory", href: "/a/dashboard/inventory", icon: MemoInventory },
  {
    name: "Notification",
    href: "/a/dashboard/notifications",
    icon: MemoNotification,
  },
];

export const sales: Sale[] = [
  {
    id: "11dac73902f246dfcc",
    productName: "Fresh Del Monte Ap...",
    price: 1000,
    time: "12:00pm",
    date: "08 Nov, 24",
    quantity: 200,
    rep: {
      name: "Boma Pakabo",
      avatar: "/salesUser.svg",
    },
    paymentMode: "Card",
  },
  {
    id: "06200066d56e9281d",
    productName: "Green Giant Vegeta...",
    price: 500,
    time: "11:56am",
    date: "08 Nov, 24",
    quantity: 50,
    rep: {
      name: "Funke Oyelowo",
      avatar: "/salesUser.svg",
    },
    paymentMode: "Bank transfer",
  },
  {
    id: "46eb2a65c93013e0a",
    productName: "Dole Bananas",
    price: 750,
    time: "11:52am",
    date: "08 Nov, 24",
    quantity: 150,
    rep: {
      name: "Lara Adeyemi",
      avatar: "/salesUser.svg",
    },
    paymentMode: "POS",
  },
  {
    id: "2f5fe6b9d3e7b7400",
    productName: "Ocean Spray Cranbe...",
    price: 1200,
    time: "11:50am",
    date: "08 Nov, 24",
    quantity: 100,
    rep: {
      name: "Tolu Ogunlade",
      avatar: "/salesUser.svg",
    },
    paymentMode: "Bank transfer",
  },
  {
    id: "c1a3c44e9bc446b",
    productName: "Chiquita Pineapple",
    price: 900,
    time: "11:50am",
    date: "08 Nov, 24",
    quantity: 120,
    rep: {
      name: "Kemi Bakare",
      avatar: "/salesUser.svg",
    },
    paymentMode: "Bank transfer",
  },
  {
    id: "9d6cf1b1b686c9d5b",
    productName: "Sunkist Oranges",
    price: 1050,
    time: "11:50am",
    date: "08 Nov, 24",
    quantity: 80,
    rep: {
      name: "Femi Akindele",
      avatar: "/salesUser.svg",
    },
    paymentMode: "POS",
  },
  {
    id: "db5e1f9b8a3f8196e",
    productName: "NatureSweet Tomat...",
    price: 800,
    time: "11:50am",
    date: "08 Nov, 24",
    quantity: 70,
    rep: {
      name: "Temi Osagie",
      avatar: "/salesUser.svg",
    },
    paymentMode: "POS",
  },
  {
    id: "8b1d7fc47e6d3c1e2",
    productName: "SunMaid Raisins",
    price: 1100,
    time: "11:50am",
    date: "08 Nov, 24",
    quantity: 90,
    rep: {
      name: "Tayo Adebayo",
      avatar: "/salesUser.svg",
    },
    paymentMode: "POS",
  },
  {
    id: "39a1d6a32d2f4b7c4",
    productName: "Wonderful Pistachios",
    price: 1350,
    time: "11:50am",
    date: "08 Nov, 24",
    quantity: 110,
    rep: {
      name: "Yemi Fashola",
      avatar: "/salesUser.svg",
    },
    paymentMode: "POS",
  },
];

export const inventory: Inventory[] = [
  {
    id: "11dac73902f24",
    productName: "Fresh Del Monte Apple",
    price: 1000,
    date: "08 Nov, 24",
    quantity: 200,
    rep: {
      name: "Boma Pakabo",
      avatar: "/salesUser.svg",
    },
    barcode: "11dac73902f246dfcc",
  },
  {
    id: "11dac73902f246dfc",
    productName: "Green Giant Vegetables",
    price: 500,
    date: "08 Nov, 24",
    quantity: 50,
    rep: {
      name: "Funke Oyelowo",
      avatar: "/salesUser.svg",
    },
    barcode: "11dac73902f246dfcc",
  },
  {
    id: "11dac73902f24dfc",
    productName: "Dole Bananas",
    price: 750,
    date: "10 Nov, 24",
    quantity: 150,
    rep: {
      name: "Lara Adeyemi",
      avatar: "/salesUser.svg",
    },
    barcode: "11dac73902f246dfcc",
  },
  {
    id: "11dac73902f246dc",
    productName: "Ocean Spray Cranberries",
    price: 1200,
    date: "10 Nov, 24",
    quantity: 100,
    rep: {
      name: "Tolu Ogunlade",
      avatar: "/salesUser.svg",
    },
    barcode: "11dac73902f246dfcc",
  },
  {
    id: "1ac73902f26dfcc",
    productName: "Chiquita Pineapple",
    price: 900,
    date: "10 Nov, 24",
    quantity: 120,
    rep: {
      name: "Kemi Bakare",
      avatar: "/salesUser.svg",
    },
    barcode: "11dac73902f246dfcc",
  },
  {
    id: "1ac73902f246dfcc",
    productName: "Sunkist Oranges",
    price: 1050,
    date: "10 Nov, 24",
    quantity: 80,
    rep: {
      name: "Femi Akindele",
      avatar: "/salesUser.svg",
    },
    barcode: "11dac73902f246dfcc",
  },
  {
    id: "11da3902f246dfcc",
    productName: "NatureSweet Tomatoes",
    price: 800,
    date: "10 Nov, 24",
    quantity: 70,
    rep: {
      name: "Temi Osagie",
      avatar: "/salesUser.svg",
    },
    barcode: "11dac73902f246dfcc",
  },
  {
    id: "11dac739026dfcc",
    productName: "SunMaid Raisins",
    price: 1100,
    date: "10 Nov, 24",
    quantity: 90,
    rep: {
      name: "Tayo Adebayo",
      avatar: "/salesUser.svg",
    },
    barcode: "11dac73902f246dfcc",
  },
  {
    id: "11c7390f246dfcc",
    productName: "Wonderful Pistachios",
    price: 1350,
    date: "10 Nov, 24",
    quantity: 110,
    rep: {
      name: "Yemi Fashola",
      avatar: "/salesUser.svg",
    },
    barcode: "11dac73902f246dfcc",
  },
];
