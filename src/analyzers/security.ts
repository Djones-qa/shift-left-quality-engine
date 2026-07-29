export interface SecurityFinding {
  pattern: string;
  line: number;
  severity: 'error' | 'warning' | 'info';
  description: string;
}

interface SecurityPattern {
  name: string;
  regex: RegExp;
  severity: 'error' | 'warning' | 'info';
  description: string;
}

const SECURITY_PATTERNS: SecurityPattern[] = [
  {
    name: 'hardcoded-secret',
    regex: /(?:password|api_key|secret)\s*=\s*['"][^'"]+['"]/gi,
    severity: 'error',
    description: 'Hardcoded secret detected. Use environment variables instead.',
  },
  {
    name: 'sql-injection',
    regex: /(?:query|execute)\s*\(\s*['"`].*\+/gi,
    severity: 'error',
    description: 'Potential SQL injection via string concatenation. Use parameterized queries.',
  },
  {
    name: 'eval-usage',
    regex: /\beval\s*\(/g,
    severity: 'error',
    description: 'Usage of eval() detected. Avoid eval as it can execute arbitrary code.',
  },
  {
    name: 'innerhtml-assignment',
    regex: /\.innerHTML\s*=/g,
    severity: 'warning',
    description: 'Direct innerHTML assignment detected. Use safe DOM manipulation methods.',
  },
];

export function detectSecurityPatterns(code: string): SecurityFinding[] {
  const findings: SecurityFinding[] = [];
  const lines = code.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    for (const pattern of SECURITY_PATTERNS) {
      const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
      if (regex.test(line)) {
        findings.push({
          pattern: pattern.name,
          line: i + 1,
          severity: pattern.severity,
          description: pattern.description,
        });
      }
    }
  }

  return findings;
}
