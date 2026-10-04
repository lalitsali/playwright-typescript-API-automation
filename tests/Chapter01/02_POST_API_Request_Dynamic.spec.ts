import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import {formatAPIRequest} from "../../utils/APIHelper"
import fs from "fs";
import { faker } from "@faker-js/faker";

dotenv.config();

import postAPIRequest from "../../test-data/api-request/POST_API_Request.json";

test.use({
  baseURL: process.env.BASE_API_URL,
});

test("create POST API Request using static file", async ({ request }) => {
  
  //reading json file
  const filepath=path.join(__dirname,"../../test-data/api-request/Dynamic_POST_API_Request.json")
  const jsonTemplate=fs.readFileSync(filepath, 'utf-8')

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const totalPrice = faker.number.int({ min: 100, max: 5000 });

  console.log("First Name:", firstName);
  console.log("Last Name:", lastName);
  console.log("Total Price:", totalPrice);


    const values = [
      firstName,
      lastName,
      totalPrice
    ];
    
  //updating POST API request body
  const postAPIRequest=await formatAPIRequest(jsonTemplate,values)
  
  console.log("Base URL:", process.env.BASE_API_URL);

  const postAPIResponse = await request.post("/booking", {
    data: JSON.parse(postAPIRequest)
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
  expect(jsonPOSTAPIResponse.booking.firstname).toBe(firstName)
    expect(jsonPOSTAPIResponse.booking.lastname).toBe(lastName)
    expect(jsonPOSTAPIResponse.booking.totalprice).toBe(totalPrice)



});