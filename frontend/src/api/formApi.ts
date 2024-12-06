import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL });

export const createForm = (formData: any) => API.post('/api/forms', formData);
export const getForm = (id: string) => API.get(`/api/forms/${id}`);
export const submitResponse = (id: string, responses: any) => API.post(`/api/forms/${id}/response`, { responses });
