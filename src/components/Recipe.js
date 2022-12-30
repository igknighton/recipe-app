import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import useApi from "../hooks/useApi";
import { useNavigate } from "react-router-dom";

const Recipe = () => {

    const {id} = useParams();
    const {loadMeal} = useApi();

    const [meal,setMeal] = useState(null);
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
                            <img className={'imgBorder'} src={meal.strMealThumb} alt={meal.strMeal ?? 'meal'}/>
                        </div>
                        <div className="mealIngredients">
                            <div className={'ingredientsHeader'}>Ingredients</div>
                            <ul className={'ingredientsList'}>
                                {ingredients.map(i => (
                                    <li key={i.ingredient + '-' + i.measurement}>
                                        {i.ingredient} <b>({i.measurement})</b>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mobileIngredients">
                            <h1 className={'mobileHeader'}>Ingredients</h1>
                            <ul className={'ingredientsList'}>
                                {ingredients.map(i => (
                                    <li key={i.ingredient + '-' + i.measurement}>
                                        {i.ingredient} <b>({i.measurement})</b>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={'mealInstructions'}>
                            <h1>Instructions</h1>
                            <p>{meal.strInstructions}</p>
                        </div>
                        <div className={'backButton searchByBtn'} onClick={goBack}>
                            Back
                        </div>
                    </> :
                <h1 className={'mealTitle'}>
                    Recipe not found
                </h1>
            }
        </div>
    );
}

export default Recipe;
