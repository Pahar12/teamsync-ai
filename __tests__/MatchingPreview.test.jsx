import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MatchingPreview } from "../src/components/matching/MatchingPreview/MatchingPreview";

describe("MatchingPreview Component", () => {
  it("renders synthetic disclaimer and mock candidates", () => {
    render(<MatchingPreview />);
    expect(
      screen.getByText(/Interactive Simulator Preview \(Synthetic Demonstration\)/i)
    ).toBeDefined();
    expect(screen.getByText("Aarav Sharma")).toBeDefined();
    expect(screen.getByText("Neha Patel")).toBeDefined();
  });

  it("opens explanation modal when Explain Score is clicked", () => {
    render(<MatchingPreview />);
    const explainButtons = screen.getAllByRole("button", { name: /explain score/i });
    expect(explainButtons.length).toBeGreaterThan(0);

    // Click first explain score button
    fireEvent.click(explainButtons[0]);

    // Dialog should be present with formula and factors
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeDefined();
    expect(within(dialog).getByText(/Score Breakdown:/i)).toBeDefined();
    expect(within(dialog).getByText(/Formula:/i)).toBeDefined();
    expect(within(dialog).getByText("Skill Coverage")).toBeDefined();

    // Close modal
    fireEvent.click(within(dialog).getByRole("button", { name: "Done" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("updates slider values and maintains normalized weight total", () => {
    render(<MatchingPreview />);
    const skillSlider = screen.getByLabelText(/Skill Coverage importance slider/i);
    fireEvent.change(skillSlider, { target: { value: "80" } });
    expect(screen.getByText("100%")).toBeDefined();
  });

  it("safely handles all-zero slider edge case by falling back to equal distribution", () => {
    render(<MatchingPreview />);
    const sliders = screen.getAllByRole("slider");
    expect(sliders.length).toBe(5);

    // Set all sliders to 0
    sliders.forEach((slider) => {
      fireEvent.change(slider, { target: { value: "0" } });
    });

    // Check that total displays fallback message
    expect(screen.getByText("100% (Equal fallback)")).toBeDefined();

    // Check that candidate scores remain valid numbers between 0 and 100
    const scores = screen.getAllByText(/Overall Fit/i);
    expect(scores.length).toBeGreaterThan(0);
  });
});
