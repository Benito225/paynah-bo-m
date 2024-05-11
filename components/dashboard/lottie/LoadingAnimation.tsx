"use client"

import React from 'react';
import Lottie from 'react-lottie';
import loadingData from './loading-2.json';

const LoadingAnimation = (classItem: any) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    console.log(classItem);

    return (
        <div className={`h-[10rem] w-[10rem]`}>
            <Lottie options={defaultOptions} />
        </div>
    );
};

export default LoadingAnimation;
