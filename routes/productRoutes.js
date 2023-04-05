const express = require('express');
const router = express.Router();
const Product = require('../Models/product');

router.get('/', (req, res) => {
    router.redirect('/products');
});
router.get('/products', async (req, res) => {
    const products = await Product.find({});

    res.render('products/index', {products});
});

router.get('/products/new', (req, res) => {
    res.render('products/new');
});

router.post('/products', async(req, res) => {
    const {name, img, desc, price} = req.body;
    console.log(req.body);
    console.log(desc);
    await Product.create({name, img, price : parseFloat(price), desc});
    res.redirect('/products');
});

router.get('/products/:id', async (req, res) => {
    const {id} = req.params;
    // console.log(id);
    const product = await Product.findById(id).populate('reviews');
    console.log(product);
    res.render('products/show', {product});
});

router.get('/products/:id/edit', async(req, res) => {
    const {id} = req.params;
    
    const product = await Product.findById(id);

    res.render('products/edit', {product});
});

router.patch('/products/:id', async(req, res) => {
    const {id} = req.params;

    const {name, img, price, desc} = req.body;

    await Product.findByIdAndUpdate(id, {name, img, price, desc});

    res.redirect(`/products/${id}`);
});

router.delete('/products/:id', async(req, res) => {
    const {id} = req.params;

    await Product.findByIdAndDelete(id);

    res.redirect(`/products`);
})


module.exports = router;
