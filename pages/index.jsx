import React from 'react';
import Pages from '../src/templates/Pages';
import HomeLayout from '../src/components/organism/HomeLayout';

const Home = () => {
  return (
    <Pages>
      <h1>eFishery Task</h1>
      <HomeLayout />
    </Pages>
  );
};

export default Home;
