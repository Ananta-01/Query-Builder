import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Group from '../Group';
import { QueryGroup } from '../types';

describe('Group Component', () => {
  const baseGroup: QueryGroup = {
    type: 'group',
    logic: 'AND',
    children: [],
  };

  it('renders the group logic dropdown', () => {
    render(<Group group={baseGroup} onChange={vi.fn()} />);
    expect(screen.getByTestId('group-logic-select')).toBeInTheDocument();
    expect(screen.getByTestId('group-logic-option-and')).toBeInTheDocument();
    expect(screen.getByTestId('group-logic-option-or')).toBeInTheDocument();
  });

  it('calls onChange when logic is changed', () => {
    const handleChange = vi.fn();
    render(<Group group={baseGroup} onChange={handleChange} />);
    fireEvent.change(screen.getByTestId('group-logic-select'), {
      target: { value: 'OR' },
    });
    expect(handleChange).toHaveBeenCalledWith({ ...baseGroup, logic: 'OR' });
  });

  it('adds a condition on clicking ➕ Add Condition', () => {
    const handleChange = vi.fn();
    render(<Group group={baseGroup} onChange={handleChange} />);
    fireEvent.click(screen.getByTestId('add-condition-button'));
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        children: [
          expect.objectContaining({
            type: 'condition',
            field: 'Status',
            operator: 'equals',
            value: expect.any(String),
          }),
        ],
      })
    );
  });

  it('adds a group on clicking 📂 Add Group', () => {
    const handleChange = vi.fn();
    render(<Group group={baseGroup} onChange={handleChange} />);
    fireEvent.click(screen.getByTestId('add-group-button'));
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        children: [
          expect.objectContaining({
            type: 'group',
            logic: 'AND',
            children: [],
          }),
        ],
      })
    );
  });

  it('renders remove group button if onRemove is provided', () => {
    const mockRemove = vi.fn();
    render(<Group group={baseGroup} onChange={vi.fn()} onRemove={mockRemove} />);
    const removeBtn = screen.getByTestId('remove-group-button');
    expect(removeBtn).toBeInTheDocument();

    fireEvent.click(removeBtn);
    expect(mockRemove).toHaveBeenCalled();
  });

  it('renders children condition components', () => {
    const groupWithCondition: QueryGroup = {
      type: 'group',
      logic: 'AND',
      children: [
        {
          type: 'condition',
          field: 'Status',
          operator: 'equals',
          value: 'Open',
        },
      ],
    };
    render(<Group group={groupWithCondition} onChange={vi.fn()} />);
    expect(screen.getByTestId('field-select')).toBeInTheDocument();
    expect(screen.getByTestId('operator-select')).toBeInTheDocument();
    expect(screen.getByTestId('value-select')).toBeInTheDocument();
  });
});
