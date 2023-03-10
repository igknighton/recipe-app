import {useState} from 'react';
import axios from "axios";
const useApi = () => {

    const StatusTypes = {
        IDLE : 'IDLE',
        PENDING: 'PENDING',
        REJECTED: 'REJECTED',
        RESOLVED: 'RESOLVED'
    };
    const [status, setStatus] = useState(StatusTypes.IDLE);

    const api = async query => {
        setStatus(StatusTypes.PENDING);
        return await axios.get(`https://www.themealdb.com/api/json/v1/1/${query}`);
    }


    const searchMeals = async term => {
        return await api(`search.php?s=${term}`);
    }

    const loadMeal = async mealId => {
        return await api(`lookup.php?i=${mealId}`);
    }


    const searchCategory = async category => {
        const res = await api(`filter.php?c=${category}`)
        return res.data.meals;
    }

    const searchRegion = async region => {
        const res = await api(`filter.php?a=${region}`);
        return res.data.meals;
    }

    const listCategories = async () => {
        const res = await api(`list.php?c=list`);
        return res.data.meals;
    }

    const listRegions = async () => {
        const res = await api(`list.php?a=list`);
        return res.data.meals;
    }

    return {
        status,
        setStatus,
        StatusTypes,
        searchMeals,
        loadMeal,
        searchCategory,
        searchRegion,
        listRegions,
        listCategories
    };
};

export default useApi;
