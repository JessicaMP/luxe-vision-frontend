import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchStudiosRandomAPI } from "@/reducers/studiosReducer";
import { AppDispatch } from "@/store";

const useRandomStudios = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setStatus("loading");
      try {
        const result = await dispatch(fetchStudiosRandomAPI()).unwrap();
        setData(result);
        setStatus("succeeded");
      } catch (err: any) {
        setError(err.message);
        setStatus("failed");
      }
    };

    fetchData();
  }, [dispatch]);

  return { data, status, error };
};

export default useRandomStudios;
