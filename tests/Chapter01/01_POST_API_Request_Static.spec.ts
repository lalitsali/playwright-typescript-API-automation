import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

import postAPIRequest from "../../test-data/api-request/POST_API_Request.json";

test.use({
  baseURL: process.env.BASE_API_URL,
});

test("create POST API Request using static file", async ({ request }) => {
  console.log("Base URL:", process.env.BASE_API_URL);

  const postAPIResponse = await request.post("/booking", {
    data: postAPIRequest,
  });

  //validate status code
  expect(postAPIResponse.status()).toBe(200);
  expect(postAPIResponse.statusText()).toBe('OK')
  expect(postAPIResponse.headers()['content-type']).toContain('application/json')

  const jsonPOSTAPIResponse = await postAPIResponse.json();

  console.log(JSON.stringify(jsonPOSTAPIResponse, null, 2));

  //validate property/key names
  expect(jsonPOSTAPIResponse.booking).toHaveProperty('firstname')
  expect(jsonPOSTAPIResponse.booking).toHaveProperty('lastname')

  expect(jsonPOSTAPIResponse.booking.bookingdates).toHaveProperty('checkin')
  expect(jsonPOSTAPIResponse.booking.bookingdates).toHaveProperty('checkout')

  //Validate API response body
  expect(jsonPOSTAPIResponse.bookingid).toBeGreaterThan(0)
  expect(jsonPOSTAPIResponse.booking.firstname).toBe('Lalit Test Fname')
    expect(jsonPOSTAPIResponse.booking.lastname).toBe('Lalit Test Lname')
    expect(jsonPOSTAPIResponse.booking.bookingdates.checkin).toBe('2018-01-01')



});