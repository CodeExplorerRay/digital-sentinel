/** @jsxImportSource @emotion/react */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { keyframes } from "@emotion/react";

const pulse = keyframes`
  0%, 100% { border-color: rgba(29, 58, 95, 0.5); }
  50% { border-color: rgba(0, 255, 135, 0.3); }
`;

/**
 * The main header component for the application, including navigation and logo.
 */
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className="sticky top-0 z-50 bg-dark-bg/80 backdrop-blur-md shadow-lg border-b"
      css={{ animation: `${pulse} 4s ease-in-out infinite` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and App Name */}
          <Link href="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
            <Image
              src="/images/logo.png"
              alt="Digital Sentinel Logo"
              width={40}
              height={40}
              priority
              className="object-contain h-10 w-auto"
            />
            <span className="ml-2 text-2xl font-bold text-logo-cyan">
              Digital <span className="text-text-main">Sentinel</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <NavLink href="/#tools">Free Tools</NavLink>
            <NavLink href="/#purpose">How It Works</NavLink>
            <NavLink href="/#resources">Resources</NavLink>
            <NavLink href="/#subscribe">Alerts</NavLink>
          </nav>

          <div className="hidden md:block">
            <Link
              href="/#tools"
              role="button"
              className="block w-full text-center px-4 py-2 border border-accent text-sm font-medium rounded-lg shadow-md text-accent bg-transparent hover:bg-accent/10 transition duration-150 ease-in-out"
            >
              Launch Analyzer
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-accent hover:bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink href="/#tools" onClick={closeMenu}>Free Tools</NavLink>
          <NavLink href="/#purpose" onClick={closeMenu}>How It Works</NavLink>
          <NavLink href="/#resources" onClick={closeMenu}>Resources</NavLink>
          <NavLink href="/#subscribe" onClick={closeMenu}>Alerts</NavLink>
        </div>
        <div className="px-2 pb-3">
          <Link href="/#tools" role="button" onClick={closeMenu} className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-md text-white bg-green-500 hover:bg-green-600 transition duration-150 ease-in-out">
            Launch Analyzer
          </Link>
        </div>
      </div>
    </header>
  );
}

/**
 * A styled navigation link component for the header.
 * @param {{
 *  href: string;
 *  children: React.ReactNode;
 *  onClick?: () => void;
 * }} props
 */
const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode, onClick?: () => void }) => (
  <Link
    href={href}
    onClick={onClick}
    className="text-text-secondary hover:text-accent transition duration-150 ease-in-out font-medium block px-3 py-2 rounded-md text-base"
  >
    {children}
  </Link>
);
