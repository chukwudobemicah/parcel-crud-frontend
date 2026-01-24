import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ParcelCard } from "../ParcelCard";
import { Parcel } from "../../types/parcel";

describe("ParcelCard", () => {
  const mockParcel: Parcel = {
    id: "1",
    name: "Test Parcel",
    description: "Test Description",
    quantity: 10,
    weight: 5,
  };

  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  it("renders parcel details correctly", () => {
    render(
      <ParcelCard
        parcel={mockParcel}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        index={0}
      />,
    );

    expect(screen.getByText("Test Parcel")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    // Check for quantity (10) explicitly within its context if needed, but getByText works
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", () => {
    render(
      <ParcelCard
        parcel={mockParcel}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        index={0}
      />,
    );

    const editButton = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(editButton);
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <ParcelCard
        parcel={mockParcel}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        index={0}
      />,
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
