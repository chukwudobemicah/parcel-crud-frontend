import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...args: any[]) {
  // console.log("cn called with:", args);
  return twMerge(clsx(args));
}

export const copyToClipboard = (text: string) => {
  navigator?.clipboard?.writeText(text);
};

export function formatAddress(address: string) {
  if (!address) return "";
  return address.slice(0, 4) + "...." + address.slice(-6);
}
export function formatAddressEnd(address: string) {
  if (!address) return "";
  return "...." + address.slice(-6);
}

export function getTimeDifference(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  } else {
    const minutes = Math.floor(diffInSeconds / 60);
    const seconds = diffInSeconds % 60;
    return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
  }
}

export function nFormatter(num: number, digits: number) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "Q" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let item = lookup
    .slice()
    .reverse()
    .find((item) => num >= item.value);
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

export function truncateString(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

export function percentageDifferent(a: number, b: number): number {
  return ((b - a) / a) * 100;
}

export function formatString(address: string, length: number) {
  if (!address) return "";
  return address.slice(0, length) + "...." + address.slice(-length);
}

// Helper function to get role-based dashboard URL
export function getRoleDashboardUrl(role: string): string {
  switch (role.toUpperCase()) {
    case "SENDER":
    case "CUSTOMER":
      return "/dashboard/sender/bookings";
    case "RIDER":
      return "/dashboard/rider/dashboard";
    case "BUSINESS":
      return "/dashboard/business/bookings";
    case "ADMIN":
      return "/dashboard/admin/statistics";
    default:
      return "/";
  }
}
