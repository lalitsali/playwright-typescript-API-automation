import { test, expect } from "@playwright/test";

test("Mock API Response in Playwright", async ({ page }) => {

    await page.route("*/**/api/v1/fruits", async (route) => {

        // Get original API response
        const response = await route.fetch();

        // Convert response to JSON
        const jsonResponse = await response.json();

        // Add our own data
        jsonResponse.push({ name: "Nill", id: 55 });
        jsonResponse.push({ name: "Kapi", id: 56 });
        jsonResponse.push({ name: "Raj", id: 57 });

        // Send modified response to frontend
        await route.fulfill({
            response: response,
            json: jsonResponse
        });
    });

    await page.goto("https://demo.playwright.dev/api-mocking");

    // Frontend verification
    await expect(page.getByText("Nill")).toBeVisible();
    await expect(page.getByText("Kapi")).toBeVisible();
    await expect(page.getByText("Raj")).toBeVisible();

    // Keep browser open for visual verification
    await page.waitForTimeout(10000);
});