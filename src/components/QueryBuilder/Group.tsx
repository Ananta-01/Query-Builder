import React from 'react';
import { Condition, QueryGroup, QueryNode } from './types';
import ConditionRow from './ConditionRow';
import { valuesByField } from './constants';

interface Props {
  group: QueryGroup;
  onChange: (group: QueryGroup) => void;
  onRemove?: () => void;
}

export default function Group({ group, onChange, onRemove }: Props) {
  const updateChild = (index: number, updated: QueryNode) => {
    const children = [...group.children];
    children[index] = updated;
    onChange({ ...group, children });
  };

  const removeChild = (index: number) => {
    const children = group.children.filter((_, i) => i !== index);
    onChange({ ...group, children });
  };

  const addCondition = () => {
    const newCondition: Condition = {
      type: 'condition',
      field: 'Status',
      operator: 'equals',
      value: valuesByField['Status'][0],
    };
    onChange({ ...group, children: [...group.children, newCondition] });
  };

  const addGroup = () => {
    const newGroup: QueryGroup = {
      type: 'group',
      logic: 'AND',
      children: [],
    };
    onChange({ ...group, children: [...group.children, newGroup] });
  };

  return (
    <div
      data-testid="query-group"
      style={{ border: '1px solid #ccc', padding: '12px', marginTop: '12px' }}
    >
      <div style={{ marginBottom: '8px' }}>
        <label htmlFor="group-logic-select">Logic: </label>
        <select
          id="group-logic-select"
          data-testid="group-logic-select"
          value={group.logic}
          onChange={(e) => onChange({ ...group, logic: e.target.value as 'AND' | 'OR' })}
        >
          <option value="AND" data-testid="group-logic-option-and">AND</option>
          <option value="OR" data-testid="group-logic-option-or">OR</option>
        </select>
        {onRemove && (
          <button
            data-testid="remove-group-button"
            onClick={onRemove}
            style={{ marginLeft: '8px' }}
          >
            🗑️ Remove Group
          </button>
        )}
      </div>

      {group.children.map((child, idx) =>
        child.type === 'condition' ? (
          <ConditionRow
            key={idx}
            condition={child}
            onChange={(updated) => updateChild(idx, updated)}
            onRemove={() => removeChild(idx)}
          />
        ) : (
          <Group
            key={idx}
            group={child}
            onChange={(updated) => updateChild(idx, updated)}
            onRemove={() => removeChild(idx)}
          />
        )
      )}

      <div
        data-testid="group-action-buttons"
        style={{ display: 'flex', gap: '8px', marginTop: '10px' }}
      >
        <button data-testid="add-condition-button" onClick={addCondition}>
          ➕ Add Condition
        </button>
        <button data-testid="add-group-button" onClick={addGroup}>
          📂 Add Group
        </button>
      </div>
    </div>
  );
}
