const { Router } = require('express');
const router = Router();
const productService = require('../services/productService');

router.get('/', (req, res) => {
    productService.getAll()
        .then(courses =>{
            if(req.user){
                courses = courses.sort((a,b)=> b.createdAt - a.createdAt)
                res.render('user-home', {title: 'Home', courses})
            }else{
                courses = courses.sort((a,b)=> b.usersEnrolled.length - a.usersEnrolled.length).slice(0,3);
                res.render('guest-home', {title: 'Guest-Home', courses})
            }
        })
        .catch(err=> console.log(err));
    
})
router.get('/about', (req, res) => {
    res.render('about', {title: 'About us'});
})

module.exports = router

