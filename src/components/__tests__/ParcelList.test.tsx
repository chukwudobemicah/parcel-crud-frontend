import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
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

  const setup = (parcels: Parcel[] = mockParcels) => {
    const utils = render(
      <ParcelList
        parcels={parcels}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );
    const searchInput = screen.queryByPlaceholderText(/Search parcels/i);
    return {
      ...utils,
      searchInput,
    };
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders list of parcels", () => {
    setup();
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });

  it("filters parcels by search term", () => {
    const { searchInput } = setup();
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput!, { target: { value: "Apple" } });

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.queryByText("Banana")).not.toBeInTheDocument();
  });

  it("shows no results message when search matches nothing", () => {
    const { searchInput } = setup();
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput!, { target: { value: "Orange" } });

    expect(screen.getByText("No Results Found")).toBeInTheDocument();
  });

  it("shows empty state when no parcels provided", () => {
    setup([]);
    expect(screen.getByText("No Parcels Yet")).toBeInTheDocument();
  });
});
