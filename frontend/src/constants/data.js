import { IMAGES } from './images';
import { ICONS } from './icons';

const heroSlides = [
    {
        title: 'ARENASL COMMUNITY SERIES',
        subtitle: 'HALO - 2',
        description: `Halo 2 is a 2004 first-person shooter game developed by Bungie and published by Microsoft Game Studios for the Xbox console. Halo 2 is the second installment in the Halo franchise and the sequel to 2001's critically acclaimed Halo: Combat Evolved.`,
        image: IMAGES.shooter,
        onClick: () => {},
    },
    {
        title: 'This is the slide two...!',
        subtitle: 'HALO - 2',
        description: `Halo 2 is a 2004 first-person shooter game developed by Bungie and published by Microsoft Game Studios for the Xbox console. Halo 2 is the second installment in the Halo franchise and the sequel to 2001's critically acclaimed Halo: Combat Evolved.`,
        image: IMAGES.shooter,
        onClick: () => {},
    },
    {
        title: 'Sample Slide 03',
        subtitle: 'HALO - 2',
        description: `Halo 2 is a 2004 first-person shooter game developed by Bungie and published by Microsoft Game Studios for the Xbox console. Halo 2 is the second installment in the Halo franchise and the sequel to 2001's critically acclaimed Halo: Combat Evolved.`,
        image: IMAGES.shooter,
        onClick: () => {},
    },
];

const gameCards = [
    {
        id: 1,
        banner: IMAGES.callOfDutyBanner,
        logo: IMAGES.callOfDutyLogo,
        title: 'Call Of Duty Warzone Mobile',
        game: 'Call of Duty',
        date: '21 fab-6 Mar, 08:00 PM',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
        winPrice: '28k LKR',
        playerSlot: '4v4',
        path: '/game',
    },
    {
        id: 1,
        banner: IMAGES.callOfDutyBanner,
        logo: IMAGES.callOfDutyLogo,
        title: 'Call Of Duty Warzone Mobile',
        game: 'Call of Duty',
        date: '21 fab-6 Mar, 08:00 PM',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
        winPrice: '28k LKR',
        playerSlot: '4v4',
        path: '/game',
    },
    {
        id: 1,
        banner: IMAGES.callOfDutyBanner,
        logo: IMAGES.callOfDutyLogo,
        title: 'Call Of Duty Warzone Mobile',
        game: 'Call of Duty',
        date: '21 fab-6 Mar, 08:00 PM',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
        winPrice: '28k LKR',
        playerSlot: '4v4',
        path: '/game',
    },
    {
        id: 1,
        banner: IMAGES.callOfDutyBanner,
        logo: IMAGES.callOfDutyLogo,
        title: 'Call Of Duty Warzone Mobile',
        game: 'Call of Duty',
        date: '21 fab-6 Mar, 08:00 PM',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
        winPrice: '28k LKR',
        playerSlot: '4v4',
        path: '/game',
    },
    {
        id: 1,
        banner: IMAGES.callOfDutyBanner,
        logo: IMAGES.callOfDutyLogo,
        title: 'Call Of Duty Warzone Mobile',
        game: 'Call of Duty',
        date: '21 fab-6 Mar, 08:00 PM',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
        winPrice: '28k LKR',
        playerSlot: '4v4',
        path: '/game',
    },
    {
        id: 1,
        banner: IMAGES.callOfDutyBanner,
        logo: IMAGES.callOfDutyLogo,
        title: 'Call Of Duty Warzone Mobile',
        game: 'Call of Duty',
        date: '21 fab-6 Mar, 08:00 PM',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
        winPrice: '28k LKR',
        playerSlot: '4v4',
        path: '/game',
    },
    {
        id: 1,
        banner: IMAGES.callOfDutyBanner,
        logo: IMAGES.callOfDutyLogo,
        title: 'Call Of Duty Warzone Mobile',
        game: 'Call of Duty',
        date: '21 fab-6 Mar, 08:00 PM',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
        winPrice: '28k LKR',
        playerSlot: '4v4',
        path: '/game',
    },
];

const footerSections = [
    {
        title: 'Navigate',
        items: [
            {
                icon: ICONS.Home,
                text: 'Home',
                path: '/',
            },
            {
                icon: ICONS.Settings,
                text: 'Leaderboard',
                path: '/leaderboard',
            },
            {
                icon: ICONS.Clan,
                text: 'Giveaway',
                path: '/giveaway',
                chip: 'Soon',
            },
            {
                icon: ICONS.Tournaments,
                text: 'Tournament',
                path: '/tournament',
            },
            {
                icon: ICONS.NextArrow,
                text: '50% off For 1 year',
                path: '/discount',
            },
        ],
    },
    {
        title: 'Placeholder',
        items: [
            {
                icon: ICONS.Home,
                text: 'Rewards',
                path: '/',
            },
            {
                icon: ICONS.Settings,
                text: 'Subscription',
                path: '/leaderboard',
            },
            {
                icon: ICONS.Clan,
                text: 'Installed Games',
                path: '/giveaway',
            },
        ],
    },
    {
        title: 'Get Help',
        items: [
            {
                icon: ICONS.Home,
                text: 'FAQ',
                path: '/',
            },
        ],
    },
];

export const DATA = {
    heroSlides,
    gameCards,
    footerSections,
};
