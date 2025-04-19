export const ReactSelectStyles = {
  control: (provided) => ({
    ...provided,
    width: "full",
    height: "52px",
    border: "1px solid black",
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: "18px",
    fontWeight: "400",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "19px",
    fontWeight: "500",
  }),
  option: (provided) => ({
    ...provided,
    fontSize: "17px",
  }),
};

export const CurrencyConversionFunc = (
  conversions,
  toCountry,
  amount,
  fromCountry,
  setResult
) => {
  const ans = conversions[toCountry.value] * amount;
  setResult(`${amount} ${fromCountry.value} = ${ans} ${toCountry.value}`);
};

export const CountryOptionsObject = (countries) => {
  return countries.map((country) => {
    return {
      label: country?.name?.common,
      value: country?.currencies
        ? Object.keys(country?.currencies).toString()
        : "",
    };
  });
};


