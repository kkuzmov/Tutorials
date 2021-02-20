const { Router } = require('express');
const router = Router();
const productService = require('../services/productService');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');
const { validateProduct } = require('../controllers/helpers/productHelper'); // валидатор за продукт - провери дали е нужен

// ВНИМАВАЙ С PATHS КЪМ VIEWS 

router.get('/', (req, res) => {
    res.redirect('/');
})
router.get('/create', (req, res) => {
        res.render('create-course', {title: 'Create a new course'});
})
router.post('/create', (req, res) => {
    let courseData = req.body;
    productService.createProduct({...courseData, creator: req.user._id})
        .then(course =>{
            res.redirect('/');
        })
        .catch(err=>{
            console.log(err);
        })

})
router.get('/:productId/details', (req, res)=>{
        productService.getOne(req.params.productId)
            .then(course =>{
                let isEnrolled = course.usersEnrolled.includes(req.user._id);
                let isCreator = course.creator === req.user._id;
                res.render('course-details', {title: 'Details', course, isEnrolled, isCreator})
            })
            .catch(err => console.log(err));
})
router.get('/:productId/edit', (req, res)=>{
    productService.getOne(req.params.productId)
        .then(course =>{
            res.render('edit-course', {title: 'Edit course', course})
        })
        .catch(err => console.log(err))
})
router.post('/:productId/edit', (req, res)=>{
    let dataToSend = req.body;
    productService.updateOne(req.params.productId, dataToSend)
        .then(updated => {
            res.redirect(`/products/${req.params.productId}/details`);
        })
        .catch(err => console.log(err))
})
router.get('/:productId/enroll', (req, res)=>{
    productService.getOne(req.params.productId)
        .then(course =>{
            if(!course.usersEnrolled.includes(req.user._id)){
              course.usersEnrolled.push(req.user._id);
              productService.updateOne(req.params.productId, course)
                .then(updated =>{
                    console.log(updated)
                    res.redirect(`/products/${req.params.productId}/details`);
                })
           }
        })
        .catch(err => console.log(err))
})
router.get('/:productId/delete', (req, res)=>{
    productService.deleteOne(req.params.productId)
        .then(deleted =>{
            res.redirect('/')
        })
        .catch(err => console.log(err))
})



module.exports = router;