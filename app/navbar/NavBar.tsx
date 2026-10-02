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
  isPlainClick,
} from "@/components/ui/resizable-navbar";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import Link from "next/link";
import { PropsWithChildren, ReactNode, useState } from "react";
import { scrollToId } from "@/components/util";
import { NAV_SECTIONS, getSection } from "@/lib/sections";

interface NavBarProps extends PropsWithChildren {
  children?: ReactNode;
  className?: string;
}

const MOBILE_MENU_ID = "mobile-nav-menu";

const NavBar = ({ children, className = "" }: NavBarProps) => {
  // Driven from lib/sections.ts so the navbar, the routes and the sitemap can
  // never disagree about what sections exist.
  const navItems = NAV_SECTIONS.map((section) => ({
    name: section.nav!,
    id: section.id,
    path: section.path,
  }));

  const contactPath = getSection("contact")?.path ?? "/contact";
  const enrolPath = getSection("enrol")?.path ?? "/enrol";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navBarOnClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    if (!isPlainClick(e)) return;
    e.preventDefault();
    scrollToId(id);
  };

  const navBarOnClickMobile = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    if (!isPlainClick(e)) return;
    e.preventDefault();
    setIsMobileMenuOpen(false);
    scrollToId(id);
  };

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton
              as={"a"}
              href={contactPath}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                navBarOnClick(e, "contact")
              }
              variant="secondary"
            >
              Contact Us
            </NavbarButton>
            <NavbarButton
              as={"a"}
              href={enrolPath}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                navBarOnClick(e, "enrol")
              }
              variant="primary"
            >
              Enrol
            </NavbarButton>
            <AnimatedThemeToggler className="z-0 cursor-pointer" />
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className="flex items-center gap-2">
              <AnimatedThemeToggler className="z-0 cursor-pointer p-1" />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                controls={MOBILE_MENU_ID}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            id={MOBILE_MENU_ID}
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                prefetch={false}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                  navBarOnClickMobile(e, item.id)
                }
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                as={"a"}
                href={contactPath}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                  navBarOnClickMobile(e, "contact")
                }
                variant="primary"
                className="w-full"
              >
                Contact Us
              </NavbarButton>
              <NavbarButton
                as={"a"}
                href={enrolPath}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                  navBarOnClickMobile(e, "enrol")
                }
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
