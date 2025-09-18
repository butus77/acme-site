'use client';

import Link from "next/link";
import {usePathname} from "next/navigation";
import * as React from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>; // ← opcionális kattintás-kezelő
};

export default function NavLink({ href, children, onClick }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}                         // ← most már típusosan oké
      aria-current={isActive ? "page" : undefined}
      className={`px-2 py-1 rounded hover:underline focus:outline-none focus-visible:ring
        ${isActive ? "border" : ""}`}
    >
      {children}
    </Link>
  );
}
