const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./utils/database');
const User = require('./model/user');
const Product = require('./model/product');

const Cart = require('./model/cart');
const CartItems = require('./model/cart-items');
const Order = require('./model/order');
const OrderItems = require('./model/order-items');

const app = express();

const errorController = require('./controller/error');

app.set('view engine', 'ejs');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1).then(async (user) => {
    req.user = user;
    // console.log(`MUR USER ID: ${req.user.id}`);

    // await user.createCart();
    next();
  });
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);

sequelize.sync().then(() => {
  User.create({ name: `Murtaza`, email: `murtaza@gmail.com` });
});
app.use(errorController.show404);

Product.belongsTo(User, { constraint: true, onDelete: 'CASCADE' });
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItems });
Product.belongsToMany(Cart, { through: CartItems });

Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItems });

app.listen(3000);

// const instantiateSQL = async () => {
//   Product.belongsTo(User, { constraint: true, onDelete: 'CASCADE' });
//   await sequelize.sync({ force: true });

//   const user = await Users.findByPk(1);
//   if (!user) {
//     await Users.create({ name: `Murtaza`, email: `murtaza@gmail.com` });
//   }
// };
