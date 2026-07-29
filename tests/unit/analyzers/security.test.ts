import { detectSecurityPatterns } from '../../../src/analyzers/security';

describe('Security Analyzer', () => {
  describe('detectSecurityPatterns', () => {
    it('should detect hardcoded passwords', () => {
      const code = `
        const config = {
          password = "super_secret_123"
        };
      `;
      const findings = detectSecurityPatterns(code);
      expect(findings.length).toBeGreaterThan(0);
      expect(findings[0].pattern).toBe('hardcoded-secret');
      expect(findings[0].severity).toBe('error');
    });

    it('should detect eval usage', () => {
      const code = `
        const userInput = getInput();
        const result = eval(userInput);
      `;
      const findings = detectSecurityPatterns(code);
      expect(findings.length).toBeGreaterThan(0);
      expect(findings.some((f) => f.pattern === 'eval-usage')).toBe(true);
    });

    it('should detect SQL injection patterns', () => {
      const code = `
        const id = req.params.id;
        db.query("SELECT * FROM users WHERE id=" + id);
      `;
      const findings = detectSecurityPatterns(code);
      expect(findings.length).toBeGreaterThan(0);
      expect(findings.some((f) => f.pattern === 'sql-injection')).toBe(true);
    });

    it('should return no findings for clean code', () => {
      const code = `
        import { getConfig } from './config';
        
        export function processData(input: string): string {
          return input.trim().toLowerCase();
        }
      `;
      const findings = detectSecurityPatterns(code);
      expect(findings).toHaveLength(0);
    });

    it('should detect innerHTML assignment', () => {
      const code = `
        const el = document.getElementById('app');
        el.innerHTML = userContent;
      `;
      const findings = detectSecurityPatterns(code);
      expect(findings.length).toBeGreaterThan(0);
      expect(findings.some((f) => f.pattern === 'innerhtml-assignment')).toBe(true);
    });

    it('should return correct line numbers', () => {
      const code = `line1\nline2\nconst result = eval(input);\nline4`;
      const findings = detectSecurityPatterns(code);
      expect(findings[0].line).toBe(3);
    });
  });
});
