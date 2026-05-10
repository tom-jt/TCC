"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import Link from "next/link";
import { PropsWithChildren, ReactNode, useState } from "react";

interface NavBarProps extends PropsWithChildren {
  children?: ReactNode;
  className?: string;
}

const NavBar = ({ children, className = "" }: NavBarProps) => {
  const navItems = [
    {
      name: "Noticeboard",
      link: "#noticeboard",
    },
    {
      name: "Classes",
      link: "#classes",
    },
    {
      name: "Holiday",
      link: "#holiday",
    },
    {
      name: "Results",
      link: "#results",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton as={Link} href="#contact" variant="secondary">
              Contact Us
            </NavbarButton>
            <NavbarButton as={Link} href="#enrol" variant="primary">
              Enrol
            </NavbarButton>
            <AnimatedThemeToggler className="z-0 cursor-pointer" />
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Contact Us
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Enrol
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <div className={className}>{children}</div>
    </div>
  );
};

export default NavBar;
