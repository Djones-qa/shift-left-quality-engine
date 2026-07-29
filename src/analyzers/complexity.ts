export interface ComplexityResult {
  complexity: number;
  exceeds: boolean;
  threshold: number;
}

export function calculateCyclomaticComplexity(code: string): number {
  let complexity = 1;

  const patterns = [
    /\bif\b/g,
    /\belse\b/g,
    /\bfor\b/g,
    /\bwhile\b/g,
    /\bswitch\b/g,
    /\bcase\b/g,
    /&&/g,
    /\|\|/g,
    /\?/g,
  ];

  for (const pattern of patterns) {
    const matches = code.match(pattern);
    if (matches) {
      complexity += matches.length;
    }
  }

  return complexity;
}

export function analyzeComplexity(code: string, maxComplexity: number): ComplexityResult {
  const complexity = calculateCyclomaticComplexity(code);

  return {
    complexity,
    exceeds: complexity > maxComplexity,
    threshold: maxComplexity,
  };
}
