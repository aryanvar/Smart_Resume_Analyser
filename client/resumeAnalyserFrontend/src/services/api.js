import axios from "axios";
const API_URL = "http://localhost:5000/api";

export const registerUser = (data) => axios.post(`${API_URL}/auth/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);
export const analyzeResume = (formData) => axios.post(`${API_URL}/resume/analyze`, formData, { headers: { "Content-Type": "multipart/form-data" } });
export const getHistory = () => axios.get(`${API_URL}/history`);