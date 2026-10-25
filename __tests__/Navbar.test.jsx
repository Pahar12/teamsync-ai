import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "../src/components/layout/Navbar/Navbar";

describe("Navbar Component", () => {
  it("renders brand name and navigation items", () => {
    render(<Navbar />);
    expect(screen.getByText("TeamSync AI")).toBeDefined();
    expect(screen.getByText("Matching Simulator")).toBeDefined();
    expect(screen.getByText("Problem & Solution")).toBeDefined();
    expect(screen.getByText("Features")).toBeDefined();
    expect(screen.getByText("Transparency")).toBeDefined();
  });

  it("toggles mobile menu on button click and closes on Escape key", () => {
    render(<Navbar />);
    const toggleButton = screen.getByLabelText("Open navigation menu");
    expect(toggleButton).toBeDefined();

    // Open menu
    fireEvent.click(toggleButton);
    expect(screen.getByLabelText("Close navigation menu")).toBeDefined();

    // Press Escape to close
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.getByLabelText("Open navigation menu")).toBeDefined();
  });
});
