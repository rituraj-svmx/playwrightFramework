## playwrightFramework

Playwright end-to-end testing framework with Allure reporting, Page Object Model (POM), parallel runs, device emulation, and Excel-driven utilities. Includes examples for data-driven tests against Flipkart and an upload/download flow with Excel edits.

### Features
- **Playwright @latest**: parallel execution, traces, screenshots, videos
- **Allure reporting**: rich HTML reports with categories and environment info
- **Page Object Model**: `Login`, `Product`, and `POManager`
- **Data-driven tests**: JSON-fed scenarios for mobile product finder
- **Excel utilities**: read/replace cells using `exceljs`
- **Device emulation**: iPhone 15 Pro Max config
- **Type: module**: native ESM imports

### Project structure
```
PlaywrightAutomation/
  pageobjects/
    Login.js
    Product.js
    POManager.js
  tests/
    mobile_finder.spec.js
    upload_download.spec.js
  utils/
    ExcelOperations.js
    mobile_finder_test_data.json
  playwright.config.js
  package.json
```

### Prerequisites
- Node.js 18+
- Install Playwright browsers:
```bash
npx playwright install
```
- Allure Commandline (for `allure serve`/`allure generate`) — see the official docs:
[Allure Commandline installation](https://docs.qameta.io/allure/)

### Install
```bash
npm i
```

### Scripts
From `package.json`:
- `npm run Regression`: run tests for the `web` project
- `npm run web`: run tests tagged `@Web`

Examples:
```bash
# run whole web project suite
npm run Regression

# run tests tagged @Web
npm run web

# run by project explicitly
npx playwright test --project=web
npx playwright test --project=Mobile
```

### Allure reporting
By default, Allure results are written to `allure-results` as configured in `playwright.config.js`.

- **Serve latest run** (clean old results first on Windows/PowerShell):
```bash
powershell -NoProfile -Command "if (Test-Path 'allure-results') { Remove-Item -Recurse -Force 'allure-results' }"
npx playwright test
allure serve allure-results
```

- **Generate static report**:
```bash
allure generate allure-results --clean -o allure-report
allure open allure-report
```

Tip: Add a script to clean both results and report:
```bash
# add to package.json "scripts"
"clean:allure": "powershell -NoProfile -Command \"if (Test-Path 'allure-results') { Remove-Item -Recurse -Force 'allure-results' }; if (Test-Path 'allure-report') { Remove-Item -Recurse -Force 'allure-report' }\""
```

### Configuration highlights
`playwright.config.js`:
- **Projects**:
  - `web`: Chromium, headless, trace/screenshot enabled
  - `Mobile`: WebKit with `devices['iPhone 15 Pro Max']`
- **Reporter**:
  - `line`
  - `allure-playwright` with `resultsDir: "allure-results"`, categories and environment info
- **Execution**: `workers: 3`, `retries: 1`, `fullyParallel: true`

Run a specific spec:
```bash
npx playwright test tests/mobile_finder.spec.js --project=web
```

### Data-driven mobile product finder
- Test file: `tests/mobile_finder.spec.js`
- Data: `utils/mobile_finder_test_data.json`
- Page objects: `pageobjects/Login.js`, `pageobjects/Product.js`, accessed via `pageobjects/POManager.js`

What it does:
- Opens Flipkart, searches for each product from JSON, waits for results, validates title and first result visibility/content.

### Upload/Download + Excel edit example
- Test file: `tests/upload_download.spec.js`
- Utility: `utils/ExcelOperations.js` (uses `exceljs`)

Flow:
1. Download Excel from the page
2. Edit a target cell (e.g., price) in `Sheet1`
3. Upload the modified file and assert UI changes

Cross‑platform tip: avoid hard-coded absolute paths like `C:\Users\...`. Use Playwright’s `download.saveAs()` and a project-relative path (e.g., `test-results/downloads/download.xlsx`).

### Excel operations
- Utility: `utils/ExcelOperations.js`
- Methods:
  - `readExcel(worksheet, searchText)`: finds the row/column of a cell matching `searchText`
  - `writeExcel(searchText, replaceText, change, filePath)`: opens workbook, computes target cell offset using `change.columnchange`, writes value, saves

Optional improvement:
- Default `filePath` to the instance variable to avoid passing it twice.

### Git and housekeeping
Recommended `.gitignore`:
```
node_modules/
test-results/
playwright-report/
allure-results/
allure-report/
*.log
.env
```

### Troubleshooting
- **Allure shows old results**: clean `allure-results` before each run.
- **Push rejected / history differs**: fetch + rebase or force-with-lease.
```bash
git fetch origin
git pull --rebase --allow-unrelated-histories origin main
git push -u origin main
# or overwrite remote carefully
git push --force-with-lease
```

### License
MIT (adjust as needed).
```
