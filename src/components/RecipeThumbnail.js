import React from 'react';

const RecipeThumbnail = ({name,imgUrl}) => {

    const thumbNail = {
        backgroundImage: `url(${imgUrl})`,
        backgroundSize:'cover'
    }
    return (
        <div className={'recipeThumbnail'} style={thumbNail}>
            <div className={'thumbnailTitle'}>
                {name}
            </div>
        </div>
    );
};

export default RecipeThumbnail;
