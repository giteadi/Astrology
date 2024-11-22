const express = require('express');
const router = express.Router();

// Importing the controller
const {
    createCartItem,
    getCartItems,
    updateCartItem,
    deleteCartItem
} = require('../controllers/cartController');

// Route to create a cart item
router.post('/add', createCartItem);

// Route to get all cart items for a user
router.get('/:user_id', getCartItems);

// Route to update a specific cart item
router.put('/update/:cart_item_id', updateCartItem);

// Route to delete a specific cart item
router.delete('/delete/:cart_item_id', deleteCartItem);

module.exports = router;
