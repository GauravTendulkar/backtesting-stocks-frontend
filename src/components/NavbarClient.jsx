"use client";

import { useTheme } from "next-themes";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoonIcon, SunIcon, HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Logout from "./social-login/Logout";
import Link from "next/link";

const NavBarClient = ({ session, roles = [] }) => {
  const { setTheme, theme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { label: "Strategy Builder", href: "/strategy-builder" },
    { label: "Categories", href: "/categories" },
    ...(session ? [{ label: "Dashboard", href: "/dashboard/1" }] : []),
    ...(session ? [{ label: "Stock List", href: "/stock-list" }] : []),
    ...(roles.includes("admin-dashboard")
      ? [{ label: "Admin Dashboard", href: "/admin-dashboard" }]
      : []),
  ];

  return (
    <nav className="border-b border-gray-300 px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Title */}
        <Button
          variant="link"
          onClick={() => router.push("/")}
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("text/plain", `${window.location.origin}/`)
          }
          className="text-lg font-semibold"
        >
          Backtesting App
        </Button>

        {/* Hamburger Icon (mobile only) */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <Cross1Icon /> : <HamburgerMenuIcon />}
          </Button>
        </div>

        {/* Menu links - visible on desktop */}
        <ul className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Button
                variant="link"
                onClick={() => router.push(link.href)}
                draggable
                onDragStart={(e) =>
                  e.dataTransfer.setData("text/plain", `${window.location.origin}${link.href}`)
                }
              >
                {link.label}
              </Button>
            </li>
          ))}

          <li>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            </Button>
          </li>

          {!session && (
            <li>
              <Link
                href="/sign-in"
                className="underline px-3 py-1 border border-black rounded-md"
              >
                Sign In
              </Link>
            </li>
          )}
          {!!session && (
            <li>
              <Logout />
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 space-y-2">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                router.push(link.href);
                setMenuOpen(false);
              }}
            >
              {link.label}
            </Button>
          ))}

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            Toggle Theme
          </Button>

          {!session && (
            <Link
              href="/sign-in"
              className="block w-full text-left px-4 py-2 underline border border-black rounded-md"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
          {!!session && <Logout />}
        </div>
      )}
    </nav>
  );
};

export default NavBarClient;
