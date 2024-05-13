import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://swapi.dev/api/', // Altere para a URL base da sua API
  timeout: 5000, // Tempo limite de 5 segundos para as requisições
});

export default Api;
