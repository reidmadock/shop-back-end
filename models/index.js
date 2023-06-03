// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Categories have many Products
// Category is the SOURCE model, Product is the TARGET
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// Products belongsTo Category
// Foreign Key of target (Category) is added onto the source (Product)
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

/*
 Setting up many-to-many relationship with Product being associated to Tag
 by adding the foreign key product_id to the ProductTag table.
*/
Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'product_id' }); 

/* 
 Setting up many-to-many relationship with Tag being associated to Product
 by adding the foreign key tag_id to the ProductTag table.
*/
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tag_id' });
// Tag.belongsToMany(Product, { through: ProductTag});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
