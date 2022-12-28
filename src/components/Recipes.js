import React, {useState} from 'react';
import RecipeThumbnail from "./RecipeThumbnail";
import useApi from "../hooks/useApi";
const Recipes = () => {

    const [recipes,setRecipes] = useState([]);

    const {searchMeals} = useApi();
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

    return (
        <>
            <form className={'searchBar'} onSubmit={handleSearch}>
                <input type="text"/>
                <input type="submit" value={'Search'}/>
            </form>
            <div className={'recipeContainer'}>
                {
                    recipes === null ?
                        <div className={'notFound'}>Recipes not found</div> :
                    recipes.map(r =>
                        <RecipeThumbnail key={r.idMeal} name={r.strMeal} imgUrl={r.strMealThumb}/>
                    )
                }
            </div>
        </>
    );
};

export default Recipes;
