import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "../src/components/ui/Modal/Modal";

describe("Modal Component", () => {
  beforeEach(() => {
    document.body.style.overflow = "";
  });

  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("does not render when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("renders with title, description, and children when isOpen is true", () => {
    render(
      <Modal
        isOpen={true}
        onClose={vi.fn()}
        title="Form Team"
        description="Select candidate members"
      >
        <p>Candidate list here</p>
      </Modal>
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeDefined();
    expect(screen.getByText("Form Team")).toBeDefined();
    expect(screen.getByText("Select candidate members")).toBeDefined();
    expect(screen.getByText("Candidate list here")).toBeDefined();
  });

  it("calls onClose when close button is clicked", () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Dialog">
        <p>Body</p>
      </Modal>
    );

    fireEvent.click(screen.getByTestId("modal-close-button"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when ESC key is pressed", () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Dialog">
        <p>Body</p>
      </Modal>
    );

    fireEvent.keyDown(window, { key: "Escape" });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when clicking the backdrop", () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Dialog">
        <p>Body</p>
      </Modal>
    );

    fireEvent.click(screen.getByTestId("modal-backdrop"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("locks body overflow when opened and restores it when closed", () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={vi.fn()} title="Dialog">
        <p>Body</p>
      </Modal>
    );

    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <Modal isOpen={false} onClose={vi.fn()} title="Dialog">
        <p>Body</p>
      </Modal>
    );

    expect(document.body.style.overflow).toBe("");
  });
});
