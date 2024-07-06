const express = require('express');
const router = express.Router();
const { User, Admins, Register } = require('../models');
const bcrypt = require('bcrypt');

//User login details verification
router.post('/login', async (req, res) => {
    const { phonenumber, password, username } = req.body;
  
    try {
      const user = await User.findOne({
        where: { phonenumber: phonenumber },
        attributes: ['phonenumber', 'password', 'username'],
      });
  
      console.log('Retrieved User:', user);
  
      if (!user) {
        console.log('User not found');
        return res.redirect('/error');
      }
  
      if (password !== user.password) { // Direct comparison of plaintext passwords
        console.log('Password does not match');
        return res.redirect('/error');
      }
  
      // Successful login
      res.render('user.html', { username: user.username });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


//Admin login details verification
  router.post('/alogin', async (req, res) => {
    const { phonenumber, password } = req.body;
  
    try {
      const admin = await Admins.findOne({
        where: { phonenumber: phonenumber },
        attributes: ['phonenumber', 'password', 'username'],
      });
  
      console.log('Retrieved Admin:', admin);
  
      if (!admin) {
        console.log('Admin not found');
        return res.redirect('/error');
      }
  
      if (password !== admin.password) {
        console.log('Password does not match');
        return res.redirect('/error');
      }
  
      // Successful login
      res.render('admin.html', { username: admin.username });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });  
  
//User delivery request form update to database
  const { sequelize, DeliveryRequest } = require('../models');

  router.post('/signup_form', async (req, res) => {
    try {
      const {
        phonenumber,
        password,
        username,
      } = req.body;
  
      // Create a new record in the database
      const signUp = await User.create({
        phonenumber,
        password,
        username,
      });
  
      console.log('Delivery Request saved:', signUp);
  
      // res.send('Form submitted successfully');
      res.redirect(`/user?username=${encodeURIComponent(username)}`);
    } catch (error) {
      console.error('Error submitting form:', error);
      res.status(500).send('Internal Server Error');
    }
  });

// Route for /profile
  router.get('/profile', async (req, res) => {
    try {
      const username = req.query.username; // Assuming you are passing the username as a query parameter
  
      // Fetch user data from the database based on the username
      const user = await User.findOne({
        where: { username: username },
        attributes: ['username', 'phonenumber'], // Specify the attributes you want to retrieve
      });
  
      if (!user) {
        return res.status(404).send('User not found');
      }

      const deliveryRequests = await DeliveryRequest.findAll({
        where: { phone_no: user.phonenumber },
        order: [['createdAt', 'DESC']], // Order by createdAt in descending order
      });
  
      // Render the profile page and pass the user data
      res.render('profile.html', { user: user, deliveryRequests: deliveryRequests });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

//delete a request from profile
router.get('/deleteRequest', async (req, res) => {
  const requestId = req.query.requestId;

  try {
    // Find the delivery request by ID
    const deliveryRequest = await DeliveryRequest.findByPk(requestId);

    if (!deliveryRequest) {
      return res.status(404).send('Delivery request not found');
    }

    // Delete the delivery request
    alert("Are you sure you want to cancel your delivery?");
    await deliveryRequest.destroy();

    // Redirect to the profile page or any other desired page
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


//preserve user state
router.get('/user' , async (req, res) => {
  try {
    const username = req.query.username; 

    const user = await User.findOne({
      where: { username: username },
      attributes: ['username', 'phonenumber'], // Specify the attributes you want to retrieve
    });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.render('user.html', { username: user.username });
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//preserve admin state
router.get('/admin' , async (req, res) => {
  try {
    const username = req.query.username; 

    const admin = await Admins.findOne({
      where: { username: username },
      attributes: ['username', 'phonenumber'], // Specify the attributes you want to retrieve
    });

    if (!admin) {
      return res.status(404).send('User not found');
    }

    res.render('admin.html', { username: admin.username });
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//request-delivery form and state preservence
router.get('/request_delivery' , async (req, res) => {
  try {
    const username = req.query.username; 

    const user = await User.findOne({
      where: { username: username },
      attributes: ['username', 'phonenumber'], // Specify the attributes you want to retrieve
    });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.render('Request_delivery.html', { user: user });
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//register form and state preservence
router.get('/register' , async (req, res) => {
  try {
    const username = req.query.username; 

    const user = await User.findOne({
      where: { username: username },
      attributes: ['username', 'phonenumber'], // Specify the attributes you want to retrieve
    });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.render('register.html', { user: user });
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//about us page
router.get('/about' , async (req, res) => {
  try {
    const username = req.query.username; 

    const user = await User.findOne({
      where: { username: username },
      attributes: ['username', 'phonenumber'], // Specify the attributes you want to retrieve
    });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.render('aboutus.html', { username: username });
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//Support page
router.get('/support' , async (req, res) => {
  try {
    const username = req.query.username; 

    const user = await User.findOne({
      where: { username: username },
      attributes: ['username', 'phonenumber'], // Specify the attributes you want to retrieve
    });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.render('support.html', { username: username });
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//fare-calculator page
router.get('/calculate' , async (req, res) => {
  try {
    const username = req.query.username; 

    const user = await User.findOne({
      where: { username: username },
      attributes: ['username', 'phonenumber'], // Specify the attributes you want to retrieve
    });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.render('fare_calculator.html', { username: username });
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//fare-calculator page
router.get('/bill' , async (req, res) => {
  try {
    const username = req.query.username; 

    const user = await User.findOne({
      where: { username: username },
      attributes: ['username', 'phonenumber'], // Specify the attributes you want to retrieve
    });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.render('bill.html', { username: username });
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/submit_delivery_request', async (req, res) => {
  try {
    const {
      user_name,
      company_name,
      email,
      phone_no,
      consignment_type,
      pickup_date,
      No_of_vehicles,
      pick_up_address1,
      pick_up_address2,
      pick_up_city,
      pick_up_pincode,
      drop_address1,
      drop_address2,
      drop_city,
      drop_pincode,
    } = req.body;

    // Create a new record in the database
    const deliveryRequest = await DeliveryRequest.create({
      user_name,
      company_name,
      email,
      phone_no,
      consignment_type,
      pickup_date,
      No_of_vehicles,
      pick_up_address1,
      pick_up_address2,
      pick_up_city,
      pick_up_pincode,
      drop_address1,
      drop_address2,
      drop_city,
      drop_pincode,
    });

    console.log('Delivery Request saved:', deliveryRequest);

    // res.send('Form submitted successfully');
    res.redirect('/bill');
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/submit_register', async (req, res) => {
  try {
    const {
      user_name,
      company_name,
      email,
      phone_no,
      address1,
      address2,
      city,
    } = req.body;

    // Create a new record in the database
    const registers = await Register.create({
      user_name,
      company_name,
      email,
      phone_no,
      address1,
      address2,
      city,
    });

    console.log('Registered company saved as:', registers);

    
    res.redirect('/user');
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).send('Internal Server Error');
  }
});

//client ratio in admin page
router.get('/client-ratio', async (req, res) => {
  try {
    const username = req.query.username; 

    const admin = await Admins.findOne({
      where: { username: username },
      attributes: ['username', 'phonenumber'], // Specify the attributes you want to retrieve
    });

    // Fetch data from the database
    const deliveryRequestsCount = await DeliveryRequest.count();
    const registeredClientsCount = await Register.count();

    // Render the 'client-ratio' page and pass data to the template
    res.render('client-ratio.ejs', {
      deliveryRequestsCount: deliveryRequestsCount,
      registeredClientsCount: registeredClientsCount,
      username: admin.username,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//admin - views all the requests
router.get('/view-requests', async (req, res) => {
  try {
    const username = req.query.username;

    // Fetch user data from the database based on the username
    const admin = await Admins.findOne({
      where: { username: username },
      attributes: ['username', 'phonenumber'], // Specify the attributes you want to retrieve
    });

    if (!admin) {
      return res.status(404).send('Admin not found');
    }

    // Fetch all delivery requests related to the user
    const deliveryRequests = await DeliveryRequest.findAll();

    // Render the 'delivery-requests' page and pass data to the template
    res.render('view-requests.html', {
      username: admin.username,
      deliveryRequests: deliveryRequests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//admin- views all the registered companies
//admin - views all the requests
router.get('/view-registers', async (req, res) => {
  try {
    const username = req.query.username;

    // Fetch user data from the database based on the username
    const admin = await Admins.findOne({
      where: { username: username },
      attributes: ['username', 'phonenumber'], // Specify the attributes you want to retrieve
    });

    if (!admin) {
      return res.status(404).send('Admin not found');
    }

    // Fetch all delivery requests related to the user
    const registered = await Register.findAll();

    // Render the 'delivery-requests' page and pass data to the template
    res.render('view-registers.html', {
      username: admin.username,
      register: registered,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
