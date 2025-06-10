import React from "react";

interface Props {
  logic: "AND" | "OR";
  onChange: (value: "AND" | "OR") => void;
}

export default function LogicSelector({ logic, onChange }: Props) {
  return (
    <div style={{ marginBottom: "12px" }} data-testid="logic-selector">
      <label htmlFor="logic-select">Combine conditions using: </label>
      <select
        id="logic-select"
        data-testid="logic-dropdown"
        value={logic}
        onChange={(e) => onChange(e.target.value as "AND" | "OR")}
      >
        <option value="AND" data-testid="logic-option-and">
          AND
        </option>
        <option value="OR" data-testid="logic-option-or">
          OR
        </option>
      </select>
    </div>
  );
}
