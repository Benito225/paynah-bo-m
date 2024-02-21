'use client';
import React from 'react';
import { Next13ProgressBar } from 'next13-progressbar';

const NavigationLoadingProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
            <Next13ProgressBar height="3px" color="#000" options={{ showSpinner: true }} showOnShallow />
        </>
    );
};

export default NavigationLoadingProviders;