import React, { useEffect, useState } from "react";
import { useGetRatesQuery } from "../../redux/currenciesApi";
import { useAppSelector } from "../../redux/hooks";
import { selectBaseCurrency } from "../../redux/baseCurrencySlice";
import useDebounce from "../../hooks/useDebounce";

export const Converter: React.FC = () => {
  const baseCurrency = useAppSelector(selectBaseCurrency);

  const { data, error, isFetching } = useGetRatesQuery(baseCurrency);
  const rates = data && data.quotes && Object.entries(data.quotes);
  const currenciesNames = data && data.quotes && Object.keys(data.quotes);

  const [result, setResult] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isCalculated, setIsCalculated] = useState(false);
  const debouncedInput = useDebounce(inputValue, 500);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!isCalculated) {
      setResult("");
    }

    if (isCalculated && event.target.value === "") {
      setResult("");
    }

    if (!error) {
      setInputValue(event.target.value.replace(/  +/g, " "));
    }
  };

  useEffect(() => {
    let errMsg = "";
    if (error) {
      if ("status" in error) {
        errMsg = "error" in error ? error.error : JSON.stringify(error.data);
      }
      setResult(errMsg);
    }
  }, [error]);
  useEffect(() => {
    let amount = Number(debouncedInput?.trim());
    let isValidInput = amount > 0;

    if (isValidInput && rates) {

      const convertedAmount = rates
        ?.filter((rate) => rate[0] === "USDRUB")
        .map((rate) => parseFloat(rate[1].toFixed(2)) * amount)[0];



      setResult(`Сумма ${amount} ${baseCurrency} равна ${convertedAmount.toFixed(2)} RUB`);
      setIsCalculated(true);
    } else if (inputValue !== "") {
      setIsCalculated(false);
      setResult("введите валидное значение");
    }
  }, [debouncedInput, baseCurrency, inputValue, rates]);
  return (
    <>
      <h1>Введите сумму в USD</h1>
      {isFetching}
      <input
        type="text"
        placeholder="Введите сумму"
        value={inputValue}
        onChange={(event) => handleInputChange(event)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />
      <p style={{
        fontSize: "1.25rem",
        margin: "0px",
        fontWeight: 500,
        lineHeight: "1.6",
        letterSpacing: "0.0075em"
      }}>
        {result}
      </p>
    </>

  );
};
