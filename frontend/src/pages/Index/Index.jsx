import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import HeaderSlider from "../../components/HeaderSlider/HeaderSlider";
import TopGames from "../../components/TopGames/TopGames";
import Footer from "../../components/Footer/Footer"
import UpcomingChallenges from "../../components/UpcommingChallenges/UpcomingChallenges";

function Index() {
  return (
    <div>
      <Navbar />
      <HeaderSlider />
      <TopGames />
      <UpcomingChallenges />
      <Footer />
    </div>
  );
}

export default Index;
