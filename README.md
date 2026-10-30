# k6POC - k6 Load Testing Proof of Concept

A working Proof of Concept demonstrating [k6](https://k6.io/) load testing with practical examples.

k6 is a modern, developer-friendly load testing tool that uses JavaScript for test scripts.

## Prerequisites

- [k6](https://k6.io/docs/get-started/installation/) installed

```bash
# macOS
brew install k6

# Windows (using chocolatey)
choco install k6

# Linux
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

## Quick Start

```bash
# Run the basic smoke test
k6 run scripts/01-smoke-test.js

# Run a load test with stages
k6 run scripts/02-load-test.js

# Run with custom VUs and duration
k6 run --vus 10 --duration 30s scripts/01-smoke-test.js
```

## Examples Included

| Script | Description |
|--------|-------------|
| `scripts/01-smoke-test.js` | Basic smoke test - verifies the system works under minimal load |
| `scripts/02-load-test.js` | Load test with ramping stages (ramp-up, sustain, ramp-down) |
| `scripts/03-stress-test.js` | Stress test - pushes the system beyond normal capacity |
| `scripts/04-spike-test.js` | Spike test - sudden large increase in load |
| `scripts/05-with-thresholds.js` | Example with SLAs / thresholds and custom metrics |
| `scripts/06-api-crud.js` | Full API CRUD flow example (GET, POST, PUT, DELETE) |

## Project Structure

```
k6POC/
├── README.md
├── scripts/
│   ├── 01-smoke-test.js
│   ├── 02-load-test.js
│   ├── 03-stress-test.js
│   ├── 04-spike-test.js
│   ├── 05-with-thresholds.js
│   └── 06-api-crud.js
└── data/
    └── users.json          # Sample test data
```

## Running with Options

```bash
# Output results to JSON
k6 run --out json=results.json scripts/02-load-test.js

# Use environment variables
k6 run -e BASE_URL=https://httpbin.org scripts/01-smoke-test.js

# Cloud execution (requires k6 Cloud account)
k6 cloud scripts/02-load-test.js
```

## Key Concepts Demonstrated

- **Virtual Users (VUs)** – concurrent simulated users
- **Stages / Scenarios** – controlled ramp-up and ramp-down
- **Checks** – assertions on responses
- **Thresholds** – pass/fail criteria (SLAs)
- **Custom Metrics** – track business KPIs
- **Data parameterization** – using shared arrays / JSON files
- **HTTP methods** – GET, POST, PUT, DELETE

## Useful Links

- [k6 Documentation](https://k6.io/docs/)
- [k6 Examples](https://k6.io/docs/examples/)
- [k6 JavaScript API](https://k6.io/docs/javascript-api/)
