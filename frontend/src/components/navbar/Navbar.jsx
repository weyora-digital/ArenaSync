import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// local imports
import { ICONS, IMAGES } from '../../constants';

const Navbar = () => {
    const navigate = useNavigate();
    const [selectedPage, setSelectedPage] = useState('Home');

    const items = [
        {
            icon: ICONS.Home,
            text: 'Home',
            path: '/',
        },
        {
            icon: ICONS.Tournaments,
            text: 'Tournaments',
            path: '/tournaments',
        },
        {
            icon: ICONS.Clan,
            text: 'Organization & Clans',
            path: '/clans',
        },
    ];

    const handlePageChange = (page) => {
        if (page.text !== selectedPage) {
            setSelectedPage(page.text);
            navigate(page.path);
        }
    };

    return (
        <div className="sticky top-0 z-10 h-[100px] py-4 px-10 items-center border-b-2 border-b-inactive-text grid grid-cols-[0.5fr_1fr_0.5fr]">
            <img src={ICONS.logo} alt="logo" />
            <div className="flex items-center justify-between uppercase">
                {items.map((item) => (
                    <div
                        key={item.text}
                        className={`flex items-center gap-3 cursor-pointer hover:text-primary-text group
                        ${selectedPage === item.text ? 'text-primary-text font-semibold' : 'text-inactive-text'}`}
                        onClick={() => handlePageChange(item)}
                    >
                        <item.icon
                            className={`w-5 h-5 group-hover:fill-primary-text
                                ${selectedPage === item.text ? 'fill-primary-text' : 'fill-inactive-text'}
                            `}
                        />
                        <p>{item.text}</p>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-end gap-4">
                <img src={IMAGES.avatar} alt="avatar" className="w-12 h-12" />
                <div className="flex flex-col">
                    <p>John Doe</p>
                    <p className="text-sm text-inactive-text">Level 15</p>
                </div>
                <ICONS.Settings
                    className={`w-8 h-8 ml-5 fill-inactive-text hover:fill-primary-text cursor-pointer`}
                />
            </div>
        </div>
    );
};

export default Navbar;
