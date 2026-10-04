// import { test, expect } from "@playwright/test";

// test("Mock API From HAR File in Playwright", async ({ page }) => {

//     await page.routeFromHAR('./HAR/mock-api.har', {
//         url:'*/**/api/v1/fruits',
//         // update: false
//     });
// 0
//     await page.goto("https://demo.playwright.dev/api-mocking"); 

//     await expect(page.getByText("Banana")).toBeVisible();
//     await expect(page.getByText("Nill")).toBeVisible();
//     await expect(page.getByText("Kapi")).toBeVisible();





// });
// 


import { test, expect } from "@playwright/test";

test("Mock API From HAR File in Playwright", async ({ page }) => {

    await page.routeFromHAR("./HAR/mock-api.har", {
        url: "**/api/v1/fruits"
    });

    await page.goto("https://demo.playwright.dev/api-mocking");

    await expect(page.getByText("Banana")).toBeVisible();
    await expect(page.getByText("Nill")).toBeVisible();
    await expect(page.getByText("Kapi")).toBeVisible();

    await page.waitForTimeout(10000);
});