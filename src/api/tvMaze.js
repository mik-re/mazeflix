import axios from 'axios';

axios.defaults.baseURL = 'https://api.tvmaze.com';

const searchShow = query => {
    return axios.get(`/search/shows?q=${query}`).then(response => response.data);
}

const getShowFeed = () => {
    return axios.get(`/shows`).then(response => response.data);
}

const getShowById = id => {
    return axios.get(`/shows/${id}`).then(response => response.data);
}


export default {
    searchShow,
    getShowFeed,
    getShowById
}