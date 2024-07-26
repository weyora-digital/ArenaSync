import { useNavigate } from 'react-router-dom';

// local imports
import { ICONS, IMAGES } from '../../constants';

const GameCard = ({ card }) => {
    const navigate = useNavigate();

    const handlePageChange = () => {
        navigate(card.path);
    };

    return (
        <div className="flex flex-shrink-0 flex-col w-[280px] align-center p-3 rounded-lg ring-1 ring-inactive-text bg-secondary-dark">
            <img src={card.banner} alt="game-banner" className="rounded-md" />
            <div className="relative">
                <div className="absolute flex items-center gap-2 py-1 pl-3 pr-4 bg-black rounded-full -top-3 left-5 ring-1 ring-inactive-text">
                    <img src={card.logo} alt="game-logo" className="w-3 h-3" />
                    <p className="text-xs">{card.game}</p>
                </div>
            </div>
            <div className="flex flex-col gap-3 px-3 mt-6 mb-1">
                <p className="text-sm">{card.date}</p>
                <p className="font-semibold">{card.title}</p>
                <p className="text-sm">{card.description}</p>
                <div className="flex justify-between mt-1">
                    <div className="">
                        <p className="mb-1 text-sm text-inactive-text">Win Price</p>
                        <div className="flex gap-2">
                            <img src={IMAGES.trophy} alt="trophy" className="w-6 h-6" />
                            <p className="font-semibold">{card.winPrice}</p>
                        </div>
                    </div>
                    <div className="">
                        <p className="mb-1 text-sm text-inactive-text">Player Slot</p>
                        <div className="flex gap-2">
                            <img src={IMAGES.users} alt="players" className="w-6 h-6" />
                            <p className="font-semibold">{card.playerSlot}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div
                            onClick={handlePageChange}
                            className="p-2 rounded-full cursor-pointer bg-secondary group hover:ring-1 hover:ring-inactive-text"
                        >
                            <ICONS.NextArrow className="w-5 h-5 fill-primary-text group-hover:stroke-2 group-hover:stroke-primary-text" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameCard;
