import {
  calculateCyclomaticComplexity,
  analyzeComplexity,
} from '../../../src/analyzers/complexity';

describe('Complexity Analyzer', () => {
  describe('calculateCyclomaticComplexity', () => {
    it('should return 1 for a simple function with no branches', () => {
      const code = `
        function add(a, b) {
          return a + b;
        }
      `;
      expect(calculateCyclomaticComplexity(code)).toBe(1);
    });

    it('should return higher complexity for if/else statements', () => {
      const code = `
        function check(x) {
          if (x > 0) {
            return 'positive';
          } else {
            return 'non-positive';
          }
        }
      `;
      const complexity = calculateCyclomaticComplexity(code);
      expect(complexity).toBeGreaterThan(1);
    });

    it('should increase complexity for nested loops', () => {
      const code = `
        function matrix(arr) {
          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
              if (arr[i][j] > 0) {
                console.log(arr[i][j]);
              }
            }
          }
        }
      `;
      const complexity = calculateCyclomaticComplexity(code);
      expect(complexity).toBeGreaterThan(3);
    });

    it('should count logical operators', () => {
      const code = `
        function validate(x, y, z) {
          if (x && y || z) {
            return true;
          }
          return false;
        }
      `;
      const complexity = calculateCyclomaticComplexity(code);
      expect(complexity).toBeGreaterThan(2);
    });

    it('should count switch/case statements', () => {
      const code = `
        function getDay(num) {
          switch(num) {
            case 1: return 'Mon';
            case 2: return 'Tue';
            case 3: return 'Wed';
          }
        }
      `;
      const complexity = calculateCyclomaticComplexity(code);
      expect(complexity).toBeGreaterThan(3);
    });
  });

  describe('analyzeComplexity', () => {
    it('should flag complexity exceeding threshold', () => {
      const code = `
        function complex(x) {
          if (x > 0) {
            for (let i = 0; i < x; i++) {
              while (i > 0) {
                if (i && x) {
                  return i;
                }
              }
            }
          }
        }
      `;
      const result = analyzeComplexity(code, 3);
      expect(result.exceeds).toBe(true);
      expect(result.threshold).toBe(3);
    });

    it('should not flag simple code below threshold', () => {
      const code = `
        function simple(a, b) {
          return a + b;
        }
      `;
      const result = analyzeComplexity(code, 10);
      expect(result.exceeds).toBe(false);
      expect(result.complexity).toBe(1);
    });
  });
});
