import React from 'react';
import background from './images/city_background.png';

function TitleCard() {
    const title = {
        width: '100vw', // 100% of the viewport width
        height: '100vh', // 100% of the viewport height
        backgroundImage: {background},
        backgroundSize: 'cover',

    };

    return(
        <div style={title}></div>
    )
}

export default TitleCard