import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchRandomStudios } from "../reducers/studioReducer";

const useRandomStudios = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setStatus("loading");
      try {
        const result = await dispatch(fetchRandomStudios()).unwrap();
        setData(result);
        setStatus("succeeded");
      } catch (err) {
        setError(err.message);
        setStatus("failed");
      }
    };

    fetchData();
  }, [dispatch]);

  return { data, status, error };
};

export default useRandomStudios;
