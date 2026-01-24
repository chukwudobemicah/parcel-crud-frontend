import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ParcelList } from "../ParcelList";
import { Parcel } from "../../types/parcel";

describe("ParcelList", () => {
  const mockParcels: Parcel[] = [
    {
      id: "1",
      name: "Apple",
      description: "Fresh Fruit",
      quantity: 10,
      weight: 1,
    },
    {
      id: "2",
      name: "Banana",
      description: "Yellow Fruit",
      quantity: 20,
      weight: 2,
    },
  ];
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  it("renders list of parcels", () => {
    render(
      <ParcelList
        parcels={mockParcels}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });

  it("filters parcels by search term", () => {
    render(
      <ParcelList
        parcels={mockParcels}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    const searchInput = screen.getByPlaceholderText(/Search parcels/i);
    fireEvent.change(searchInput, { target: { value: "Apple" } });

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.queryByText("Banana")).not.toBeInTheDocument();
  });

  it("shows no results message when search matches nothing", () => {
    render(
      <ParcelList
        parcels={mockParcels}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    const searchInput = screen.getByPlaceholderText(/Search parcels/i);
    fireEvent.change(searchInput, { target: { value: "Orange" } });

    expect(screen.getByText("No Results Found")).toBeInTheDocument();
  });

  it("shows empty state when no parcels provided", () => {
    render(
      <ParcelList parcels={[]} onEdit={mockOnEdit} onDelete={mockOnDelete} />,
    );

    expect(screen.getByText("No Parcels Yet")).toBeInTheDocument();
  });
});
