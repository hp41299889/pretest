import express from "express";
import supertest from "supertest";
import { exchangeRouter } from "../../api/exchange/router";

const server = express();
server.use("/api", exchangeRouter);

jest.mock("fs", () => ({
  readFileSync: jest.fn().mockReturnValue(
    JSON.stringify({
      currencies: {
        TWD: { TWD: 1, JPY: 3.669, USD: 0.03281 },
        JPY: { TWD: 0.26956, JPY: 1, USD: 0.00885 },
        USD: { TWD: 30.444, JPY: 111.801, USD: 1 },
      },
    })
  ),
}));

describe("GET /api/exchange", () => {
  it("exchange currencies", async () => {
    const res = await supertest(server)
      .get("/api/exchange")
      .query({ source: "USD", target: "JPY", amount: "$1,525" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      msg: "success",
      amount: "$170,496.53",
    });
  });
});
