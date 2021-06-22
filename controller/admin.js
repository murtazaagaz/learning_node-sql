const Product = require('../model/product');
const Cart = require('../model/cart');

exports.getAddProductsController = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};
exports.addProductController = async (req, res, next) => {
  // products.push({ title: req.body.title });

  const title = req.body.title;
  const image = req.body.image;
  const price = req.body.price;
  const description = req.body.description;
  console.log(`MUR ADMIN CREATE USERID: ${req.user.id}`);

  await req.user.createProduct({
    title: title,
    price: price,
    image: image,
    description: description,
  });
  // await req.user.createProduct({

  // });

  // res.json({ result: true });
  res.redirect('/');
};

exports.getEditProductsController = async (req, res, next) => {
  const edit = req.query.edit;

  const productId = req.params.productId;
  const product = await Product.findByPk(productId);
  if (product) {
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: true,
      product: product,
    });
  }
};

exports.postEditingController = async (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const image = req.body.image;

  const product = await Product.findByPk(id);

  product.title = title;
  product.price = price;
  product.image = image;
  product.description = product.description;

  await product.save();

  res.redirect('/');
};

exports.postDeleteProduct = async (req, res, next) => {
  await Product.destroy({ where: { id: req.body.id } });
  res.redirect('/admin/products');
};
exports.products = getIndex = (req, res, next) => {
  req.user.getProducts().then((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Shop',
      path: '/admin/products',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};
