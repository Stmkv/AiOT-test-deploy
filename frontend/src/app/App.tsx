import React from 'react';
import { HomePages } from '../pages/Home/HomePages';
import { ToastProvider } from '../app/providers/ToastProvider';

export const App: React.FC = () => {

  return (
    <>
      <HomePages />
      <ToastProvider />
    </>
  );
};
