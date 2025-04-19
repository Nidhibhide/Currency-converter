import axios from "axios";
import {API_KEY} from "../utils/Variables"

export const GetAllCountryList = async () => {
    try {
      const response = await axios.get(
        "https://restcountries.com/v3.1/all?fields=currencies,name"
      );

    //   setCountries(response.data);
    return response.data;
    } catch (error) {
      console.log("Error fetching countries", error);
    }
  };

  export const GetCurrencyByFrom = async (fromCountry) => {
    try {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCountry}`
      );

    //   setCountries(response.data);
    return response.data.conversion_rates;
    } catch (error) {
      console.log("Error fetching countries", error);
    }
  };



