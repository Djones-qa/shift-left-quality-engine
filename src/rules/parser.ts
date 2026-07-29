import yaml from 'js-yaml';
import { z } from 'zod';
import { Rule } from './types';

const RuleSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  severity: z.enum(['error', 'warning', 'info']),
  pattern: z.string().min(1),
  message: z.string().min(1),
  category: z.enum(['security', 'complexity', 'style', 'anti-pattern']),
});

const RulesFileSchema = z.object({
  rules: z.array(RuleSchema),
});

export function parseRulesFromYaml(content: string): Rule[] {
  const parsed = yaml.load(content);
  const validated = RulesFileSchema.parse(parsed);
  return validated.rules;
}

export function validateRule(rule: unknown): Rule {
  return RuleSchema.parse(rule) as Rule;
}
