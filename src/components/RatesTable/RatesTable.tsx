import { useGetRatesQuery } from "../../redux/currenciesApi";
import { useAppSelector } from "../../redux/hooks";
import { selectBaseCurrency } from "../../redux/baseCurrencySlice";

export const RatesTable = () => {
  const baseCurrency = useAppSelector(selectBaseCurrency);
  const { data, isFetching } = useGetRatesQuery(baseCurrency);
  const rates = data && data.quotes ? Object.entries(data.quotes) : [];
  const valueDollars = rates
    ?.filter((rate) => rate[0] === "USDRUB")
    .map((rate) => parseFloat(rate[1].toFixed(2)))

  const valueEuro = rates
    ?.filter((rate) => rate[0] === "USDEUR")
    .map((rate) => parseFloat(rate[1].toFixed(2)))
  const currentEuro = valueDollars[0] / valueEuro[0]
  return (
    <>
      {isFetching}
      <table style={{ minWidth: 260, borderCollapse: "collapse", width: "100%", marginBottom: "15px" }}>
        <thead>
          <tr>
            <th style={{ padding: "10px", borderBottom: "1px solid #000", textAlign: "left" }}>Валюта</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #000", textAlign: "right" }}>Количество</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #000", textAlign: "right" }}>Рубль</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "10px", borderBottom: "1px solid #000" }}>USD</td>
            <td style={{ padding: "10px", borderBottom: "1px solid #000", textAlign: "right" }}>1.00</td>
            <td style={{ padding: "10px", borderBottom: "1px solid #000", textAlign: "right" }}>{valueDollars}</td>
          </tr>
          <tr>
            <td style={{ padding: "10px", borderBottom: "1px solid #000" }}>EUR</td>
            <td style={{ padding: "10px", borderBottom: "1px solid #000", textAlign: "right" }}>1.00</td>
            <td style={{ padding: "10px", borderBottom: "1px solid #000", textAlign: "right" }}>{currentEuro.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </>

  );
};
