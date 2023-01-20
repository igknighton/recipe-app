import React, {useEffect, useState} from 'react';
import RecipeThumbnail from "./RecipeThumbnail";
import useApi from "../hooks/useApi";
import {logDOM} from "@testing-library/react";
const Recipes = () => {

    const [recipes,setRecipes] = useState([]);
    const [searchOption,setSearchOption] = useState(1);
    const {
        searchMeals,
        searchRegion,
        searchCategory,
        listCategories,
        listRegions,
        setStatus,
        status,
        StatusTypes
    } = useApi();

    const {REJECTED,RESOLVED,IDLE,PENDING} =StatusTypes;
    const handleRecipes = meals => {
        setRecipes(meals);
        setStatus(RESOLVED);
    }
    const handleSearch = async e => {
        try {
            e.preventDefault();
            const searchKeyword = e.target.elements[0].value;
            const res = await searchMeals(searchKeyword);
            handleRecipes(res.data.meals);
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
            handleRecipes(meals);
        } catch (e) {
            console.error('An Error Occurred', e);
        }
    }

    useEffect(() => {
        listCategories().then(
            categories => {
                setCategories(categories);
                setStatus(RESOLVED);
            }
        );
    }, []);


    const KeywordSearch = () => {
        return <form className={'searchBar'} onSubmit={handleSearch}>
            <input className={'searchInputText'} type="text"/>
            <input className={'searchByBtn searchInputBtn'} type="submit" value={'Search'}/>
        </form>
    }

    const [regions,setRegions] = useState([]);
    const [selectedRegion,setSelectedRegion] = useState('');

    const handleRegion = e => setSelectedRegion(e.target.value);

    const searchByRegion = async e => {
        try {
            e.preventDefault();
            const meals = await searchRegion(selectedRegion);
            handleRecipes(meals);
        } catch (e) {
            console.error('An Error Occurred',e);
        }
    }

    useEffect(() => {
        listRegions().then(
            regions => {
                setRegions(regions);
                setStatus(RESOLVED);
            }
        )
    },[]);

    return (
        <>
            <div className="searchBy">
                <h3>Search By: </h3>
                <div className="searchByButtons">
                    <div onClick={() =>setSearchOption(1)} className="searchByBtn">Keyword</div>
                    <div onClick={() =>setSearchOption(3)} className="searchByBtn">Category</div>
                    <div onClick={() =>setSearchOption(2)} className="searchByBtn">Region</div>
                </div>
            </div>
            { searchOption === 1 && <KeywordSearch/> }
            { searchOption === 2 && <form className={'searchBar'} onSubmit={searchByRegion}>
                <label htmlFor="region"><b>Region:</b></label>
                <select className={'searchInputText'} name="region" id="region" onChange={handleRegion}>
                    {
                        regions.map(region => (
                            <option
                                value={region.strArea}
                                key={region.idMeal}>
                                {region.strArea}
                            </option>
                        ))
                    }
                </select>
                <input className={'searchByBtn searchInputBtn'} type="submit" value={'Search'}/>
            </form>
            }
            { searchOption === 3 && <form className={'searchBar'} onSubmit={searchByCategory}>
                <label htmlFor="category"><b>Category:</b></label>
                <select className={'searchInputText'} name="category" id="category" onChange={handleCategory}>
                    {
                        categories.map(category => (
                            <option
                                value={category.strCategory}
                                key={category.idMeal}>
                                {category.strCategory}
                            </option>
                        ))
                    }
                </select>
                <input className={'searchByBtn searchInputBtn'} type="submit" value={'Search'}/>
            </form>
            }
            <div className={'recipeContainer'}>
                {
                    status === PENDING && <h1>Loading...</h1>
                }
                {
                    status === RESOLVED && <>
                        {recipes === null ?
                            <div className={'notFound'}>
                                <h1>Recipes not found</h1>
                            </div> :
                            recipes.map(r =>
                                <RecipeThumbnail
                                    key={r.idMeal}
                                    name={r.strMeal}
                                    imgUrl={r.strMealThumb}
                                    mealId={r.idMeal}
                                />)
                        }
                    </>
                }
            </div>
        </>
    );
};

export default Recipes;
