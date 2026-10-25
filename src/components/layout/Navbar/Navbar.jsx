"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { Users, Menu, X, ArrowUpRight } from "lucide-react";
import styles from "./Navbar.module.css";

const NAVIGATION_ITEMS = [
  { label: "Overview", href: "#overview" },
  { label: "Matching Simulator", href: "#matching-preview" },
  { label: "Problem & Solution", href: "#problem-solution" },
  { label: "Features", href: "#features" },
  { label: "Transparency", href: "#transparency" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key press
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [mobileMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Brand */}
        <Link href="#overview" className={styles.brand}>
          <span className={styles.brandIcon} aria-hidden="true">
            <Users size={18} />
          </span>
          <span>TeamSync AI</span>
          <span className={styles.tag}>Capstone &apos;26</span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation">
          <ul className={styles.navLinks}>
            {NAVIGATION_ITEMS.map((item) => (
              <li key={item.label}>
                <a href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              const el = document.getElementById("matching-preview");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Try Simulator
          </Button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className={styles.mobileToggle}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenuOpen ? styles.mobileMenu + " " + styles.mobileMenuOpen : styles.mobileMenu}>
          <nav aria-label="Mobile Navigation">
            {NAVIGATION_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={styles.mobileNavLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{item.label}</span>
                <ArrowUpRight size={16} />
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
