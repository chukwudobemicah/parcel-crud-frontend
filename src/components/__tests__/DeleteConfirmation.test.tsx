import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DeleteConfirmation } from "../DeleteConfirmation";
import { Parcel } from "../../types/parcel";

describe("DeleteConfirmation", () => {
  const mockParcel: Parcel = {
    id: "1",
    name: "Test Parcel",
    description: "Test Description",
    quantity: 10,
    weight: 5,
  };

  const mockOnConfirm = vi.fn();
  const mockOnCancel = vi.fn();

  it("renders confirmation details correctly", () => {
    render(
      <DeleteConfirmation
        parcel={mockParcel}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />,
    );

    expect(screen.getByText("Delete Parcel?")).toBeInTheDocument();
    expect(screen.getByText("Test Parcel")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("calls onConfirm when delete button is clicked", () => {
    render(
      <DeleteConfirmation
        parcel={mockParcel}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />,
    );

    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    fireEvent.click(deleteButton);
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when cancel button is clicked", () => {
    render(
      <DeleteConfirmation
        parcel={mockParcel}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />,
    );

    const cancelButton = screen.getByRole("button", { name: /Cancel/i });
    fireEvent.click(cancelButton);
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});
