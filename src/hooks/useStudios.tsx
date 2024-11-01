// src/hooks/useStudios.js
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudios } from '../reducers/studioSlice';

const useStudios = () => {
  const dispatch = useDispatch();

  const { studios, status, error } = useSelector((state) => state.studios);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStudios());
    }
  }, [status, dispatch]);

  return { studios, status, error };
};

export default useStudios;
