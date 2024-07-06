// models/index.js
const Sequelize = require('sequelize');
const sequelize = new Sequelize('bluetick', 'root', 'Ridhisha29@', {
  dialect: 'mysql',
  host: 'localhost',
  // other options
});

const User = sequelize.define('user', {
    phonenumber: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  password: Sequelize.STRING,
  username: Sequelize.STRING,
},
{
  timestamps: false,
}
);

const Admins = sequelize.define('admin', {
  phonenumber: {
  type: Sequelize.STRING,
  primaryKey: true,
},
password: Sequelize.STRING,
username: Sequelize.STRING,
},
{
timestamps: false,
}
);

const DeliveryRequest = sequelize.define('delivery_request', {
  user_name: Sequelize.STRING,
  company_name: Sequelize.STRING,
  email: Sequelize.STRING,
  phone_no: Sequelize.STRING, // Assuming phone_no is a string in your database
  consignment_type: Sequelize.STRING,
  pickup_date: Sequelize.DATE,
  No_of_vehicles: Sequelize.INTEGER,
  pick_up_address1: Sequelize.STRING,
  pick_up_address2: Sequelize.STRING,
  pick_up_city: Sequelize.STRING,
  pick_up_pincode: Sequelize.STRING,
  drop_address1: Sequelize.STRING,
  drop_address2: Sequelize.STRING,
  drop_city: Sequelize.STRING,
  drop_pincode: Sequelize.STRING,
},
{
  timestamps: true,
}
);

const Register = sequelize.define('register', {
  user_name: Sequelize.STRING,
  company_name: Sequelize.STRING,
  email: Sequelize.STRING,
  phone_no: Sequelize.STRING, 
  address1: Sequelize.STRING,
  address2: Sequelize.STRING,
  city: Sequelize.STRING,
},
{
  timestamps: true,
}
);

sequelize.sync({ force: false }) // Set force to true to drop and re-create tables on every application start
  .then(() => {
    console.log('Models synced with database');
  })
  .catch((error) => {
    console.error('Error syncing models with database:', error);
  });


module.exports = { User, Admins, sequelize, DeliveryRequest, Register };

