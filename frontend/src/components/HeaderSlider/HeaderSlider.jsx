import React from 'react';
import Slider from 'react-slick';
import './HeaderSlider.scss'; // Custom styles for the slider
import banner1 from '../../assests/images/HeaderBanner/banner_01.jpg'; // Example image
import banner2 from '../../assests/images/HeaderBanner/banner_02.jpg'; // Example image
// import banner3 from '../../assets/images/HeaderBanner/banner3.jpg'; // Example image

function HeaderSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true
  };

  return (
    <div className="header-slider">
      <Slider {...settings}>
        <div className="slide">
          <img src={banner1} alt="Banner 1" />
          <div className="overlay">
            <h1>IGE Masters: South Asia - Honor of Kings</h1>
            <p>Introducing the IGE Masters: South Asia - Honor of Kings tournament! This exciting event features four regional qualifiers, where teams from across South Asia will battle it out for glory.</p>
            <button className="btn">Read More</button>
          </div>
        </div>
        <div className="slide">
          <img src={banner2} alt="Banner 2" />
          <div className="overlay">
            <h1>Gamer.LK Community Series - MK 1</h1>
            <p>Gamer.LK presents the Gamer.LK Community Series, a tournament series designed and launched by Sri Lanka to provide a platform for up-and-coming gamers from the country to compete and gain recognition. The Community Series was conceived by Gamer.LK with the aim of developing the grassroots, community-level Esports scene across the country by offering new and exciting opportunities for the next generation of gamers to showcase their skills in a competitive setting. Gamer.LK is excited to lead the drive to develop Esports in Sri Lanka as it looks ahead to its larger flagship events happening later in the year.</p>
            <button className="btn">Register Now</button>
          </div>
        </div>
        {/* <div className="slide">
          <img src={banner3} alt="Banner 3" />
          <div className="overlay">
            <h1>IGE MASTERS TOURNAMENT</h1>
            <p>Teams from South Asia competing for the championship</p>
            <button className="btn">Learn More</button>
          </div>
        </div> */}
      </Slider>
    </div>
  );
}

export default HeaderSlider;
