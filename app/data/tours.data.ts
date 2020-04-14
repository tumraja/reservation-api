import { Tour } from "../model/tour";

export const TOURS: Tour[] = [
    {
        id: 1,
        name: '7 Days Mount Kilimanjaro Trekking - Lemosho Route',
        description: 'This is a lesser known route which usually begins on the western side of Mount Kilimanjaro. Lemosho route is one of the newer routes on the mountain, and a superb choice for your climb. It is our preferred route due to its ideal balance of low traffic, beautiful scenery and a high summit success rate. Most of our clients use this route and love it',
        price: '$200',
        duration: '5 days',
        operatorId: 1,
        size:  10,
        image: 'https://images.unsplash.com/photo-1431727499043-70167d3d8c90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1711&q=80',
        include: [
            'Free Cancellation',
            'Free meal'
        ]
    },
    {
        id: 2,
        name: '10 Days Mount Kilimanjaro Trekking - Ngorongoro Route',
        description: 'This is a lesser known route which usually begins on the western side of Mount Kilimanjaro. Lemosho route is one of the newer routes on the mountain, and a superb choice for your climb. It is our preferred route due to its ideal balance of low traffic, beautiful scenery and a high summit success rate. Most of our clients use this route and love it',
        price: '$400',
        duration: '10 days',
        operatorId: 1,
        size:  10,
        image: 'https://images.unsplash.com/photo-1431727499043-70167d3d8c90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1711&q=80',
        include: [
            'Free Cancellation'
        ]
    },
    {
        id: 3,
        name: '10 Days Mount Kilimanjaro Trekking - Machame Route',
        description: 'This is a lesser known route which usually begins on the western side of Mount Kilimanjaro. Lemosho route is one of the newer routes on the mountain, and a superb choice for your climb. It is our preferred route due to its ideal balance of low traffic, beautiful scenery and a high summit success rate. Most of our clients use this route and love it',
        price: '$400',
        duration: '10 days',
        operatorId: 2,
        size:  10,
        image: 'https://images.unsplash.com/photo-1431727499043-70167d3d8c90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1711&q=80',
        include: [
            'Free Cancellation'
        ]
    }
];