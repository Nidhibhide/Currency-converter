import React, { useEffect, useState } from "react";
import { LuArrowRightLeft } from "react-icons/lu";
import { GetAllCountryList } from "../api/index";
import ReactSelect from "react-select";
import { ReactSelectStyles } from "../utils/index";

const HomePage = () => {
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");
  const [countries, setCountries] = useState([]);

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

  const CountryOptionsObject = countries.map((country) => {
    return {
      label: country?.name?.common,
      value: country?.currencies
        ? Object.keys(country?.currencies).toString()
        : "",
    };
  });

  return (
    <div className="md:bg-blue-500 h-screen overflow-x-hidden flex justify-center md:items-center items-start">
      <div className="bg-white md:w-[450px] flex flex-col  py-4 md:py-8 md:px-7 px-4  md:gap-4 gap-8  rounded-lg w-full">
        <h1 className="text-3xl font-bold text-center">Currency converter</h1>

        <div className="flex flex-col gap-2">
          <p className="text-xl font-semibold">Enter Amount</p>
          <input
            type="text"
            required
            className="focus:outline-none text-xl font-medium py-2.5 px-2 border border-black  "
          />
        </div>

        <div className="flex justify-center  items-center  flex-col md:gap-0 gap-2 ">
          {/* From Country */}
          <div className="flex flex-col gap-1 w-full">
            <p className="text-xl font-medium">From</p>

            <div className="w-full">
              <ReactSelect
                options={CountryOptionsObject}
                value={
                  fromCountry
                    ? CountryOptionsObject.find(
                        (country) => country.value === fromCountry
                      )
                    : null
                }
                onChange={(e) => setFromCountry(e.value)}
                placeholder="Select a country..."
                isSearchable
                styles={ReactSelectStyles}
              />
            </div>
          </div>

          <span className="text-4xl mt-6  cursor-pointer">
            <LuArrowRightLeft />
          </span>

          {/* To Country */}
          <div className="flex flex-col gap-1 w-full">
            <p className="text-xl font-medium">To</p>

            <div className="w-full">
              <ReactSelect
                options={CountryOptionsObject}
                placeholder="Select a country..."
                value={
                  toCountry
                    ? CountryOptionsObject.find(
                        (country) => country.value === toCountry
                      )
                    : null
                }
                onChange={(e) => setToCountry(e.value)}
                isSearchable
                styles={ReactSelectStyles}
              />
            </div>
          </div>
        </div>

        <p className="text-2xl font-extrabold">1 dollar = 80 Rs only</p>
        <button className="bg-blue-500 text-xl text-white py-3 font-semibold rounded-xl  hover:bg-blue-600">
          Get Exchange rate
        </button>
      </div>
    </div>
  );
};

export default HomePage;
