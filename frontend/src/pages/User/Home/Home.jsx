import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import TopGames from '../../../components/TopGames/TopGames';
import UpcomingChallenges from '../../../components/UpcommingChallenges/UpcomingChallenges';
import Footer from '../../../components/Footer/Footer';

const Home = () => {
  return (
    <div className="home bg-background text-center p-12">
      <Navbar />
      <TopGames/>
      <UpcomingChallenges/>
      <Footer/>
    </div>
  );
};

export default Home;
