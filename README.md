# Shift-Left Quality Engine

[![CI Pipeline](https://github.com/Djones-qa/shift-left-quality-engine/actions/workflows/ci.yml/badge.svg)](https://github.com/Djones-qa/shift-left-quality-engine/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-green.svg)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://www.docker.com/)
[![Jest](https://img.shields.io/badge/Jest-29-red.svg)](https://jestjs.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Shift-left quality engine - custom rule evaluation, cyclomatic complexity analysis, security pattern detection, pre-commit integration. Catches bugs before tests even run.

## Features

- **Custom Rule Engine** - YAML-defined regex rules validated by Zod, with severity levels and categories
- **Cyclomatic Complexity Analysis** - Calculate and enforce complexity thresholds per function
- **Security Pattern Detection** - Hardcoded secrets, SQL injection, eval() usage, innerHTML XSS
- **Pre-Commit Integration** - Block commits that violate quality rules
- **Configurable Thresholds** - Set complexity limits, enable/disable security scanning
- **Category Classification** - Rules grouped by security, complexity, style, anti-pattern
- **REST API** - Health check and scan endpoints for CI/CD integration
- **Docker Ready** - Multi-stage production build

## Architecture

```
+-----------------------------------------------------------+
|                Shift-Left Quality Engine                   |
|                                                           |
|  +-----------+   +--------------+   +----------------+   |
|  |   Rules   |   |  Analyzers   |   |    Engine      |   |
|  |  Engine   |   |              |   |                |   |
|  +-----------+   +--------------+   +----------------+   |
|  | - Parser  |   | - Complexity |   | - Scanner      |   |
|  | - Eval    |   | - Security   |   | - Orchestrator |   |
|  | - Types   |   |              |   | - Results      |   |
|  +-----------+   +--------------+   +----------------+   |
|                                                           |
|  +-----------------------------------------------------+ |
|  |              Express REST API (port 3006)            | |
|  +-----------------------------------------------------+ |
+-----------------------------------------------------------+
```

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- Docker (optional)

### Installation

```bash
git clone https://github.com/Djones-qa/shift-left-quality-engine.git
cd shift-left-quality-engine
npm install
cp .env.example .env
npm run dev
```

### Running Tests

```bash
npm test              # All tests
npm run test:unit     # Unit tests only
npm run test:coverage # With coverage
npm run lint          # ESLint
```

## Rule Definition (YAML)

```yaml
rules:
  - id: no-console-log
    name: No Console Log
    severity: warning
    pattern: "console\\.log"
    message: "Avoid console.log in production code"
    category: style

  - id: no-var-keyword
    name: No Var Keyword
    severity: error
    pattern: "\\bvar\\b"
    message: "Use const or let instead of var"
    category: anti-pattern

  - id: no-hardcoded-secret
    name: No Hardcoded Secrets
    severity: error
    pattern: "(password|api_key|secret)\\s*=\\s*['\"][^'\"]+['\"]"
    message: "Do not hardcode secrets in source code"
    category: security
```

## Security Patterns Detected

| Pattern | Severity | Description |
|---------|----------|-------------|
| Hardcoded Secrets | error | Detects password=, api_key=, secret= with values |
| SQL Injection | error | String concatenation in query/execute calls |
| eval() Usage | error | Direct use of eval() function |
| innerHTML | warning | Direct innerHTML assignment (XSS risk) |

## Complexity Thresholds

Cyclomatic complexity is calculated by counting:

| Construct | Adds |
|-----------|------|
| if / else | +1 each |
| for / while | +1 each |
| switch / case | +1 each |
| && / II | +1 each |
| ? (ternary) | +1 |
| Base | +1 |

Default threshold: **10** (configurable via MAX_COMPLEXITY env var)

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 3006 | Server port |
| NODE_ENV | development | Environment |
| LOG_LEVEL | info | Winston log level |
| MAX_COMPLEXITY | 10 | Complexity threshold |
| ENABLE_SECURITY | true | Enable security scanning |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Service health check |

## CI/CD Pipeline

1. **Lint & Type Check** - ESLint + TypeScript compiler
2. **Unit Tests** - Jest with coverage
3. **Docker Build** - Multi-stage production image

## Author

**Darrius Jones**

- GitHub: [@Djones-qa](https://github.com/Djones-qa)
- LinkedIn: [darrius-jones-28226b350](https://www.linkedin.com/in/darrius-jones-28226b350)

## License

MIT - 2026 Darrius Jones

See [LICENSE](./LICENSE) for details.
