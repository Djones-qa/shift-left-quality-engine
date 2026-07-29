import { Rule, Violation } from './types';

export function evaluateRules(code: string, rules: Rule[]): Violation[] {
  const violations: Violation[] = [];
  const lines = code.split('\n');

  for (const rule of rules) {
    const regex = new RegExp(rule.pattern, 'g');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let match: RegExpExecArray | null;

      while ((match = regex.exec(line)) !== null) {
        violations.push({
          ruleId: rule.id,
          line: i + 1,
          column: match.index + 1,
          message: rule.message,
          severity: rule.severity,
          category: rule.category,
        });
      }
    }
  }

  return violations;
}
