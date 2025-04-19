import React, { useEffect, useState } from "react";
import { LuArrowRightLeft } from "react-icons/lu";
import { GetAllCountryList, GetCurrencyByFrom } from "../api/index";
import ReactSelect from "react-select";
import {
  ReactSelectStyles,
  CountryOptionsObject,
  CurrencyConversionFunc,
} from "../utils/index";

const HomePage = () => {
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [conversions, setConversions] = useState([]);
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await GetAllCountryList();
        setCountries(response);
      } catch (error) {
        console.log("Error in fetching countries list", error);
      }
    };
    fetchCountryData();
  }, []);

  //pass to new file
  const handleSwap = () => {
    setFromCountry(toCountry);
    setToCountry(fromCountry);
  };

  useEffect(() => {
    if (!fromCountry) {
      return;
    }
    const FromCountryHandle = async () => {
      try {
        const response = await GetCurrencyByFrom(fromCountry.value);
        setConversions(response);
      } catch (error) {
        console.log("Error in fetching currency convertor rate", error);
      }
    };
    FromCountryHandle();
  }, [fromCountry]);

  return (
    <div className="md:bg-blue-500 h-screen overflow-x-hidden flex justify-center md:items-center items-start">
      <div className="bg-white md:w-[450px] flex flex-col  py-4 md:py-8 md:px-7 px-4  md:gap-4 gap-8  rounded-lg w-full">
        <h1 className="text-3xl font-bold text-center">Currency converter</h1>
        {error && <p className="text-xl font-bold text-red-600">{error}</p>}
        <div className="flex flex-col gap-2">
          <p className="text-xl font-semibold">Enter Amount</p>
          <input
            type="text"
            required
            className="focus:outline-none text-xl font-medium py-2.5 px-2 border border-black rounded-md placeholder:text-lg placeholder:font-normal placeholder:text-slate-500 "
            placeholder="Enter amount..."
            name="amount"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>

        <div className="flex justify-center  items-center  flex-col md:gap-0 gap-2 ">
          {/* From Country */}
          <div className="flex flex-col gap-1 w-full">
            <p className="text-xl font-medium">From</p>

            <div className="w-full">
              <ReactSelect
                options={CountryOptionsObject(countries)}
                value={fromCountry}
                onChange={(e) => setFromCountry(e)}
                placeholder="Select a country..."
                isSearchable
                styles={ReactSelectStyles}
              />
            </div>
          </div>

          <span className="text-4xl mt-6  cursor-pointer" onClick={handleSwap}>
            <LuArrowRightLeft />
          </span>

          {/* To Country */}
          <div className="flex flex-col gap-1 w-full">
            <p className="text-xl font-medium">To</p>

            <div className="w-full">
              <ReactSelect
                options={CountryOptionsObject(countries)}
                placeholder="Select a country..."
                value={toCountry}
                onChange={(e) => setToCountry(e)}
                isSearchable
                styles={ReactSelectStyles}
              />
            </div>
          </div>
        </div>

        {result && (
          <p className="text-2xl font-extrabold text-red-600">{result || ""}</p>
        )}

        <button
          className="bg-blue-500 text-xl text-white py-3 font-semibold rounded-xl  hover:bg-blue-600"
          onClick={() => {
            if (!toCountry || !amount.trim() || !fromCountry) {
              setError("*All fields are required");
              return;
            }
            CurrencyConversionFunc(
              conversions,
              toCountry,
              amount,
              fromCountry,
              setResult
            );
            setError("");
          }}
        >
          Get Exchange rate
        </button>
      </div>
    </div>
  );
};

export default HomePage;
