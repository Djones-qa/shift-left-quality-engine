export type Severity = 'error' | 'warning' | 'info';
export type Category = 'security' | 'complexity' | 'style' | 'anti-pattern';

export interface Rule {
  id: string;
  name: string;
  severity: Severity;
  pattern: string;
  message: string;
  category: Category;
}

export interface Violation {
  ruleId: string;
  line: number;
  column: number;
  message: string;
  severity: Severity;
  category: Category;
}
