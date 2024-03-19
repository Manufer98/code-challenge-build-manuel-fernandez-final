import axios from "axios";

export default async function getPlaces(query) {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
      {
        params: {
          access_token: 'pk.eyJ1IjoibWFudWZlcjk4IiwiYSI6ImNsdHAxOW84dzBuaGQybG1ub3hrMzBtaTQifQ.q44LL9SVIvAKfVC2IjeT5A',
        },
      }
    );

    return response.data.features;
  } catch (error) {
    console.error("There was an error while fetching places:", error);
  }
}