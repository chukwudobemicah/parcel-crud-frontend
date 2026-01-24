import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
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

  const setup = () => {
    const utils = render(
      <ParcelCard
        parcel={mockParcel}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        index={0}
      />,
    );
    return {
      ...utils,
      editButton: screen.getByRole("button", { name: /edit/i }),
      deleteButton: screen.getByRole("button", { name: /delete/i }),
    };
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders parcel details correctly", () => {
    setup();
    expect(screen.getByText("Test Parcel")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", () => {
    const { editButton } = setup();
    fireEvent.click(editButton);
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it("calls onDelete when delete button is clicked", () => {
    const { deleteButton } = setup();
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
