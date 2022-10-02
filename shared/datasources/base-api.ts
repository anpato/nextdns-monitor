import Axios from 'axios';

export const NextDnsApi = Axios.create({
  baseURL: 'https://api.nextdns.io'
});

export const ClientApi = Axios.create({
  baseURL: '/api'
});
