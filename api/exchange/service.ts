import { Request, Response } from "express";
import { readFileSync } from "fs";

interface ValidatedQuery {
  source: string;
  target: string;
  amount: string;
}

export const getExchange = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const q = req.query;
    const validated = queryValidate(q);
    const { currencies } = JSON.parse(
      readFileSync("./asset/exchange.json", "utf8")
    );
    const exchanged = exchanger(currencies, validated);
    const fAmount = amountFormatter(exchanged);
    const result = {
      msg: "success",
      amount: fAmount,
    };
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

const queryValidate = (q: qs.ParsedQs): ValidatedQuery => {
  const source = String(q.source);
  const target = String(q.target);
  const amount = String(q.amount);
  const splited = amount.split("$");
  if (splited.length !== 2 || !amount.startsWith("$")) {
    throw {
      msg: "failed",
      result: "format error",
    };
  }
  const validated = {
    source,
    target,
    amount,
  };
  return validated;
};

const amountToNumber = (a: string): number => {
  const splited = a.split("$")[1].split(",");
  return Number(splited.reduce((pre, cur) => pre + cur));
};

const amountFormatter = (n: number): string => {
  const fixed = Math.round(n * 100) / 100;
  const splited = String(fixed).split(".");
  const commaed = splited[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return "$" + commaed + "." + splited[1];
};

const exchanger = (currencies: any, validated: ValidatedQuery): number => {
  const { source, target, amount } = validated;
  const mappedSource = Object.keys(currencies).find((key) => key === source);
  if (!mappedSource) {
    throw {
      msg: "failed",
      result: "mapping not found",
    };
  }
  const mappedExchange = currencies[mappedSource];
  const mappedTarget = currencies[target];
  if (!mappedTarget) {
    throw {
      msg: "failed",
      result: "mapping not found",
    };
  }
  const nAmount = amountToNumber(amount);
  const exchanged = nAmount * mappedExchange[target];
  return exchanged;
};
