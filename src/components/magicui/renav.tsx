"use client";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs"; // <-- import useUser
import { IconMenu2, IconX } from "@tabler/icons-react";

import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";

import React, { useRef, useState } from "react";

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

const navItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
  { name: "services", link: "/calculator" },
];

export const ReNavbar = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const { isSignedIn } = useUser(); // <-- get auth state here

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    setVisible(latest > 100);
  });

  return (
    <motion.div
      ref={ref}
      className={cn("sticky top-0 z-50 w-full", className)}
    >
      {/* Desktop Nav */}
      <motion.div
        animate={{
          backdropFilter: visible ? "blur(10px)" : "none",
          boxShadow: visible
            ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
            : "none",
          y: visible ? 20 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50,
        }}
        className={cn(
          "hidden lg:flex items-center justify-between max-w-7xl mx-auto px-4 py-2 rounded-full bg-white/80 dark:bg-neutral-950/80",
          className
        )}
      >
        <NavbarLogo />
        <NavItems items={navItems} />

        <NavbarButton href="/dashboard">Get Started</NavbarButton>

        {/* Conditional rendering SignIn/User buttons */}
        {!isSignedIn ? (
          <div className="text-bold bg-orange-500 border-2 border-black rounded-2xl px-2">
            <SignInButton>Sign In</SignInButton>
          </div>
        ) : (
          <div className="  ">
            <UserButton />
          </div>
        )}
      </motion.div>

      {/* Mobile Nav */}
      <motion.div
        animate={{
          backdropFilter: visible ? "blur(10px)" : "none",
          boxShadow: visible
            ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
            : "none",
          y: visible ? 20 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50,
        }}
        className="lg:hidden flex flex-col px-4 py-2 w-full max-w-[calc(100vw-2rem)] mx-auto bg-white/80 dark:bg-neutral-950/80 rounded-xl"
      >
        <div className="flex w-full items-center justify-between">
          <NavbarLogo />
          <MobileNavToggle isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 flex flex-col items-start space-y-4 bg-white dark:bg-neutral-950 rounded-lg p-4 shadow-lg"
            >
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-nav-${idx}`}
                  href={item.link}
                  className="text-black dark:text-white text-sm font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <NavbarButton href="/dashboard" className="mt-2 w-full">
                Get Started
              </NavbarButton>

              {/* Mobile Conditional SignIn/User buttons */}
              {!isSignedIn ? (
                <div className="text-bold bg-orange-500 border-2 border-black rounded-2xl px-2">
                  <SignInButton>Sign In</SignInButton>
                </div>
              ) : (
                <div className="flex justify-center border-2 border-black rounded-full">
                  <UserButton />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// Other components unchanged

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn("flex space-x-2 text-sm font-medium", className)}
    >
      {items.map((item, idx) => (
        <a
          key={`link-${idx}`}
          href={item.link}
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className={cn(
            "relative px-4 py-2 text-black dark:text-neutral-300 transition-colors duration-200",
            hovered === idx && "text-white"
          )}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-black"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </div>
  );
};

export const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="flex items-center space-x-2 text-2xl font-bold text-black dark:text-white"
    >
      <span className="text-orange-600">EasyDCF</span>
    </Link>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (React.ComponentPropsWithoutRef<"a"> | React.ComponentPropsWithoutRef<"button">)) => {
  const baseStyles =
    "px-4 py-2 rounded-md text-sm font-bold inline-block text-center transition duration-200 hover:-translate-y-0.5";

  const variantStyles = {
    primary: "bg-white text-black shadow-md",
    secondary: "bg-transparent text-white",
    dark: "bg-black text-white shadow-md",
    gradient: "bg-gradient-to-b from-blue-500 to-blue-700 text-white",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-black dark:text-white cursor-pointer" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-black dark:text-white cursor-pointer" onClick={onClick} />
  );
};
