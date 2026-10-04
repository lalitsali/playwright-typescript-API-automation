import { test, expect } from "@playwright/test";

test("Mock API Request in Playwright", async ({ page }) => {

    // Print every API/request URL
    page.on("request", request => {
        console.log("REQUEST:", request.method(), request.url());
    });

    let mockCalled = false;

    await page.route("*/**/api/v1/fruits", async (route) => {

        mockCalled = true;

        console.log("🔥 MOCK API CALLED");

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

    await page.goto("https://demo.playwright.dev/api-mocking");

    console.log("Mock called:", mockCalled);

    await expect(page.getByText("Nill")).toBeVisible();
});