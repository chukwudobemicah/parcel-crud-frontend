import React from "react";

export type IconName =
  | "package"
  | "plus"
  | "edit"
  | "trash"
  | "x"
  | "check"
  | "alert"
  | "search"
  | "chevron-down"
  | "chevron-up"
  | "menu";

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}

const iconPaths: Record<IconName, React.ReactNode> = {
  package: (
    <>
      <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </>
  ),
  plus: (
    <>
      <path d="M12 4v16m8-8H4" />
    </>
  ),
  edit: (
    <>
      <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </>
  ),
  trash: (
    <>
      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </>
  ),
  x: (
    <>
      <path d="M6 18L18 6M6 6l12 12" />
    </>
  ),
  check: (
    <>
      <path d="M5 13l4 4L19 7" />
    </>
  ),
  alert: (
    <>
      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </>
  ),
  search: (
    <>
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </>
  ),
  "chevron-down": (
    <>
      <path d="M19 9l-7 7-7-7" />
    </>
  ),
  "chevron-up": (
    <>
      <path d="M5 15l7-7 7 7" />
    </>
  ),
  menu: (
    <>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </>
  ),
};

export const Icon: React.FC<IconProps> = ({
  name,
  className = "",
  size = 24,
}) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {iconPaths[name]}
    </svg>
  );
};
