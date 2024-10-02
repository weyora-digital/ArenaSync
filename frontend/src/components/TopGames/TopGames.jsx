import React from "react";
import valorant from "../../assets/images/Games/Valvarent.jpg";
import pubg from "../../assets/images/Games/pubg.jpg";
import cod from "../../assets/images/Games/callofduty.png";
import rocketLeague from "../../assets/images/Games/dota.jpg";
import dota2 from "../../assets/images/Games/rocektleague.jpg";
import mobileLegends from "../../assets/images/Games/mobilelegend.jpg";
import clashRoyale from "../../assets/images/Games/clashroyal.jpg";
// import "./TopGames.scss";
import GameCard from "../GameCard/GameCard";

function TopGames() {
  const games = [
    { name: "Valorant", img: valorant },
    { name: "PUBG Mobile", img: pubg },
    { name: "Call of Duty Mobile", img: cod },
    { name: "Rocket League", img: rocketLeague },
    { name: "Dota 2", img: dota2 },
    { name: "Mobile Legends", img: mobileLegends },
    { name: "Clash Royale", img: clashRoyale },
  ];

  return (
    <section className="top-games bg-primary_bg py-20">
      <div className="mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary_text mb-6">
          <span className="text-primary_text border-l-4 border-blue-500 pl-2">
            TOP GAMES
          </span>
        </h2>
        <div className="flex flex-row space-x-7 justify-center ">
          {games.map((game, index) => (
            <GameCard key={index} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TopGames;

{
  /* <ul className="games-list flex space-x-4">
  <li className="game-card">
    <img src={valorant} alt="Valorant" className="game-image" />
  </li>
  <li className="game-card"></li>
  <li className="game-card">
    <img src={cod} alt="Call of Duty Mobile" className="game-image" />
  </li>
  <li className="game-card">
    <img
      src={rocketLeague}
      alt="Rocket League"
      className="game-image"
    />
  </li>
  <li className="game-card">
    <img src={dota2} alt="Dota 2" className="game-image" />
  </li>
  <li className="game-card">
    <img
      src={mobileLegends}
      alt="Mobile Legends"
      className="game-image"
    />
  </li>
  <li className="game-card">
    <img src={clashRoyale} alt="Clash Royale" className="game-image" />
  </li>
</ul> */
}
