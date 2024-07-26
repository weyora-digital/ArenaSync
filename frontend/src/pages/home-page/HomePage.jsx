import { useEffect, useState, useRef } from 'react';

// local imports
import { GameCard, Slide } from '../../components';
import { ICONS, DATA } from '../../constants';

const HomePage = () => {
    const scrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % DATA.heroSlides.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const handleScroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === 'left' ? 300 : -300,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="z-10 flex flex-col flex-grow w-11/12 gap-8 mx-auto my-10">
            <div className="relative h-[320px] overflow-x-clip">
                <div
                    className="relative flex w-full h-full transition-transform duration-1000 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                >
                    {DATA.heroSlides.map((slide, index) => (
                        <Slide key={index} slide={slide} show={index === currentIndex} />
                    ))}
                </div>
                <div className="absolute flex items-center justify-center w-full gap-2 bottom-3">
                    {DATA.heroSlides.map((_, index) => (
                        <div
                            key={index}
                            className={`${currentIndex === index ? 'w-4' : 'w-1'} h-1 bg-white rounded-full transition-all duration-500 ease-in-out`}
                        ></div>
                    ))}
                </div>
            </div>
            <div className="">
                <p className="text-sm uppercase tracking-subtitle">Trending</p>
                <div className="flex items-end justify-between mt-1 mb-5">
                    <h2 className="text-2xl font-semibold">{`Upcoming Match's`}</h2>
                    <div className="flex gap-5">
                        <div className="group" onClick={() => handleScroll('right')}>
                            <ICONS.LeftArrow className="cursor-pointer w-7 h-7 fill-inactive-text group-hover:fill-secondary" />
                        </div>
                        <div className="group" onClick={() => handleScroll('left')}>
                            <ICONS.RightArrow className="cursor-pointer w-7 h-7 fill-inactive-text group-hover:fill-secondary" />
                        </div>
                    </div>
                </div>
                <div
                    ref={scrollRef}
                    className="flex gap-5 p-1 overflow-x-auto scrollbar-hide scroll-smooth"
                    style={{ scrollSnapType: 'x mandatory' }}
                >
                    {DATA.gameCards.map((card, index) => (
                        <GameCard key={index} card={card} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
