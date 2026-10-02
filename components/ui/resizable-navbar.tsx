"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";

import React, { useEffect, useRef, useState } from "react";
import { scrollToId } from "../util";
import content from "@/data/general.json";
import type { GeneralContent } from "@/data/types";

const general: GeneralContent = content;

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

export interface NavItem {
  name: string;
  /** DOM id of the section to scroll to. */
  id: string;
  /** Real route that deep-links to the same section. */
  path: string;
}

interface NavItemsProps {
  items: NavItem[];
  className?: string;
  onItemClick?: () => void;
}

/**
 * Nav links are real links to real routes, so middle-click, ctrl-click and
 * "open in new tab" all work. Only an unmodified left click is intercepted and
 * turned into a scroll.
 */
export const isPlainClick = (event: React.MouseEvent) =>
  !event.metaKey &&
  !event.ctrlKey &&
  !event.shiftKey &&
  !event.altKey &&
  event.button === 0;

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  id?: string;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("fixed inset-x-0 top-20 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(2px)" : "none",
        // One quiet shadow and a hairline, rather than six stacked glows.
        boxShadow: visible
          ? "0 1px 0 0 rgba(23, 23, 23, 0.12), 0 8px 24px rgba(23, 23, 23, 0.06)"
          : "none",
        width: visible ? "70%" : "100%",
        y: visible ? -20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-60 mx-auto hidden w-full max-w-screen lg:min-w-5xl xl:min-w-7xl flex-row items-center justify-between self-start rounded-xs bg-transparent px-4 py-2 lg:flex dark:bg-transparent",
        visible && "bg-zinc-50/80 dark:bg-neutral-950/80",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className
      )}
    >
      {items.map((item, idx) => (
        // prefetch={false}: every one of these routes renders the very same
        // page, so there is nothing worth fetching ahead of time.
        <Link
          href={item.path}
          prefetch={false}
          onMouseEnter={() => setHovered(idx)}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            if (!isPlainClick(e)) return;
            e.preventDefault();
            scrollToId(item.id);
          }}
          className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300 cursor-pointer"
          key={item.id}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-xs bg-neutral-200/70 dark:bg-neutral-800"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </Link>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(2px)" : "none",
        // One quiet shadow and a hairline, rather than six stacked glows.
        boxShadow: visible
          ? "0 1px 0 0 rgba(23, 23, 23, 0.12), 0 8px 24px rgba(23, 23, 23, 0.06)"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: "2px",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible && "bg-zinc-50/80 dark:bg-neutral-950/80",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
  id,
}: MobileNavMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Escape and a click outside both close the menu. Without these the only way
  // out was the toggle itself, which is easy to miss on a small screen.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (menuRef.current?.contains(target)) return;
      // Clicks on the toggle are its own business — closing here too would
      // immediately undo the reopen.
      if ((target as HTMLElement).closest?.("[data-mobile-nav-toggle]")) return;
      onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          id={id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-xs bg-white px-4 py-8 border border-hairline shadow-lg dark:bg-neutral-950",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * A real <button>. This used to hang onClick straight on the icon <svg>, which
 * meant the mobile menu could not be opened by keyboard at all and had no
 * accessible name.
 */
export const MobileNavToggle = ({
  isOpen,
  onClick,
  controls,
}: {
  isOpen: boolean;
  onClick: () => void;
  controls?: string;
}) => {
  return (
    <button
      type="button"
      data-mobile-nav-toggle
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls={controls}
      className="cursor-pointer p-1 text-neutral-800 dark:text-neutral-200"
    >
      {isOpen ? (
        <IconX aria-hidden="true" />
      ) : (
        <IconMenu2 aria-hidden="true" />
      )}
    </button>
  );
};

export const NavbarLogo = () => {
  return (
    <Link
      href="/"
      prefetch={false}
      className="relative cursor-pointer z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!isPlainClick(e)) return;
        e.preventDefault();
        scrollToId("home");
      }}
    >
      <Image
        src={general.logo}
        alt=""
        aria-hidden="true"
        className="dark:invert object-contain"
        width={50}
        height={50}
      />
      <span className="font-medium">Target Coaching College</span>
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
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 rounded-xs button text-sm font-medium relative cursor-pointer transition-colors duration-200 inline-block text-center";

  // Solid fills and hairlines instead of the stacked six-layer glow shadows
  // these carried before.
  const variantStyles = {
    primary: "btn-accent bg-accent-brand text-accent-contrast",
    secondary:
      "bg-transparent text-neutral-700 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white",
    dark: "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-zinc-50 dark:text-neutral-900",
    gradient: "btn-accent bg-accent-brand text-accent-contrast",
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
