import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
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

  const setup = () => {
    const utils = render(
      <DeleteConfirmation
        parcel={mockParcel}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />,
    );
    return {
      ...utils,
      deleteButton: screen.getByRole("button", { name: /Delete/i }),
      cancelButton: screen.getByRole("button", { name: /Cancel/i }),
    };
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders confirmation details correctly", () => {
    setup();
    expect(screen.getByText("Delete Parcel?")).toBeInTheDocument();
    expect(screen.getByText("Test Parcel")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("calls onConfirm when delete button is clicked", () => {
    const { deleteButton } = setup();
    fireEvent.click(deleteButton);
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when cancel button is clicked", () => {
    const { cancelButton } = setup();
    fireEvent.click(cancelButton);
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});
