import React, {useEffect, useState} from 'react';
import RecipeThumbnail from "./RecipeThumbnail";
import useApi from "../hooks/useApi";
import {logDOM} from "@testing-library/react";
const Recipes = () => {

    const [recipes,setRecipes] = useState([]);
    const [searchOption,setSearchOption] = useState(2);
        const {
        searchMeals,
        searchRegion,
        searchCategory,
        listCategories,
        listRegions
    } = useApi();

    const handleSearch = async e => {
        try {
            e.preventDefault();
            const searchKeyword = e.target.elements[0].value;
            const res = await searchMeals(searchKeyword);
            setRecipes(res.data.meals);
        } catch (e) {
            console.error("An Error Occurred",e);
        }
    }


    const [categories, setCategories] = useState([]);
    const [selectedCat,setSelectedCat] = useState('')
    const handleCategory = e => setSelectedCat(e.target.value);

    const searchByCategory = async e => {
        try {
            e.preventDefault();
            const meals = await searchCategory(selectedCat);
            setRecipes(meals);
        } catch (e) {
            console.error('An Error Occurred', e);
        }
    }

    useEffect(() => {
        listCategories().then(
            categories => setCategories(categories)
        );
    }, []);


    const KeywordSearch = () => {
        return <form className={'searchBar'} onSubmit={handleSearch}>
            <input type="text"/>
            <input type="submit" value={'Search'}/>
        </form>
    }

    const [regions,setRegions] = useState([]);
    const [selectedRegion,setSelectedRegion] = useState('');

    const handleRegion = e => setSelectedRegion(e.target.value);

    const searchByRegion = async e => {
        try {
            e.preventDefault();
            const meals = await searchRegion(selectedRegion);
            setRecipes(meals);
        } catch (e) {
            console.error('An Error Occurred',e);
        }
    }

    useEffect(() => {
        listRegions().then(
            regions => setRegions(regions)
        )
    },[]);

    return (
        <>
            <div className="searchBy">
                <h3>Select a search option: </h3>
                <div className="searchByButtons">
                    <div onClick={() =>setSearchOption(1)} className="searchByBtn">Keyword</div>
                    <div onClick={() =>setSearchOption(3)} className="searchByBtn">Category</div>
                    <div onClick={() =>setSearchOption(2)} className="searchByBtn">Region</div>
                </div>
            </div>
            { searchOption === 1 && <KeywordSearch/> }
            { searchOption === 2 && <form className={'searchBar'} onSubmit={searchByRegion}>
                <label htmlFor="region">Region:</label>
                <select name="region" id="region" onChange={handleRegion}>
                    {
                        regions.map(region => (
                            <option
                                value={region.strArea}
                                key={region.strArea}>
                                {region.strArea}
                            </option>
                        ))
                    }
                </select>
                <input type="submit" value={'Search'}/>
            </form>
            }
            { searchOption === 3 && <form className={'searchBar'} onSubmit={searchByCategory}>
                <label htmlFor="category">Category:</label>
                <select name="category" id="category" onChange={handleCategory}>
                    {
                        categories.map(category => (
                            <option
                                value={category.strCategory}
                                key={category.strCategory}>
                                {category.strCategory}
                            </option>
                        ))
                    }
                </select>
                <input type="submit" value={'Search'}/>
            </form>
            }
            <div className={'recipeContainer'}>
                {
                    recipes === null ?
                        <div className={'notFound'}>Recipes not found</div> :
                    recipes.map(r =>
                        <RecipeThumbnail
                            key={r.idMeal}
                            name={r.strMeal}
                            imgUrl={r.strMealThumb}
                            mealId={r.idMeal}
                        />
                    )
                }
            </div>
        </>
    );
};

export default Recipes;
