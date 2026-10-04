export interface BookingAPI{
    
    "firstname": string,
    "lastname": string,
    "totalprice": number,
    "depositpaid": boolean,
   
    "additionalneeds": string,
    "bookingdates":Bookingdates,
}

 export interface Bookingdates {
        "checkin": string,
        "checkout": string
}