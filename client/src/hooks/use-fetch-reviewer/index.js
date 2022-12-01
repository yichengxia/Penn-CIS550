import axios from "axios";
import { useState } from "react";

const useFetchReviewer = () => {
  const [isFetchingReviewer, setIsFetchingReviewer] = useState(false);

  const fetchReviewer = async (reviewerId) => {
    setIsFetchingReviewer(true);
    try {
      const response = await axios.get(`/api/reviewer/${reviewerId}`);
      return response.data.results;
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsFetchingReviewer(false);
    }
  };

  return [isFetchingReviewer, fetchReviewer];
};

export default useFetchReviewer;
