module.exports = function () {
    return { 
        products: [
            { id: 1, name: "Kayak", category: "Watersports", 
                description: "A boat for one person", price: 275, releaseDate:  new Date()},    // UTC dátumok
            { id: 2, name: "Lifejacket", category: "Watersports", 
                description: "Protective and fashionable", price: 48.95,  releaseDate:  new Date().toISOString()},
            { id: 3, name: "Soccer Ball", category: "Soccer", 
                description: "FIFA-approved size and weight", price: 19.50,  releaseDate:  new Date().toISOString() },
            { id: 4, name: "Corner Flags", category: "Soccer", 
                description: "Give your playing field a professional touch", 
                price: 34.95, releaseDate:  new Date().toISOString()},
            { id: 5, name: "Stadium", category: "Soccer", 
                description: "Flat-packed 35,000-seat stadium", price: 79500 , releaseDate:  new Date().toISOString()},
            { id: 6, name: "Thinking Cap", category: "Chess", 
                description: "Improve brain efficiency by 75%", price: 16, releaseDate:  new Date().toISOString()},
            { id: 7, name: "Unsteady Chair", category: "Chess", 
                description: "Secretly give your opponent a disadvantage", 
                price: 29.95, releaseDate:  new Date().toISOString()},
            { id: 8, name: "Human Chess Board", category: "Chess", 
                description: "A fun game for the family", price: 75, releaseDate:  new Date().toISOString()},
            { id: 9, name: "Bling Bling King", category: "Chess", 
                description: "Gold-plated, diamond-studded King", price: 1200, releaseDate:  new Date().toISOString()},
        ],
        orders: [],
        books: [
            {   id: 34324233, 
                isbn: 34324233, 
                sellers: [
                    {name: 'Bende seller', address: 'sáky u 7a', quantity: 33000, age: 49, birthYear: 1972},
                    {name: 'Sasform Agrotechnika Kft.', address: 'Felsőszéktó 86', quantity: 12000, age: 40, birthYear: 1981}
                    ],
                title: "Angular 11", 
                authors: ['Ferdinand Malcher', 'Johannes Hoppe', 'Danny Koppenhagen'], 
                published: new Date(2020, 8, 1), subtitle: 'Grundlagen, fortgeschrittene Themen und Best Practices', rating: 5,
                thumbnails: [{
                    url: 'https://ng-buch.de/angular-cover.jpg', title: 'Buchcover' }],
                description: 'Lernen Sie Angular mit diesem Praxisbuch!'
            },
            {   id: 554543654, 
                isbn: 554543654, 
                title: "React", 
                authors: ['Oliver Zeigermann', 'Nils Hartmann'], 
                published: new Date(2019, 11, 12), 
                subtitle: 'Grundlagen, fortgeschrittene Themen, Praxistipps', rating: 4,
                thumbnails: [{
                    url: 'https://ng-buch.de/react-cover.jpg', title: 'Buchcover' }],
                description: 'Das bewährte und umfassende Praxisbuch zu React'
            }
        ]
    }
}

console.log("date bol dátum:", new Date());

/*
    DÁTUM _!!!!
        A RESTből visszajövő json a dátumokat rendszerint nem localizálva hanem az ISO8809 nek megfelelő formátumban adja vissza,
    mely UTC. (a DBben is elvileg UTC kell tárolni). 
        A js new Date() (és valamennyi nem xxxUTCyyy() metódus olyan date objektumot hoz létre, mely a browser local és timezonenak felel meg. )
    A local date-t itt átalakitjuk UTC ISO fomrában a toISOString() gel, igy emuláljuk hogy a API-tól jönnek a dátumok.

    HA viszont nem browserben futo js ben hozzuk létre a Date() akkor UTC időt hoz létre !!!
*/