import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Avatar } from "../src/components/ui/Avatar/Avatar";

describe("Avatar Component", () => {
  it("renders initials fallback for given name", () => {
    render(<Avatar name="Pahar Dwivedi" />);
    expect(screen.getByText("PD")).toBeDefined();
    expect(screen.getByRole("img").getAttribute("aria-label")).toBe("Pahar Dwivedi");
  });

  it("handles missing name with fallback symbol", () => {
    render(<Avatar />);
    expect(screen.getByText("?")).toBeDefined();
  });

  it("renders status indicator when status prop is provided", () => {
    const { container } = render(<Avatar name="Alex Doe" status="online" />);
    const dot = container.querySelector('[aria-label="Status: online"]');
    expect(dot).toBeDefined();
  });

  it("falls back to initials if image fails to load", () => {
    render(
      <Avatar
        src="https://invalid-domain.com/broken-image.jpg"
        name="Sarah Connor"
      />
    );
    const img = screen.getByRole("img", { name: "Sarah Connor" });
    expect(img).toBeDefined();

    // Trigger image error
    fireEvent.error(img);

    // Should now show initials and fallback role
    expect(screen.getByText("SC")).toBeDefined();
  });
});
