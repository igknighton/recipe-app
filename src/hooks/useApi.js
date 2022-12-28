import React from 'react';
import axios from "axios";

const useApi = () => {

    const api = async query => {
        return await axios.get(`https://www.themealdb.com/api/json/v1/1/${query}`);
    }


    const searchMeals = async term => {
        return await api(`search.php?s=${term}`);
    }

    const loadMeal = async mealId => {
        return await api(`lookup.php?i=${mealId}`);
    }

    return {
        searchMeals,
        loadMeal
    };
};

export default useApi;
