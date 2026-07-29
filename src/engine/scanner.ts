import { Rule, Violation, evaluateRules } from '../rules';
import { analyzeComplexity, ComplexityResult } from '../analyzers/complexity';
import { detectSecurityPatterns, SecurityFinding } from '../analyzers/security';

export interface ScanConfig {
  maxComplexity: number;
  enableSecurity: boolean;
}

export interface ScanResult {
  file: string;
  violations: Violation[];
  complexity: ComplexityResult;
  securityFindings: SecurityFinding[];
  passed: boolean;
}

export function scanCode(
  code: string,
  filename: string,
  rules: Rule[],
  config: ScanConfig,
): ScanResult {
  const violations = evaluateRules(code, rules);
  const complexity = analyzeComplexity(code, config.maxComplexity);
  const securityFindings = config.enableSecurity ? detectSecurityPatterns(code) : [];

  const hasErrors = violations.some((v) => v.severity === 'error');
  const hasSecurityErrors = securityFindings.some((f) => f.severity === 'error');
  const passed = !hasErrors && !complexity.exceeds && !hasSecurityErrors;

  return {
    file: filename,
    violations,
    complexity,
    securityFindings,
    passed,
  };
}
