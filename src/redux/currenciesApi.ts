import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Result = {
  success: boolean,
  terms: string,
  privacy: string,
  timestamp: number,
  source: string,
  quotes: {
    [key: string]: number,
  }
};

type Response = Pick<Result, "quotes">;

const currencies = "EUR,RUB"

export const currenciesApi = createApi({
  reducerPath: "currenciesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://apilayer.net/api/  ",
  }),
  tagTypes: ["Currencies"],
  endpoints: (builder) => ({
    getRates: builder.query<Response, string>({
      query: (baseCurrency) => ({
        url: `http://apilayer.net/api/live?access_key=c3eded4bc73f570e91d455c3cd43436e&currencies=${currencies}&source=${baseCurrency}&format=1`,
        method: "GET",
        redirect: "follow",
      }),
      providesTags: ["Currencies"],
    }),
  }),
});

export const { useGetRatesQuery } = currenciesApi;
