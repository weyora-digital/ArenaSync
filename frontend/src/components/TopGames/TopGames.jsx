import React from "react";
import valorant from "../../assests/images/Games/Valvarent.jpg";
import pubg from "../../assests/images/Games/pubg.jpg";
import cod from "../../assests/images/Games/callofduty.png";
import rocketLeague from "../../assests/images/Games/dota.jpg";
import dota2 from "../../assests/images/Games/rocektleague.jpg";
import mobileLegends from "../../assests/images/Games/mobilelegend.jpg";
import clashRoyale from "../../assests/images/Games/clashroyal.jpg";
import "./TopGames.scss";

function TopGames() {
  //   const games = [
  //     { name: 'Valorant', img: valorant },
  //     { name: 'PUBG Mobile', img: pubg },
  //     { name: 'Call of Duty Mobile', img: cod },
  //     { name: 'Rocket League', img: rocketLeague },
  //     { name: 'Dota 2', img: dota2 },
  //     { name: 'Mobile Legends', img: mobileLegends },
  //     { name: 'Clash Royale', img: clashRoyale },
  //   ];

  return (
    <section className="top-games py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-6">
          <span className="text-white-500 border-l-4 border-blue-500 pl-2">TOP GAMES</span>
        </h2>
        {/* Use ul and li for horizontal list */}
        <ul className="games-list flex space-x-4">
          <li className="game-card">
            <img src={valorant} alt="Valorant" className="game-image" />
          </li>
          <li className="game-card">
            <img src={pubg} alt="PUBG Mobile" className="game-image" />
          </li>
          <li className="game-card">
            <img src={cod} alt="Call of Duty Mobile" className="game-image" />
          </li>
          <li className="game-card">
            <img src={rocketLeague} alt="Rocket League" className="game-image" />
          </li>
          <li className="game-card">
            <img src={dota2} alt="Dota 2" className="game-image" />
          </li>
          <li className="game-card">
            <img src={mobileLegends} alt="Mobile Legends" className="game-image" />
          </li>
          <li className="game-card">
            <img src={clashRoyale} alt="Clash Royale" className="game-image" />
          </li>
        </ul>
      </div>
    </section>
  );
}

export default TopGames;
