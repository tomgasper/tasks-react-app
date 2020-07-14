import React from 'react';
import Lottie from 'react-lottie'


const HeaderIcon = ({height,width,data}) => {
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: data,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

    return(
           <Lottie options={defaultOptions}
              height={height}
              width={width}
              className='homescreen-header-icon'
                />
    )
}

export default HeaderIcon