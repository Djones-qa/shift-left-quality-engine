import { evaluateRules } from '../../../src/rules/evaluator';
import { Rule } from '../../../src/rules/types';

describe('Rule Evaluator', () => {
  const testRule: Rule = {
    id: 'test-001',
    name: 'No Console Log',
    severity: 'warning',
    pattern: 'console\\.log',
    message: 'Avoid using console.log in production code',
    category: 'style',
  };

  describe('evaluateRules', () => {
    it('should detect pattern matches in code', () => {
      const code = 'const x = 1;\nconsole.log(x);\nconst y = 2;';
      const violations = evaluateRules(code, [testRule]);

      expect(violations).toHaveLength(1);
      expect(violations[0].ruleId).toBe('test-001');
      expect(violations[0].line).toBe(2);
      expect(violations[0].severity).toBe('warning');
    });

    it('should return correct line numbers for multiple violations', () => {
      const code = 'console.log("first");\nconst x = 1;\nconsole.log("second");';
      const violations = evaluateRules(code, [testRule]);

      expect(violations).toHaveLength(2);
      expect(violations[0].line).toBe(1);
      expect(violations[1].line).toBe(3);
    });

    it('should return no violations for clean code', () => {
      const code = 'const x = 1;\nconst y = x + 2;\nexport default y;';
      const violations = evaluateRules(code, [testRule]);

      expect(violations).toHaveLength(0);
    });

    it('should evaluate multiple rules against code', () => {
      const rules: Rule[] = [
        testRule,
        {
          id: 'test-002',
          name: 'No Var',
          severity: 'error',
          pattern: '\\bvar\\b',
          message: 'Use const or let instead of var',
          category: 'style',
        },
      ];

      const code = 'var x = 1;\nconsole.log(x);';
      const violations = evaluateRules(code, rules);

      expect(violations).toHaveLength(2);
      expect(violations.map((v) => v.ruleId)).toContain('test-001');
      expect(violations.map((v) => v.ruleId)).toContain('test-002');
    });

    it('should return correct column numbers', () => {
      const code = '  console.log("test");';
      const violations = evaluateRules(code, [testRule]);

      expect(violations).toHaveLength(1);
      expect(violations[0].column).toBe(3);
    });
  });
});
