import axios from 'axios';
import { base_url } from '../utils/constants'

export const fetchProductRankings = async (startIndex = 0, displayCount = 10, startDate, endDate) => {
  try {
    const response = await fetch(
      `${base_url}/products-rankings?page=${startIndex}&limit=${displayCount}&startDate=${startDate}&endDate=${endDate}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product rankings", error);
    return { data: { products: [] } };
  }
};

export const fetchProducts = async (page=1) => {
  try {
    const response = await axios.get(`${base_url}/products`, {
      params: { page }
    });
    return response;
  } catch (error) {
    console.error("Error fetching product rankings", error);
    return { data: { products: [] } };
  }
};


  
  