import React from 'react';
import { Condition } from './types';
import { fields, operators, valuesByField } from './constants';

interface Props {
  condition: Condition;
  onChange: (updated: Condition) => void;
  onRemove: () => void;
}

export default function ConditionRow({ condition, onChange, onRemove }: Props) {
  return (
    <div
      style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}
      data-testid="condition-row"
    >
      <select
        data-testid="field-select"
        value={condition.field}
        onChange={(e) =>
          onChange({
            ...condition,
            field: e.target.value as Condition['field'],
            value: valuesByField[e.target.value as Condition['field']][0],
          })
        }
      >
        {fields.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>

      <select
        data-testid="operator-select"
        value={condition.operator}
        onChange={(e) =>
          onChange({ ...condition, operator: e.target.value as Condition['operator'] })
        }
      >
        {operators.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>

      <select
        data-testid="value-select"
        value={condition.value}
        onChange={(e) => onChange({ ...condition, value: e.target.value })}
      >
        {valuesByField[condition.field].map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </select>

      <button data-testid="remove-condition" onClick={onRemove}>
        ❌
      </button>
    </div>
  );
}
