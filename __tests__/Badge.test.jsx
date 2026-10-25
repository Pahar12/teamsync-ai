import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "../src/components/ui/Badge/Badge";

describe("Badge Component", () => {
  it("renders text content with default variant", () => {
    render(<Badge>Frontend</Badge>);
    expect(screen.getByText("Frontend")).toBeDefined();
  });

  it("renders with custom semantic variant", () => {
    const { container } = render(<Badge variant="success">Completed</Badge>);
    expect(screen.getByText("Completed")).toBeDefined();
    expect(container.firstChild.className).toContain("success");
  });

  it("renders with icon when provided", () => {
    render(
      <Badge icon={<span data-testid="badge-icon">★</span>} variant="warning">
        Priority
      </Badge>
    );
    expect(screen.getByTestId("badge-icon")).toBeDefined();
    expect(screen.getByText("Priority")).toBeDefined();
  });
});
