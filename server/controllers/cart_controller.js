const swag = require('../models/swag');

module.exports = {
    add: (req, res, next) => {
        const { id } = req.query;
        let { cart } = req.session.user; 

        // This will return -1 if it isn't in the cart
        const index = cart.findIndex( cartProduct => cartProduct.id == id );

        //findIndex() method will return the index of an item if it is found if not it will return -1. First we check to see if the item they are trying to add to the cart is already in the cart if it is then we skip over the if statement and just res.send(200) with the user object on session. If not we go into the if statement below since index will return -1 and find the item in the collection of swag projects and then push it onto the card and increase the total of the price on the user object. 

        if ( index === -1 ) {
            const selectedSwag = swag.find( swag => swag.id == id );

            cart.push( selectedSwag );
            req.session.user.total += selectedSwag.price;
        }

        res.status(200).send( req.session.user );
    }, //This method is responsible for making sure the swag isn't already in the cart. If it isn't, add it to the cart and increase the total by the price of the swag. If it is, just return the request session's user object with a status of 200. This method will use the request query to get an id. We can then use this id to see if it is already in the cart and preform the required logic.

    delete: (req, res, next) => {
        const { id } = req.query;
        const { cart } = req.session.user;

        if ( selectedSwag ) {
            const i = cart.findIndex( swag => swag.id == id );
            cart.splice(i, 1);
            req.session.user.total -= selectedSwag.price;
        }
        
        res.status(200).send( req.session.user );
    }, //This method will be responsible for removing swag from the cart. It should try and see if the swag is in the cart. If it is, remove the swag from the cart and subtract the price from the total. If it isn't, don't do anything to the cart. The method should then return a status of 200 with the request session user's object.
    
    checkout: (req, res, next) => {
        const { user } = req.session;
        user.cart = [];
        user.total = 0;

        res.status(200).send( req.session.user );
    } //This method will be responsible for resetting the value cart to an empty array and total to 0. The method should then send a status of 200 with the update request session' user object.

}