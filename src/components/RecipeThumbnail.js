import React from 'react';
import {Link} from "react-router-dom";

const RecipeThumbnail = ({name,imgUrl,mealId}) => {

    const thumbnail = {
        backgroundImage: `url(${imgUrl})`,
        backgroundSize:'cover'
    }

    return (
        <Link className={'recipeLink'} to={`/${mealId}`}>
            <div className={'recipeThumbnail'} style={thumbnail}>
                <div className="thumbnailBackground">
                    <div className={'thumbnailTitle'}>
                        {name}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default RecipeThumbnail;
