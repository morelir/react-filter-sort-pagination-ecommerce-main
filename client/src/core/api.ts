import axios from 'axios';
import { QueryClient } from 'react-query';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

const queryClient = new QueryClient();

export { apiClient, queryClient };
