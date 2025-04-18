// import { LuArrowRightLeft } from "react-icons/lu";

// import React, { useState } from "react";
// import { useTheme } from "@mui/material/styles";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 150, //150
//     },
//   },
// };

// const countries = [
//   "India",
//   "United States",
//   "Canada",
//   "Australia",
//   "United Kingdom",
//   "Germany",
//   "France",
//   "Japan",
//   "China",
//   "Brazil",
// ];

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) !== -1
//         ? theme.typography.fontWeightMedium
//         : theme.typography.fontWeightRegular,
//   };
// }

// const HomePage = () => {
//   const theme = useTheme();
//   const [toCountry, settoCountry] = useState("");
//   const [fromCountry, setfromCountry] = useState("");

//   return (
//     <div className="md:bg-blue-500 h-screen  overflow-x-hidden  flex justify-center md:items-center items-start">
//       <div className="bg-white md:w-[600px] flex flex-col items-center py-4 md:py-8 md:px-8 px-0 md:gap-4 gap-8 w-[300px]">
//         <h1 className="text-3xl  font-bold text-center">Currency converter</h1>
//         <div className="flex flex-col  gap-2">
//           <p className="text-xl font-semibold">Enter Amount</p>
//           <input
//             type="text"
//             className="focus:outline-none text-xl font-medium py-2 px-2 border border-black rounded-lg"
//           />
//         </div>
//         <div className="flex justify-center md:gap-8 gap-2 items-center md:flex-row flex-col">
//           <div className="flex flex-col">
//             <p className="text-xl font-medium">From</p>

//             <FormControl sx={{ m: 1, width: 200 }}>
//               <InputLabel id="demo-multiple-name-label">Country</InputLabel>
//               <Select
//                 name="FromList"
//                 value={fromCountry}
//                 onChange={(e) => {
//                   setfromCountry(e.target.value);
//                 }}
//                 input={<OutlinedInput label="Name" />}
//                 MenuProps={MenuProps}
//               >
//                 {countries.map((country) => (
//                   <MenuItem
//                     key={country}
//                     value={country}
//                     style={getStyles(country,fromCountry, theme)}
//                   >
//                     <div className="flex gap-2 items-center">
//                       <span className="text-base font-semibold">{country}</span>
//                       <img className="h-7 w-7" src={usFlag}></img>
//                     </div>
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </div>

//           <span className="text-3xl md:mt-4 mt-0">
//             <LuArrowRightLeft />
//           </span>

//           <div className="flex flex-col">
//             <p className="text-xl font-medium">To</p>

//             <FormControl sx={{ m: 1, width: 200 }}>
//               <InputLabel id="demo-multiple-name-label">Country</InputLabel>
//               <Select
//                 name="ToList"
//                 value={toCountry}
//                 onChange={(e) => {
//                   settoCountry(e.target.value);
//                 }}
//                 input={<OutlinedInput label="Name" />}
//                 MenuProps={MenuProps}
//               >
//                 {countries.map((country) => (
//                   <MenuItem
//                     key={country}
//                     value={country}
//                     style={getStyles(country,toCountry, theme)}
//                   >
//                     <div className="flex gap-2 items-center">
//                       <span className="text-base font-semibold">{country}</span>
//                       <img className="h-7 w-7" src={indiaFlag}></img>{" "}
//                     </div>
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </div>
//         </div>
//         <p className="text-2xl font-extrabold">1 dollar = 80 Rs only</p>
//         <button className="bg-blue-500 text-xl text-white py-3 font-semibold rounded-xl w-[300px] hover:bg-blue-600">
//           Get Exchange rate
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { LuArrowRightLeft } from "react-icons/lu";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 380,
    },
  },
};

function getStyles(name, selectedName, theme) {
  return {
    fontWeight:
      selectedName.indexOf(name) !== -1
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}

const HomePage = () => {
  const theme = useTheme();
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");
  const [countries, setCountries] = useState([]);

  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        const countryList = data.map((country) => ({
          name: country.name.common,
          flag: country.flags.svg, // or country.flags.png
        }));
        setCountries(countryList);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="md:bg-blue-500 h-screen overflow-x-hidden flex justify-center md:items-center items-start">
      <div className="bg-white max-w-[450px] flex flex-col  py-4 md:py-8 md:px-8  md:gap-4 gap-8  rounded-lg">
        <h1 className="text-3xl font-bold text-center">Currency converter</h1>

        <div className="flex flex-col gap-2">
          <p className="text-xl font-semibold">Enter Amount</p>
          <input
            type="text"
            className="focus:outline-none text-xl font-medium py-3 px-2 border border-black "
          />
        </div>

        <div className="flex justify-center  items-center  flex-col md:gap-0 gap-2 ">
          {/* From Country */}
          <div className="flex flex-col gap-1">
            <p className="text-xl font-medium">From</p>

            <FormControl sx={{ m: 1, width: 380, border: "1px solid black" }}>
              <InputLabel id="from-country-label">Country</InputLabel>
              <Select
                name="FromList"
                value={fromCountry}
                onChange={(e) => setFromCountry(e.target.value)}
                input={<OutlinedInput label="Country" />}
                MenuProps={MenuProps}
              >
                {countries.map((country) => (
                  <MenuItem
                    key={country.name}
                    value={country.name}
                    style={getStyles(country.name, fromCountry, theme)}
                  >
                    <div className="flex gap-2 items-center">
                      <img className="h-6 w-8" src={country.flag} alt="flag" />
                      <span className="text-lg font-semibold">
                        {country.name}
                      </span>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <span className="text-4xl md:mt-4 mt-0 cursor-pointer">
            <LuArrowRightLeft />
          </span>

          {/* To Country */}
          <div className="flex flex-col gap-1">
            <p className="text-xl font-medium">To</p>

            <FormControl sx={{ m: 1, width: 380, border: "1px solid black" }}>
              <InputLabel id="to-country-label">Country</InputLabel>
              <Select
                name="ToList"
                value={toCountry}
                onChange={(e) => setToCountry(e.target.value)}
                input={<OutlinedInput label="Country" />}
                MenuProps={MenuProps}
              >
                {countries.map((country) => (
                  <MenuItem
                    key={country.name}
                    value={country.name}
                    style={getStyles(country.name, toCountry, theme)}
                  >
                    <div className="flex gap-2 items-center">
                      <img className="h-6 w-8" src={country.flag} alt="flag" />
                      <span className="text-base font-semibold">
                        {country.name}
                      </span>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
