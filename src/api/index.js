import axios from "axios";

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



