import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomStudios } from '@/reducers/studioSlice';
import { selectFavoritesIds } from '@/reducers/studioSelector.ts';

const useRandomStudios = () => {
  const dispatch = useDispatch();
  const favoriteIds = useSelector(selectFavoritesIds);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setStatus('loading');
      try {
        const result = await dispatch(fetchRandomStudios()).unwrap();
        const enrichedData = result.map((studio: any) => ({
          ...studio,
          isFavorite: favoriteIds.includes(studio.id),
        }));

        setData(enrichedData);
        // setData(result);
        setStatus('succeeded');
      } catch (err) {
        setError(err.message);
        setStatus('failed');
      }
    };

    fetchData();
  }, [dispatch]);

  return { data, status, error };
};

export default useRandomStudios;
