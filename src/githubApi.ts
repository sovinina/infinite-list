import axios from 'axios';
import { SearchResponse } from './types';

const API_URL = 'https://api.github.com/search/repositories';

const fetchRepos = async (page: number): Promise<SearchResponse> => {
    try {
        const { data } = await axios.get<SearchResponse>(API_URL, {
            params: { 
                q: 'javascript', 
                sort: 'stars', 
                order: 'asc', 
                page 
            },
        });
        return data;
    } 
    catch (err) {
        console.error("API Error:", err);
        throw err;
    }
};

export default fetchRepos;
