import Axios from 'axios';

export const NextDnsApi = Axios.create({
  baseURL: 'https://api.nextdns.io',
  headers: {
    'X-Api-Key': process.env.NEXTDNS_API_KEY as string
  }
});

export const ClientApi = Axios.create({
  baseURL: '/api'
});
