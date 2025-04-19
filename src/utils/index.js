export const ReactSelectStyles={
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
    option: (provided, state) => ({
      ...provided,
      fontSize: "17px",
    }),
  }