import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTotalPagesByLimit = (
  totalRecords: number,
  pageSize: number
) => {
  let totalPages = 0;
  while (totalRecords > 0) {
    totalRecords = totalRecords - pageSize;
    totalPages = totalPages + 1;
  }
  return totalPages;
};

export function extractAddressParts(address: string) {
  // Get the first 6 characters
  const firstPart = address.slice(0, 6);
  // Get the last 4 characters
  const lastPart = address.slice(-4);
  // Return the combined result
  return `${firstPart}...${lastPart}`;
}
