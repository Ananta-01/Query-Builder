// src/components/QueryBuilder/types.ts

export type Field = 'Status' | 'Priority' | 'Assigned To' | 'Category';

export type Operator = 'equals' | 'not equals' | 'contains' | 'does not contain';

export interface Condition {
  type: 'condition';
  field: Field;
  operator: Operator;
  value: string;
}

export interface QueryGroup {
  type: 'group';
  logic: 'AND' | 'OR';
  children: QueryNode[];
}

export type QueryNode = Condition | QueryGroup;
