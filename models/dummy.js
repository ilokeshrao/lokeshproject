const mongoose = require('mongoose');
const Address = require('./address');

mongoose.connect('mongodb://localhost:27017/backendprojectfirst', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dummyAddressData = {
  add: '123 Main Street',
  mobile: 1234567890,
  tel: 9876543210,
  email: 'example@example.com',
  insta: 'https://www.instagram.com/example/',
  fb: 'https://www.facebook.com/example/',
};

async function insertDummyAddressData() {
  try {
    await Address.create(dummyAddressData);
    console.log('Dummy address data inserted successfully.');
  } catch (error) {
    console.error('Error inserting dummy address data:', error.message);
  } finally {
    mongoose.connection.close();
  }
}

insertDummyAddressData();
