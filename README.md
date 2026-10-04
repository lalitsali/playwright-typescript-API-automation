# Playwright TypeScript API Automation

A **Playwright + TypeScript API automation framework** for testing REST APIs with static and dynamic test data, reusable API utilities, TypeScript type safety, authentication, CRUD operations, API mocking, response modification, and HAR-based API mocking.

The project is built using **Playwright Test** and is structured to support maintainable, reusable, and scalable API automation.

---

## 🚀 Project Overview

This project demonstrates API automation using Playwright's API testing capabilities.

The framework covers the complete API testing lifecycle:

```text
Test Data
    ↓
Request Preparation
    ↓
API Request
    ↓
Response
    ↓
Status Code Validation
    ↓
Response Structure Validation
    ↓
Response Data Validation
```

The project also demonstrates API mocking techniques:

```text
Application
    ↓
API Request
    ↓
Playwright Route
    ↓
Mock / Modify / Replay Response
    ↓
Application
```

---

# 🛠️ Technology Stack

| Technology | Version / Usage |
|---|---|
| Playwright | 1.63.0 |
| TypeScript | 5.9.3 |
| Node.js | Required runtime |
| Faker.js | Dynamic test data generation |
| dotenv | Environment configuration |
| AJV | JSON/schema validation dependency |
| Cucumber | BDD automation dependency |
| Allure Playwright | Reporting dependency |
| ts-node | TypeScript execution |
| Git | Version control |
| GitHub | Source code management |

---

# 📁 Project Structure

```text
Playwright MCP API
│
├── HAR/
│   └── mock-api.har
│
├── pages/
│
├── playwright/
│   └── .auth/
│       └── user.json
│
├── playwright-report/
│   └── index.html
│
├── postman/
│   └── API-Collection.json
│
├── src/
│   ├── fixture/
│   │
│   ├── interface/
│   │   └── BookingAPI.interface.ts
│   │
│   └── utils/
│
├── step-definitions/
│
├── support/
│
├── test-data/
│   ├── api-request/
│   │   ├── Dynamic_POST_API_Request.json
│   │   ├── PATCH_API_Request.json
│   │   ├── POST_API_Request.json
│   │   ├── PUT_API_Request.json
│   │   └── Token_API_Request.json
│   │
│   ├── dev/
│   └── qa/
│
├── test-results/
│   └── .last-run.json
│
├── testcontexts/
│   └── webtestcontext.txt
│
├── tests/
│   └── Chapter01/
│       ├── 01_POST_API_Request_Static.spec.ts
│       ├── 02_POST_API_Request_Dynamic.spec.ts
│       ├── 03_Dynamic_Typesafety__POST_API_Request.spec.ts
│       ├── 04_GET_API_Request_Static.spec.ts
│       ├── 05_Query_Parameters.spec.ts
│       ├── 06_PATCH_API_Request.spec.ts
│       ├── 07_PUT_API_Request.spec.ts
│       ├── 08_DELETE_API_Request.spec.ts
│       ├── 09_Mock_API_Request.spec.ts
│       ├── 10_Mock_API_Response.spec.ts
│       └── 11_Mock_From_HAR-File.spec.ts
│
├── utils/
│   ├── APIHelper.ts
│   └── envConfig.ts
│
├── playwright.config.ts
├── package.json
├── package-lock.json
└── README.md
```

---

# 🧪 API Automation Coverage

The project currently demonstrates the following API testing scenarios:

### HTTP Methods

- `POST`
- `GET`
- `PUT`
- `PATCH`
- `DELETE`

### Additional API Testing

- Static request body
- Dynamic request body
- Faker-based test data
- TypeScript type-safe request body
- Query parameters
- Authentication token generation
- Request headers
- Cookie-based authentication
- Response status validation
- Response status text validation
- Response content-type validation
- Response property validation
- Response body validation
- End-to-end API chaining

---

# 1️⃣ Static POST API Request

The first test demonstrates creating a booking using a static JSON request body.

Test data is maintained separately:

```text
test-data/api-request/POST_API_Request.json
```

The test sends the JSON data to:

```text
POST /booking
```

Example:

```typescript
const postAPIResponse = await request.post("/booking", {
    data: postAPIRequest,
});
```

The response is validated for:

- HTTP status code `200`
- Status text `OK`
- JSON content type
- Required response properties
- Booking ID
- First name
- Last name
- Check-in date

Example validation:

```typescript
expect(postAPIResponse.status()).toBe(200);

expect(
    postAPIResponse.headers()['content-type']
).toContain('application/json');

expect(jsonPOSTAPIResponse.bookingid).toBeGreaterThan(0);
```

---

# 2️⃣ Dynamic POST API Request

The dynamic POST test uses a JSON template and generates test data at runtime.

The framework uses **Faker.js** to generate:

- First name
- Last name
- Total price

Example:

```typescript
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();

const totalPrice = faker.number.int({
    min: 100,
    max: 5000
});
```

The dynamic values are inserted into:

```text
Dynamic_POST_API_Request.json
```

using the reusable:

```typescript
formatAPIRequest()
```

utility.

### Dynamic flow

```text
JSON Template
      ↓
Generate Faker Data
      ↓
Replace Placeholders
      ↓
Create JSON Request
      ↓
POST /booking
      ↓
Validate Response
```

The test also verifies that the generated values returned by the API match the values sent in the request.

---

# 3️⃣ Type-Safe POST API Request

The project also demonstrates building an API request using TypeScript interfaces.

The reusable API model contains:

```typescript
interface BookingDates {
    checkin: string;
    checkout: string;
}

interface BookingAPI {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    additionalneeds: string;
    bookingdates: BookingDates;
}
```

The request body is created through:

```typescript
getPOSTAPIRequestBody()
```

Example:

```typescript
const postAPIRequest = await getPOSTAPIRequestBody(
    firstName,
    lastName,
    totalPrice,
    true,
    "breakfast",
    "2025-01-12",
    "2025-01-19"
);
```

This provides a structured and type-safe way to create the booking request.

---

# 4️⃣ POST → GET API Flow

The project also demonstrates API chaining.

First, a booking is created:

```text
POST /booking
```

The generated booking ID is extracted from the response:

```typescript
const bookingId = jsonPOSTAPIResponse.bookingid;
```

The booking ID is then used for:

```text
GET /booking/{bookingId}
```

Flow:

```text
POST /booking
      ↓
bookingid
      ↓
GET /booking/{bookingId}
      ↓
Validate booking response
```

This demonstrates how data from one API response can be used as input for another API request.

---

# 5️⃣ Query Parameter Testing

The framework demonstrates sending query parameters with Playwright.

Example:

```typescript
const getAPIResponse = await request.get("/booking/", {
    params: {
        firstname: firstName,
        lastname: lastName
    }
});
```

This allows the test to validate API filtering/search behavior using query parameters.

---

# 6️⃣ API Authentication

The project demonstrates generating an authentication token using:

```text
POST /auth
```

The returned token is extracted from the response:

```typescript
const tokenAPIJSONResponse = await tokenAPIResponse.json();

const token = tokenAPIJSONResponse.token;
```

The token is then used for authenticated API operations.

Example:

```typescript
headers: {
    "Content-Type": "application/json",
    "Cookie": `token=${token}`
}
```

---

# 7️⃣ PUT API Request

The project demonstrates updating an existing booking using:

```text
PUT /booking/{bookingId}
```

The flow is:

```text
Create Booking
      ↓
Get Booking ID
      ↓
Generate Authentication Token
      ↓
PUT /booking/{BookingID}
      ↓
Validate Response
```

The PUT request uses a dedicated request body:

```text
test-data/api-request/PUT_API_Request.json
```

---

# 8️⃣ PATCH API Request

Partial booking updates are tested using:

```text
PATCH /booking/{bookingId}
```

The request body is maintained in:

```text
test-data/api-request/PATCH_API_Request.json
```

The test validates:

- Status code
- Status text
- Returned JSON response

---

# 9️⃣ DELETE API Request

The project also demonstrates deleting a booking:

```text
DELETE /booking/{bookingId}
```

The DELETE operation uses the generated authentication token.

Flow:

```text
Create Booking
      ↓
Get Booking ID
      ↓
Generate Token
      ↓
PATCH Booking
      ↓
DELETE Booking
      ↓
Validate Delete Response
```

The test validates the expected successful DELETE response.

---

# 🎭 API Mocking

The project demonstrates Playwright API mocking using:

```typescript
page.route()
```

The application used for the mocking examples is:

```text
https://demo.playwright.dev/api-mocking
```

The API endpoint intercepted is:

```text
GET /api/v1/fruits
```

---

# 1. Request Mocking

In request mocking, the actual API response is completely replaced with a custom response.

Example:

```typescript
await page.route("*/**/api/v1/fruits", async (route) => {

    await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
            { name: "Nill", id: 55 },
            { name: "Kapi", id: 56 },
            { name: "Raj", id: 57 }
        ])
    });
});
```

Flow:

```text
Browser
   ↓
GET /api/v1/fruits
   ↓
Playwright Intercepts Request
   ↓
route.fulfill()
   ↓
Custom JSON Response
   ↓
Application
```

The test then verifies that the mocked data is displayed:

```typescript
await expect(page.getByText("Nill")).toBeVisible();
```

---

# 2. API Response Mocking / Modification

The project also demonstrates modifying the real API response.

Instead of completely replacing the API, the original API is first called using:

```typescript
const response = await route.fetch();
```

The response JSON is then modified:

```typescript
const jsonResponse = await response.json();

jsonResponse.push({
    name: "Nill",
    id: 55
});

jsonResponse.push({
    name: "Kapi",
    id: 56
});

jsonResponse.push({
    name: "Raj",
    id: 57
});
```

The modified response is returned to the application:

```typescript
await route.fulfill({
    response: response,
    json: jsonResponse
});
```

### Flow

```text
Application
     ↓
API Request
     ↓
route.fetch()
     ↓
Real API Response
     ↓
Modify JSON
     ↓
route.fulfill()
     ↓
Application receives modified response
```

This approach is useful when you want to preserve the real API response while adding or modifying specific test data.

---

# 3. HAR-Based API Mocking

The project also demonstrates **HAR-based API mocking**.

HAR stands for:

**HTTP Archive**

The project contains:

```text
HAR/
└── mock-api.har
```

The recorded API response can be replayed using:

```typescript
await page.routeFromHAR("./HAR/mock-api.har", {
    url: "**/api/v1/fruits"
});
```

The application is then opened normally:

```typescript
await page.goto(
    "https://demo.playwright.dev/api-mocking"
);
```

The test validates data from the HAR response, including:

```text
Banana
Nill
Kapi
```

### HAR replay flow

```text
Application
      ↓
API Request
      ↓
routeFromHAR()
      ↓
mock-api.har
      ↓
Recorded Response
      ↓
Application
```

HAR mocking provides a deterministic way to replay previously recorded network responses.

---

# 🧰 Reusable API Utilities

The project contains:

```text
utils/APIHelper.ts
```

The helper contains reusable functions for API request generation.

## `formatAPIRequest()`

This function replaces numbered placeholders in a JSON template.

Example concept:

```text
{0} → First Name
{1} → Last Name
{2} → Total Price
```

This allows the same JSON template to be reused with different runtime data.

---

## `getPOSTAPIRequestBody()`

This helper creates a structured booking API request:

```typescript
getPOSTAPIRequestBody(
    firstName,
    lastName,
    totalPrice,
    depositPaid,
    additionalNeeds,
    checkIn,
    checkOut
);
```

The request is represented using the TypeScript `BookingAPI` interface.

---

# 🎲 Dynamic Test Data

The framework uses:

```text
@faker-js/faker
```

to generate dynamic test data.

Examples include:

```typescript
faker.person.firstName()
faker.person.lastName()
faker.number.int()
```

This prevents tests from relying entirely on fixed values and allows different data to be generated during execution.

---

# 📦 Test Data Management

API request bodies are maintained separately from test code.

```text
test-data/
└── api-request/
    ├── Dynamic_POST_API_Request.json
    ├── PATCH_API_Request.json
    ├── POST_API_Request.json
    ├── PUT_API_Request.json
    └── Token_API_Request.json
```

This separation makes request data easier to maintain and reuse.

---

# ⚙️ Environment Configuration

The project uses `dotenv` for environment configuration.

The Playwright configuration reads:

```text
BASE_URL
API_TIMEOUT
```

from environment variables.

Example:

```typescript
use: {
    baseURL: process.env.BASE_URL,
}
```

The API tests can also configure the API base URL through:

```typescript
test.use({
    baseURL: process.env.BASE_API_URL,
});
```

Sensitive values should be maintained outside the source code and should not be committed to GitHub.

---

# ⚙️ Playwright Configuration

The project uses:

```text
playwright.config.ts
```

The current configuration includes:

```typescript
testDir: "./tests"
```

API timeout:

```typescript
timeout: Number(process.env.API_TIMEOUT) || 30000
```

Reporters:

```typescript
reporter: [
    ["html", { open: "never" }],
    ["list"]
]
```

Parallel execution:

```typescript
fullyParallel: true
```

---

# 📊 Test Reporting

The project is configured with Playwright's HTML reporter.

After test execution, the report can be opened using:

```bash
npx playwright show-report
```

The generated report is available under:

```text
playwright-report/
```

---

# ▶️ Installation

## Clone the Repository

```bash
git clone https://github.com/lalitsali/playwright-typescript-API-automation.git
```

Navigate to the project:

```bash
cd playwright-typescript-API-automation
```

---

## Install Dependencies

```bash
npm install
```

---

## Install Playwright Browser

```bash
npx playwright install
```

For Chromium:

```bash
npx playwright install chromium
```

---

# ▶️ Run All Tests

```bash
npx playwright test
```

---

# ▶️ Run a Specific Test

Example:

```bash
npx playwright test tests/Chapter01/01_POST_API_Request_Static.spec.ts
```

Run the HAR mocking test:

```bash
npx playwright test tests/Chapter01/11_Mock_From_HAR-File.spec.ts
```

---

# 🖥️ Run Mocking Test in Headed Mode

To visually see the browser:

```bash
npx playwright test tests/Chapter01/09_Mock_API_Request.spec.ts --headed
```

For response mocking:

```bash
npx playwright test tests/Chapter01/10_Mock_API_Response.spec.ts --headed
```

For HAR mocking:

```bash
npx playwright test tests/Chapter01/11_Mock_From_HAR-File.spec.ts --headed
```

---

# 🐞 Debug Tests

Run Playwright in debug mode:

```bash
npx playwright test --debug
```

---

# 📋 Run Individual API Tests

### Static POST

```bash
npx playwright test tests/Chapter01/01_POST_API_Request_Static.spec.ts
```

### Dynamic POST

```bash
npx playwright test tests/Chapter01/02_POST_API_Request_Dynamic.spec.ts
```

### Type-Safe POST

```bash
npx playwright test tests/Chapter01/03_Dynamic_Typesafety__POST_API_Request.spec.ts
```

### GET

```bash
npx playwright test tests/Chapter01/04_GET_API_Request_Static.spec.ts
```

### Query Parameters

```bash
npx playwright test tests/Chapter01/05_Query_Parameters.spec.ts
```

### PATCH

```bash
npx playwright test tests/Chapter01/06_PATCH_API_Request.spec.ts
```

### PUT

```bash
npx playwright test tests/Chapter01/07_PUT_API_Request.spec.ts
```

### DELETE

```bash
npx playwright test tests/Chapter01/08_DELETE_API_Request.spec.ts
```

### Request Mocking

```bash
npx playwright test tests/Chapter01/09_Mock_API_Request.spec.ts
```

### Response Mocking

```bash
npx playwright test tests/Chapter01/10_Mock_API_Response.spec.ts
```

### HAR Mocking

```bash
npx playwright test tests/Chapter01/11_Mock_From_HAR-File.spec.ts
```

---

# 🔄 Overall Framework Flow

```text
                    Playwright Test
                          │
                          ▼
                  TypeScript Test
                          │
             ┌────────────┴────────────┐
             │                         │
             ▼                         ▼
        API Testing              API Mocking
             │                         │
             ▼                         ▼
      Request Preparation       page.route()
             │                   route.fetch()
             │                   route.fulfill()
             ▼                         │
       API Request                     ▼
             │                    HAR Replay
             ▼                  routeFromHAR()
      API Response
             │
             ▼
      Response Parsing
             │
             ▼
        Assertions
             │
             ▼
       HTML Report
```

---

# 🎯 Key Features

- Playwright API automation
- TypeScript-based framework
- Static API request testing
- Dynamic API request testing
- Faker-based test data
- Type-safe request models
- POST, GET, PUT, PATCH and DELETE testing
- Query parameter testing
- Authentication token generation
- Cookie-based authentication
- API request chaining
- Response validation
- API request mocking
- API response modification
- HAR-based API mocking
- Externalized API test data
- Reusable API helper functions
- Environment-based configuration
- HTML reporting
- Headed and debug execution

---

# 📈 Future Enhancements

Possible future improvements for the framework include:

- More reusable fixtures
- Centralized authentication handling
- JSON schema validation using AJV
- Improved API assertion utilities
- Better environment-specific test data management
- CI/CD pipeline integration
- Automated report publishing
- Enhanced Allure reporting
- Additional API negative test scenarios
- API contract/schema testing
- Database validation
- Improved logging
- Retry and failure-handling strategy

---

# 👨‍💻 Author

**Lalit Sali**

QA Engineer | Playwright | TypeScript | API Automation | Selenium | Java

GitHub:

https://github.com/lalitsali

---

## 📌 Repository

**Playwright TypeScript API Automation**

https://github.com/lalitsali/playwright-typescript-API-automation

---

## 📄 Purpose

This project is developed for **API automation practice, framework development, and demonstrating Playwright with TypeScript for REST API testing and API mocking**.