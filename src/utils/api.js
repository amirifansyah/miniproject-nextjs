import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Update ini dengan URL dasar API Anda
});

// Anda bisa menambahkan interceptor di sini jika diperlukan

export default api;
