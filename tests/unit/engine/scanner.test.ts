import { scanCode, ScanConfig } from '../../../src/engine/scanner';
import { Rule } from '../../../src/rules/types';

describe('Engine Scanner', () => {
  const testRules: Rule[] = [
    {
      id: 'no-console',
      name: 'No Console',
      severity: 'error',
      pattern: 'console\\.log',
      message: 'No console.log allowed',
      category: 'style',
    },
  ];

  const defaultConfig: ScanConfig = {
    maxComplexity: 10,
    enableSecurity: true,
  };

  describe('scanCode', () => {
    it('should return combined results from all analyzers', () => {
      const code = `
        function test() {
          const password = "secret123"
          console.log(password);
          if (true) {
            return 1;
          }
        }
      `;
      const result = scanCode(code, 'test.ts', testRules, defaultConfig);

      expect(result.file).toBe('test.ts');
      expect(result.violations).toBeDefined();
      expect(result.complexity).toBeDefined();
      expect(result.securityFindings).toBeDefined();
    });

    it('should return passed=true for clean code', () => {
      const code = `
        function add(a: number, b: number): number {
          return a + b;
        }
      `;
      const result = scanCode(code, 'clean.ts', testRules, defaultConfig);

      expect(result.passed).toBe(true);
      expect(result.violations).toHaveLength(0);
      expect(result.securityFindings).toHaveLength(0);
    });

    it('should return passed=false for code with error violations', () => {
      const code = `console.log("bad code");`;
      const result = scanCode(code, 'bad.ts', testRules, defaultConfig);

      expect(result.passed).toBe(false);
      expect(result.violations.length).toBeGreaterThan(0);
    });

    it('should return passed=false when complexity exceeds threshold', () => {
      const code = `
        function complex(x) {
          if (x > 0) {
            for (let i = 0; i < x; i++) {
              while (i > 0) {
                if (i && x || true) {
                  switch(i) {
                    case 1: break;
                    case 2: break;
                    case 3: break;
                  }
                }
              }
            }
          } else {
            return null;
          }
        }
      `;
      const lowThresholdConfig: ScanConfig = { maxComplexity: 2, enableSecurity: true };
      const result = scanCode(code, 'complex.ts', [], lowThresholdConfig);

      expect(result.passed).toBe(false);
      expect(result.complexity.exceeds).toBe(true);
    });

    it('should skip security analysis when disabled', () => {
      const code = `const password = "secret123"`;
      const noSecurityConfig: ScanConfig = { maxComplexity: 10, enableSecurity: false };
      const result = scanCode(code, 'test.ts', [], noSecurityConfig);

      expect(result.securityFindings).toHaveLength(0);
    });
  });
});
