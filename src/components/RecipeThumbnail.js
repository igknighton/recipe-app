import React from 'react';

const RecipeThumbnail = ({name,imgUrl}) => {

    const thumbnail = {
        backgroundImage: `url(${imgUrl})`,
        backgroundSize:'cover'
    }

    return (
        <div className={'recipeThumbnail'} style={thumbnail}>
            <div className="thumbnailBackground">
                <div className={'thumbnailTitle'}>
                    {name}
                </div>
            </div>
        </div>
    );
};

export default RecipeThumbnail;
