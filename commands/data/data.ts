export const TOURS = [
    {
        _id: 1,
        name: 'Tanzania Camping Safari',
        description: 'hthhjgjhjgh',
        price: '$500',
        size: 2,
        include: [
            'Meals',
            'Accommodation',
            'Sightseeing'
        ]
    },
    {
        _id: 2,
        name: '4 Day Tanzania Private Camping & Lodge Safari',
        description: 'yjhjkhjkl',
        price: '$2000',
        size: 2,
        include: [
            'Meals',
            'Accommodation',
            'Transport'
        ]
    },
    {
        _id: 3,
        name: '4 Day Zanzibar Beach Holiday Package',
        description: 'hjjghmmuh.',
        price: '$2000',
        size: 2,
        include: [
            'Meals',
            'Accommodation',
            'Transport'
        ]
    },
    {
        _id: 4,
        name: 'A Fantastic Tanzania Family Tour',
        description: 'ghgjhj g gfnnghmgh',
        price: '$2000',
        size: 2,
        include: [
            'Sightseeing',
            'Accommodation',
            'Breakfast'
        ]
    }
];


export const OPERATORS = [
    {
        _id: 1,
        name: 'Ukatimu Safaris and Tours',
        country: 'Tanzania',
        isVerified: true
    },
    {
        _id: 2,
        name: 'Masai guide safari',
        country: 'Tanzania',
        isVerified: true
    },
    {
        _id: 3,
        name: 'Timmo Tours',
        country: 'Tanzania',
        isVerified: false
    }
];

export const SESSIONS = [
];

export const USERS = [
    {
        _id: 1,
        name: 'User',
        email: 'user1@user.com',
        password: 'hashed-password',
        age: 20,
        bookings: []
    },
    {
        _id: 2,
        name: 'User2',
        email: 'user2@user.com',
        password: 'hashed-password',
        age: 15,
        bookings: [
            {
                _id: 1,
                tourId: 2, 
                email: 'tumsime@gmail.com',
                from: '2020-04-20T00:00:00.000+00:00',
                to: '2020-04-24T00:00:00.000+00:00',
                comment: 'comment',
            }
        ]
    }
];

