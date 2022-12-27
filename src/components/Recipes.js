import React from 'react';
import RecipeThumbnail from "./RecipeThumbnail";

const Recipes = () => {

    const recipes = [
        {name:'1',id:1},
        {name:'2',id:2},
        {name:'3',id:3},
        {name:'4',id:4},
        {name:'5',id:5},
    ];


    const handleSearch = e => {
        e.preventDefault();
        console.log("test");
    }

    return (
        <>
            <form className={'searchBar'} onSubmit={handleSearch}>
                <input type="text"/>
                <input type="submit" value={'Search'}/>
            </form>
            <div className={'recipeContainer'}>
                {
                    recipes.map(r => (
                        <RecipeThumbnail key={r.id} name={r.name}/>
                    ))
                }
            </div>
        </>
    );
};

export default Recipes;
