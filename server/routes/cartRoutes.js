const express = require('express');
const router = express.Router();

// Importing the controller
const {
    createCartItem,
    getCartItems,
    updateCartItem,
    deleteCartItem,
    getAllServices,
    getServiceById,
    deleteService,
    updateService,
    addService,
} = require('../controllers/cartController');



// cart item
router.post('/add', createCartItem);
router.get('/:user_id', getCartItems);
router.put('/update/:cart_item_id', updateCartItem);
router.delete('/delete/:cart_item_id', deleteCartItem);

//  services
router.get("/", getAllServices);
router.post("/addService", addService);
router.get("/:id", getServiceById);
router.delete("/:id", deleteService);
router.put("/:id", updateService);

module.exports = router;
