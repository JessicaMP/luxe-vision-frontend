import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import ApiService from "@/services/studios";
import { selectFavoritesIds } from '@/reducers/studioSelector.ts';

const useRandomStudios = () => {
  const dispatch = useDispatch<AppDispatch>();
  const favoriteIds = useSelector(selectFavoritesIds);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setStatus("loading");
      try {
        const result = await ApiService.getStudiosRandom();
        const enrichedData = result.data.map((studio: any) => ({
          ...studio,
          isFavorite: favoriteIds.includes(studio.id),
        }));
        setData(enrichedData);
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
