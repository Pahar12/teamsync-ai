import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../src/components/ui/Button/Button";

describe("Button Component", () => {
  it("renders with default props and text content", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: "Click Me" });
    expect(button).toBeDefined();
    expect(button.getAttribute("type")).toBe("button");
  });

  it("handles user click events", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Submit</Button>);
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("prevents clicks and applies disabled attributes when disabled", () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled Action
      </Button>
    );
    const button = screen.getByRole("button", { name: "Disabled Action" });
    expect(button.getAttribute("disabled")).toBeDefined();
    expect(button.getAttribute("aria-disabled")).toBe("true");

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders loading state with spinner and aria-busy", () => {
    render(<Button isLoading>Save Project</Button>);
    const button = screen.getByRole("button", { name: "Save Project" });
    expect(button.getAttribute("aria-busy")).toBe("true");
    expect(screen.getByTestId("button-spinner")).toBeDefined();
  });

  it("renders left and right icons when provided", () => {
    render(
      <Button
        leftIcon={<span data-testid="left-icon">←</span>}
        rightIcon={<span data-testid="right-icon">→</span>}
      >
        Navigate
      </Button>
    );
    expect(screen.getByTestId("left-icon")).toBeDefined();
    expect(screen.getByTestId("right-icon")).toBeDefined();
  });
});
