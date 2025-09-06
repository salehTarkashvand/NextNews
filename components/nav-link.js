"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const pth = usePathname();
  return (
    <Link href={href} className={pth.startsWith(href) ? "active" : undefined}>
      {children}
    </Link>
  );
}
