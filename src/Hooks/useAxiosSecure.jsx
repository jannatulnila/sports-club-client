import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: 'https://sports-club-server-pied.vercel.app',
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  const auth = getAuth();

  axiosSecure.interceptors.request.use(
    async (config) => {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosSecure.interceptors.response.use(
    (res) => res,
    (error) => {
      const status = error.response?.status;
      if (status === 403) {
        navigate('/forbidden');
      } else if (status === 401) {
        logOut()
          .then(() => navigate('/login'))
          .catch(() => {});
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
