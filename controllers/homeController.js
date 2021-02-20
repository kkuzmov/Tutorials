const { Router, query } = require('express');
const router = Router();
const productService = require('../services/productService');

router.get('/', (req, res) => {
    res.redirect('/products')
})


module.exports = router

