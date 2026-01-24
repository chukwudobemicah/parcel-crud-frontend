import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
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
    (useToastStore as unknown as Mock).mockReturnValue({
      addToast: mockAddToast,
    });
  });

  const setup = () => {
    const utils = render(
      <ParcelForm
        mode="create"
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />,
    );
    return {
      ...utils,
      nameInput: screen.getByLabelText(/Parcel Name/i),
      descInput: screen.getByLabelText(/Description/i),
      qtyInput: screen.getByLabelText(/Quantity/i),
      weightInput: screen.getByLabelText(/Weight/i),
      submitButton: screen.getByRole("button", { name: /Create Parcel/i }),
    };
  };

  it("renders create form correctly", () => {
    const { nameInput, descInput, qtyInput, weightInput } = setup();

    expect(screen.getByText("Create New Parcel")).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(descInput).toBeInTheDocument();
    expect(qtyInput).toBeInTheDocument();
    expect(weightInput).toBeInTheDocument();
  });

  it("validates form inputs", () => {
    const { submitButton } = setup();
    fireEvent.click(submitButton);

    expect(mockAddToast).toHaveBeenCalledWith(
      "Please fill in all required fields correctly",
      "error",
    );
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("submits form with valid data", () => {
    const { nameInput, descInput, qtyInput, weightInput, submitButton } =
      setup();

    fireEvent.change(nameInput, { target: { value: "New Parcel" } });
    fireEvent.change(descInput, { target: { value: "Description" } });
    fireEvent.change(qtyInput, { target: { value: "5" } });
    fireEvent.change(weightInput, { target: { value: "2.5" } });

    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: "New Parcel",
      description: "Description",
      quantity: 5,
      weight: 2.5,
    });
  });
});
