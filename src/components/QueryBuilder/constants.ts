// src/components/QueryBuilder/constants.ts

import { Field, Operator } from './types';

export const fields: Field[] = ['Status', 'Priority', 'Assigned To', 'Category'];

export const operators: Operator[] = ['equals', 'not equals', 'contains', 'does not contain'];

export const valuesByField: Record<Field, string[]> = {
  Status: ['Open', 'Closed', 'In Progress'],
  Priority: ['Low', 'Medium', 'High'],
  'Assigned To': ['Alice', 'Bob', 'Charlie'],
  Category: ['Bug', 'Feature', 'Task'],
};
