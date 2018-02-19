import axios from 'axios';
import { toast } from 'react-toastify';
import { alertError } from './../pages/alert';

const sessionToken = () => localStorage.getItem('sessionToken');
const header = () => (sessionToken() ? { headers: { Authorization: sessionToken() } } : {});

const AJAX = {
  async post(url, data) {
    const response = await axios.post(url, data, header()).catch((error) => {
    	alertError(error.message);
    });
    if (response) { return response.data; }
  },

  async get(url) {
    const response = await axios.get(url, header()).catch((error) => {
    	alertError(error.message);
    });
    if (response) { return response.data; }
  },
};

export default AJAX;
