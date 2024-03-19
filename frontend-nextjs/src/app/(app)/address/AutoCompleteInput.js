import { useState } from "react";
import getPlaces from "../address/API/getPlaces";

const AutoCompleteInput = ({
    handleManualInputChange,
    setAddress,
    address,
  }) => {
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = (event) => {
        handleManualInputChange(event, "address");
        handleInputChange(event.target.value);
      };
    
      const handleInputChange = async (query) => {
        const suggesions = await getPlaces(query);
        setSuggestions(suggesions);
      };

      const handleSuggestionClick = (suggestion) => {
        const address = suggestion.place_name;
        setAddress(address);
        setSuggestions([]);
      };
      const handleBlur = () =>{
        setSuggestions([])
      }

  return (
    <div>
      <div className="autoCompleteInputContainer">
        <input
          id="address"
          type="text"
          value={address}
         
          onChange={handleChange}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        />
        <ul className="border w-48 bg-white border-black-200 absolute z-50">
          {suggestions?.map((suggestion, index) => (
            <li  className="border" key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.place_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AutoCompleteInput