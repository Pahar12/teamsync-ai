import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "../src/components/ui/Input/Input";

describe("Input Component", () => {
  it("renders with label linked to input id", () => {
    render(<Input label="Project Name" id="project-name" />);
    const input = screen.getByLabelText("Project Name");
    expect(input).toBeDefined();
    expect(input.getAttribute("id")).toBe("project-name");
  });

  it("handles user typing and value change", () => {
    const handleChange = vi.fn();
    render(<Input placeholder="Enter skill" onChange={handleChange} />);
    const input = screen.getByPlaceholderText("Enter skill");
    fireEvent.change(input, { target: { value: "Next.js" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("renders error message and applies invalid attributes", () => {
    render(
      <Input
        label="Team Size"
        id="team-size"
        error="Team size must be between 3 and 5"
      />
    );
    const input = screen.getByLabelText("Team Size");
    expect(input.getAttribute("aria-invalid")).toBe("true");

    const errorMsg = screen.getByRole("alert");
    expect(errorMsg.textContent).toBe("Team size must be between 3 and 5");
    expect(input.getAttribute("aria-describedby")).toContain(errorMsg.id);
  });

  it("renders helper text when no error is present", () => {
    render(
      <Input
        label="Email"
        id="student-email"
        helperText="Use your university student email"
      />
    );
    const helper = screen.getByText("Use your university student email");
    expect(helper).toBeDefined();
    const input = screen.getByLabelText("Email");
    expect(input.getAttribute("aria-describedby")).toContain(helper.id);
  });
});
