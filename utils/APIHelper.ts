
export interface BookingDates {
  checkin: string;
  checkout: string;
}

export interface BookingAPI {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  additionalneeds: string;
  bookingdates: BookingDates;
}

export async function formatAPIRequest(
  template: string,
  values: any[]
): Promise<string> {
  return template.replace(/\{(\d+)\}/g, (match, p1) => {
    const index = parseInt(p1, 10);

    return index < values.length
      ? String(values[index])
      : match;
  });
}




export async function getPOSTAPIRequestBody(
  fname: string,
  lname: string,
  price: number,
  depositpaid: boolean,
  additionalneeds: string,
  checkin: string,
  checkout: string
) {
  const apiRequest: BookingAPI = {
    firstname: fname,
    lastname: lname,
    totalprice: price,
    depositpaid: depositpaid,
    additionalneeds: additionalneeds,
    bookingdates: {
      checkin: checkin,
      checkout: checkout,
    },
  };

  return apiRequest;
}