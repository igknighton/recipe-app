import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import useApi from "../hooks/useApi";
import { useNavigate } from "react-router-dom";

const Recipe = () => {

    const {id} = useParams();
    const {loadMeal} = useApi();

    const [meal,setMeal] = useState({});
    const [ingredients,setIngredients] = useState([]);

    const navigate = useNavigate();

    /**
     * @desc parses ingredients from the meal object
     * @param mealObj
     */
    const parseIngredients = mealObj => {

        let ingredients = [];
        let measurements = [];
        let res = [];
        // desired format: strIngredient (strMeasure)

        let cnt = 0;

        //filter ingredients
        Object.keys(mealObj).forEach(function(key,index) {
            if (key.includes("Ingredient") && mealObj[key].trim() !== '') {
                ingredients[cnt] = mealObj[key].trim();
                cnt++;
            }
        });

        cnt = 0;

        // filter measurements
        Object.keys(mealObj).forEach(function(key) {
            if (key.includes("Measure") && mealObj[key].trim() !== '') {
                measurements[cnt] = mealObj[key].trim();
                cnt++;
            }
        });

        for (let i = 0; i < ingredients.length; i++) {
            res[i] = {
                ingredient: ingredients[i],
                measurement: measurements[i]
            }
        }
        setIngredients(res);
    }


    const goBack = () => {
        navigate('/')
    }

    useEffect(() => {
        loadMeal(id).then(res => {
            const meal = res.data.meals;
            if (meal) {
                parseIngredients(meal[0])
                setMeal(meal[0]);
            } else {
                setMeal(meal);
            }
        }
        ).catch(e => console.error("Error loading meal",e))
    },[]);

    return (
        <div className={'mealContainer'}>
            {
                meal ?
                    <>
                        <h1 className={'mealTitle'}>{meal.strMeal}</h1>
                        <h2 className={'category'}>Category: {meal.strCategory}</h2>
                        <div className={'mealImage'}>
                            <img src={meal.strMealThumb} alt=""/>
                        </div>
                        <ul className={'mealIngredients'}>
                            {ingredients.map(i => (
                                <li key={i.ingredient}>
                                    {i.ingredient} <b>({i.measurement})</b>
                                </li>
                            ))}
                        </ul>
                        <p className={'mealInstructions'}>{meal.strInstructions}</p>
                        <div className={'backButton'} onClick={goBack}>Back</div>
                    </> :
                <h1 className={'mealTitle'}>
                    Recipe not found
                </h1>
            }
        </div>
    );
};

export default Recipe;
