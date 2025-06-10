import { render, screen, fireEvent } from "@testing-library/react";
import LogicSelector from "../LogicSelector";
import { describe, it, expect, vi } from "vitest";

describe("LogicSelector Component", () => {
  it("renders with the correct default value", () => {
    render(<LogicSelector logic="AND" onChange={() => {}} />);

    const select = screen.getByTestId("logic-dropdown") as HTMLSelectElement;
    expect(select.value).toBe("AND");
  });

  it("renders both AND and OR options", () => {
    render(<LogicSelector logic="AND" onChange={() => {}} />);

    expect(screen.getByTestId("logic-option-and")).toBeInTheDocument();
    expect(screen.getByTestId("logic-option-or")).toBeInTheDocument();
  });

  it('calls onChange with "OR" when OR is selected', () => {
    const mockOnChange = vi.fn();
    render(<LogicSelector logic="AND" onChange={mockOnChange} />);

    const select = screen.getByTestId("logic-dropdown");
    fireEvent.change(select, { target: { value: "OR" } });

    expect(mockOnChange).toHaveBeenCalledWith("OR");
  });

  it('calls onChange with "AND" when AND is selected', () => {
    const mockOnChange = vi.fn();
    render(<LogicSelector logic="OR" onChange={mockOnChange} />);

    const select = screen.getByTestId("logic-dropdown");
    fireEvent.change(select, { target: { value: "AND" } });

    expect(mockOnChange).toHaveBeenCalledWith("AND");
  });
});
