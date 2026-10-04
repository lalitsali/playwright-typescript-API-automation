import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import {getPOSTAPIRequestBody} from "../../utils/APIHelper"
import fs from "fs";
import { faker } from "@faker-js/faker";
import tokenAPIRequest from "../../test-data/api-request/Token_API_Request.json";
import putAPIRequest from "../../test-data/api-request/PUT_API_Request.json";

dotenv.config();

import postAPIRequest from "../../test-data/api-request/POST_API_Request.json";
import { log } from "console";

test.use({
  baseURL: process.env.BASE_API_URL,
});

test("create GET API Request using Query Parameter in playwright and typescript file", async ({ request }) => {
  

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const totalPrice = faker.number.int({ min: 100, max: 5000 });

  console.log("First Name:", firstName);
  console.log("Last Name:", lastName);
  console.log("Total Price:", totalPrice);

  
const postAPIRequest=await getPOSTAPIRequestBody(
  firstName,
  lastName,
  totalPrice,
  true,
  "breakfast",
  "2025-01-12",
   "2025-01-19",
)

    const values = [
      firstName,
      lastName,
      totalPrice
    ];
    
  
  console.log("Base URL:", process.env.BASE_API_URL);

  //create POST API Request
  const postAPIResponse = await request.post("/booking", {
    data: postAPIRequest
  });

  //validate status code
  expect(postAPIResponse.status()).toBe(200);
  expect(postAPIResponse.statusText()).toBe('OK')
  expect(postAPIResponse.headers()['content-type']).toContain('application/json')

  const jsonPOSTAPIResponse = await postAPIResponse.json();

  console.log('POST API Response: ',JSON.stringify(jsonPOSTAPIResponse, null, 2));

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

//GET API request using Query parameter

  const bookingId=jsonPOSTAPIResponse.bookingid
  console.log('bookinf id:',bookingId);

  const getAPIResponse= await request.get(`/booking/`,{
    params:{
      firstname:firstName,
      lastname:lastName
    }
  })
  // validate status code, status text
  expect(getAPIResponse.status()).toBe(200);
  expect(getAPIResponse.statusText()).toBe('OK')  

  const getAPIJOSNResponse= await getAPIResponse.json()
  console.log('GET API Response: '+JSON.stringify(getAPIJOSNResponse,null,2))

  //Generate token
  const tokenAPIResponse = await request.post(`/auth`, {
    data: tokenAPIRequest
  });

   // validate status code, status text
  expect(tokenAPIResponse.status()).toBe(200);
  expect(tokenAPIResponse.statusText()).toBe('OK') 

  const tokenAPIJOSNResponse=await tokenAPIResponse.json()
  const token = tokenAPIJOSNResponse.token;
  console.log("token: ",token);

  //create PUT API Request
 const putAPIResponse= await request.put(`/booking/${bookingId}`,{
    headers:{
      "Content-Type":"application/json",
      "Cookie":`token=${token}`
    },data:putAPIRequest
  })
  expect(putAPIResponse.status()).toBe(200);
  expect(putAPIResponse.statusText()).toBe('OK')  

  const putAPIJOSNResponse= await putAPIResponse.json()
  console.log('PUT API Response: '+JSON.stringify(putAPIResponse,null,2))




});