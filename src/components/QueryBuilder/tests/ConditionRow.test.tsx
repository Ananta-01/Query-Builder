import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import ConditionRow from '../ConditionRow';
import { Condition } from '../types';
import { fields, operators, valuesByField } from '../constants';

describe('ConditionRow Component', () => {
  const mockCondition: Condition = {
    field: fields[0],
    operator: operators[0],
    value: valuesByField[fields[0]][0],
  };

  const onChange = vi.fn();
  const onRemove = vi.fn();

  beforeEach(() => {
    onChange.mockClear();
    onRemove.mockClear();
  });

  it('renders all dropdowns and button', () => {
    render(<ConditionRow condition={mockCondition} onChange={onChange} onRemove={onRemove} />);
    
    expect(screen.getByTestId('field-select')).toBeInTheDocument();
    expect(screen.getByTestId('operator-select')).toBeInTheDocument();
    expect(screen.getByTestId('value-select')).toBeInTheDocument();
    expect(screen.getByTestId('remove-condition')).toBeInTheDocument();
  });

  it('calls onChange when field is changed', () => {
    render(<ConditionRow condition={mockCondition} onChange={onChange} onRemove={onRemove} />);

    fireEvent.change(screen.getByTestId('field-select'), {
      target: { value: fields[1] },
    });

    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0].field).toBe(fields[1]);
  });

  it('calls onChange when operator is changed', () => {
    render(<ConditionRow condition={mockCondition} onChange={onChange} onRemove={onRemove} />);

    fireEvent.change(screen.getByTestId('operator-select'), {
      target: { value: operators[1] },
    });

    expect(onChange).toHaveBeenCalledWith({
      ...mockCondition,
      operator: operators[1],
    });
  });

  it('calls onChange when value is changed', () => {
    render(<ConditionRow condition={mockCondition} onChange={onChange} onRemove={onRemove} />);

    const newValue = valuesByField[mockCondition.field][1];

    fireEvent.change(screen.getByTestId('value-select'), {
      target: { value: newValue },
    });

    expect(onChange).toHaveBeenCalledWith({
      ...mockCondition,
      value: newValue,
    });
  });

  it('calls onRemove when remove button is clicked', () => {
    render(<ConditionRow condition={mockCondition} onChange={onChange} onRemove={onRemove} />);

    fireEvent.click(screen.getByTestId('remove-condition'));

    expect(onRemove).toHaveBeenCalled();
  });
});
