import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ParcelForm } from "../ParcelForm";
import { useToastStore } from "../../store/toastStore";

// Mock the store
vi.mock("../../store/toastStore", () => ({
  useToastStore: vi.fn(),
}));

describe("ParcelForm", () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();
  const mockAddToast = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useToastStore as any).mockReturnValue({ addToast: mockAddToast });
  });

  it("renders create form correctly", () => {
    render(
      <ParcelForm
        mode="create"
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />,
    );

    expect(screen.getByText("Create New Parcel")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter parcel name"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter parcel description"),
    ).toBeInTheDocument();
    // Quantity placeholder is "0"
    expect(screen.getByPlaceholderText("0")).toBeInTheDocument();
    // Weight placeholder is "0.0"
    expect(screen.getByPlaceholderText("0.0")).toBeInTheDocument();
  });

  it("validates form inputs", () => {
    render(
      <ParcelForm
        mode="create"
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />,
    );

    const submitButton = screen.getByRole("button", { name: /Create Parcel/i });
    fireEvent.click(submitButton);

    // Check if toast was called
    expect(mockAddToast).toHaveBeenCalledWith(
      "Please fill in all required fields correctly",
      "error",
    );
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("submits form with valid data", () => {
    render(
      <ParcelForm
        mode="create"
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("Enter parcel name"), {
      target: { value: "New Parcel" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter parcel description"), {
      target: { value: "Description" },
    });
    fireEvent.change(screen.getByPlaceholderText("0"), {
      target: { value: "5" },
    });
    fireEvent.change(screen.getByPlaceholderText("0.0"), {
      target: { value: "2.5" },
    });

    const submitButton = screen.getByRole("button", { name: /Create Parcel/i });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: "New Parcel",
      description: "Description",
      quantity: 5,
      weight: 2.5,
    });
  });
});
