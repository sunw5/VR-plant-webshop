const fsp = require('fs').promises;
const { join } = require('path');
const product = require('../models/product.model');
const address = require('../models/address.model');
const user = require('../models/user.model');
const customer = require('../models/customer.model');
const order = require('../models/order.model');
const bill = require('../models/bill.model');

const modelsToSeed = [bill];

const seed = async () => {
  for (const model of modelsToSeed) {
    try {
      const dropResult = await model.collection.drop();

      const data = await fsp.readFile(
        join(__dirname, `${model.modelName.toLowerCase()}.json`),
        'utf8'
      );
      const parsedData = JSON.parse(data);

      if (model.modelName.toLowerCase() === 'user') {
        for (const userobj of parsedData) {
          const usermodel = new model(userobj);
          await usermodel.save();
        }
        return console.log('User seeded');
      }

      if (model.modelName.toLowerCase() === 'order') {
        let customerIds = await customer.find({}).select({ _id: 1 });
        customerIds = customerIds.map((customer) => customer._id.toString());
        let productIds = await product.find({}).select({ _id: 1 });
        productIds = productIds.map((product) => product._id.toString());

        parsedData.forEach((order) => {
          order.customerId =
            customerIds[Math.floor(Math.random() * customerIds.length)];
          order.productId =
            productIds[Math.floor(Math.random() * productIds.length)];
        });
      }
      else if (model.modelName.toLowerCase() === 'customer') {
        let addressIds = await address.find({}).select({ _id: 1 });
        addressIds = addressIds.map((address) => address._id.toString());        

        parsedData.forEach((customer, i) => {
          customer.addressBillId = addressIds[i];          
          customer.addressShipId = addressIds[i];          
        });
      }
      else if (model.modelName.toLowerCase() === 'bill') {
        let orderData = await order.find({}).select({ _id: 1, amount: 1, productId: 1 }).populate([{ path: 'productId', select: ['Ár'] }]);
        
        parsedData.forEach((bill, i) => {
          bill.orderId = orderData[i]._id.toString();
          bill.price = orderData[i].amount * orderData[i].productId['Ár'];
        });
      }


      await model.insertMany(parsedData);

      console.log(
        `Successfully seeded database with ${model.modelName.toLowerCase()}`
      );
    } catch (error) {
      console.error(error);
    }
  }
};

module.exports = seed;
