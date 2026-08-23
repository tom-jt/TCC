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
import { PropsWithChildren, ReactNode, useState } from "react";
import { scrollToId } from "@/components/util";

interface NavBarProps extends PropsWithChildren {
  children?: ReactNode;
  className?: string;
}

const NavBar = ({ children, className = "" }: NavBarProps) => {
  const navItems = [
    {
      name: "Noticeboard",
      link: "noticeboard",
    },
    {
      name: "Classes",
      link: "classes",
    },
    {
      name: "Holiday",
      link: "holiday",
    },
    {
      name: "Results",
      link: "results",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navBarOnClick = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    scrollToId(id);
  };

  const navBarOnClickMobile = (
    e: React.MouseEvent<HTMLElement>,
    id: string,
  ) => {
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
              onClick={(e: React.MouseEvent<HTMLElement>) =>
                navBarOnClick(e, "contact")
              }
              variant="secondary"
            >
              Contact Us
            </NavbarButton>
            <NavbarButton
              as={"a"}
              onClick={(e: React.MouseEvent<HTMLElement>) =>
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
                onClick={(e: React.MouseEvent<HTMLElement>) =>
                  navBarOnClickMobile(e, item.link)
                }
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={(e: React.MouseEvent<HTMLElement>) =>
                  navBarOnClickMobile(e, "contact")
                }
                variant="primary"
                className="w-full"
              >
                Contact Us
              </NavbarButton>
              <NavbarButton
                onClick={(e: React.MouseEvent<HTMLElement>) =>
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
