import axios from 'axios';

export const fetchData = async (props) => {
  const apiUrl = "https://www.themealdb.com/api/json/v1/1/";
  try {
    const response = await axios.get(apiUrl + props);
    return response.data;
  } catch (error) {
    console.log("Gagal Fetch Data");
  }
};