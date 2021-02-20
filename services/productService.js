const Product = require('../models/Product');

async function getAll(query){
    let products = await Product.find({}).lean()

    if(query.search){
        products = products.filter(x => x.title.toLowerCase().includes(query.search))
    }
    return products;
}
async function getOne(id){
    return Product.findById(id).lean();
}
function createProduct(data){
       let product = new Product({...data}); 
       return product.save()
}
function updateOne(productId, productData){
       return Product.updateOne({_id: productId}, productData)
}
function deleteOne(productId){
     return Product.deleteOne({_id: productId})
}
module.exports = {
    getAll,
    getOne,
    createProduct,
    updateOne,
    deleteOne
}