const app = require('./server');
const mongoose = require('mongoose');
const supertest = require('supertest');
const superagent = require('superagent');
const config = require('config');
const Product = require('./models/product.model');
const Address = require('./models/address.model');
const { response } = require('jest-mock-req-res');
const { Test } = require('supertest');

describe('REST API integration tests', () => {
  const insertData = [
    {
      'Magyar név': 'Páfrányfenyő',
      'Latin név': 'Ginkgo Biloba',
      Ár: 5,
      Elérhető: false,
      Fényigény: 'napos',
      Tenyészidő: 'évelő',
      Talajigény: 'normál',
      Habitus: 'fásszárú',
      'Teljes magasság': '1ö - 12 m',
      Kiszerelés: '5l konténer',
      'Virágzás ideje': null,
      'Virág színe': null,
      Egyéb: 'lombhullató, fagytűtő, hímivarú növényt küldünk, ősszel sárgul',
    },
    {
      'Magyar név': 'Mezei Juhar',
      'Latin név': 'Acer Campestre',
      Ár: 5,
      Elérhető: false,
      Fényigény: 'napos',
      Tenyészidő: 'évelő',
      Talajigény: 'vályog, meszes',
      Habitus: 'fásszárú',
      'Teljes magasság': '15 m',
      Kiszerelés: '5l konténer',
      'Virágzás ideje': 'IV',
      'Virág színe': null,
      Egyéb: 'lombhullató, fagytűtő, ősszel sárgul',
    },
  ];

  const insertData2 = [
    {
      "zip": 8856,
      "city": "Hódmezővásárhely",
      "street": "Nemes sor 7."
    },
    {
      "zip": 2752,
      "city": "Budapest",
      "street": "Maja lépcső 41."
    },
    {
      "zip": 4142,
      "city": "Budapest",
      "street": "Balázs útja 27."
    },
  ];


  let lastAccessToken = '';

  beforeAll((done) => {
    const { host, user, pass } = config.get('database');
    mongoose
      .connect(`mongodb+srv://${host}`, {
        user,
        pass,
      })
      .then((conn) => {
        console.log('Connection to test database success!');
        done();
      })
      .catch((err) => {
        throw new Error(err.message);
      });

    superagent
      .post('http://localhost:3000/login')
      .send({
        email: 'johndoe@gmail.com',
        password:
          '$2a$10$y5n2dCOas1zVw83dstNZJOpRKv.uG2gF0nLHgAKx/13R/ZONoQGeq',
      })
      .set('Content-Type', `application/json`)
      .set('accept', 'json')
      .end((err, res) => {
        if (err) {
          console.log(err);
          return done();
        }
        lastAccessToken = res.body.accessToken;
        done();
      });
  });

  afterAll((done) => {
    mongoose.connection.close(() => done());
  });

  test('GET /product', async () => {
    try {
      await Product.insertMany(insertData);
      const response = await supertest(app)
        .get('/product')
        .set('authorization', `Bearer ${lastAccessToken}`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(insertData.length);

      response.body.forEach((product, index) => {
        expect(product['Magyar név']).toBe(insertData[index]['Magyar név']);
      });
      const deletedProducts = await Product.deleteMany({}).exec();
      console.log('deletedProducts', deletedProducts);
    } catch (err) {
      throw new Error(err);
    }
  });

  test('GET /product/:id', async () => {
    try {
      const product = await Product.create(insertData[0]);
      const response = await supertest(app)
        .get(`/product/${product._id}`)
        .set('authorization', `Bearer ${lastAccessToken}`);
      expect(response.status).toBe(200);
      expect(response.body['Magyar név']).toBe(insertData[0]['Magyar név']);
      const deletedProducts = await Product.deleteMany({}).exec();
      console.log('deletedProducts', deletedProducts);
    } catch (err) {
      throw new Error(err);
    }
  })

  test('POST /product', async () => {
    try {
      const response = await supertest(app)
        .post('/product')
        .set('authorization', `Bearer ${lastAccessToken}`)
        .send(insertData[0]);
      expect(response.status).toBe(201);
      expect(response.body['Magyar név']).toBe(insertData[0]['Magyar név']);
      const deletedProducts = await Product.deleteMany({}).exec();
      console.log('deletedProducts', deletedProducts);
    } catch (err) {
      throw new Error(err);
    }
  })

  test('PUT /product/:id', async () => {
    try {
      const product = await Product.create(insertData[0]);
      const response = await supertest(app)
        .put(`/product/${product._id}`)
        .set('authorization', `Bearer ${lastAccessToken}`)
        .send(insertData[1]);
      expect(response.status).toBe(200);
      expect(response.body['Magyar név']).toBe(insertData[1]['Magyar név']);
      const deletedProducts = await Product.deleteMany({}).exec();
      console.log('deletedProducts', deletedProducts);
    } catch (err) {
      throw new Error(err);
    }
  })

  test('DELETE /product/:id', async () => {
    try {
      const product = await Product.create(insertData[0]);
      const response = await supertest(app)
        .delete(`/product/${product._id}`)
        .set('authorization', `Bearer ${lastAccessToken}`);
      expect(response.status).toBe(200);
      const deletedProducts = await Product.deleteMany({}).exec();
      console.log('deletedProducts', deletedProducts);
    } catch (err) {
      throw new Error(err);
    }
  })

  test('GET /address', async () => {
    try {
      await Address.insertMany(insertData2);
      const response = await supertest(app)
        .get('/address')
        .set('authorization', `Bearer ${lastAccessToken}`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(insertData2.length);

      response.body.forEach((address, index) => {
        expect(address.zip).toBe(insertData2[index].zip);
        expect(address.city).toBe(insertData2[index].city);
        expect(address.street).toBe(insertData2[index].street);
      });
      const deletedAddresses = await Address.deleteMany({}).exec();
      console.log('deletedAddresses', deletedAddresses);
    } catch (err) {
      throw new Error(err);
    }
  })

  test('GET /address/:id', async () => {
    try {
      const address = await Address.create(insertData2[0]);
      const response = await supertest(app)
        .get(`/address/${address._id}`)
        .set('authorization', `Bearer ${lastAccessToken}`);
      expect(response.status).toBe(200);
      expect(response.body.zip).toBe(insertData2[0].zip);
      expect(response.body.city).toBe(insertData2[0].city);
      expect(response.body.street).toBe(insertData2[0].street);
      const deletedAddresses = await Address.deleteMany({}).exec();
      console.log('deletedAddresses', deletedAddresses);
    } catch (err) {
      throw new Error(err);
    }
  })

  test('POST /address', async () => {
    try {
      const response = await supertest(app)
        .post('/address')
        .set('authorization', `Bearer ${lastAccessToken}`)
        .send(insertData2[0]);
      expect(response.status).toBe(201);
      expect(response.body.zip).toBe(insertData2[0].zip);
      expect(response.body.city).toBe(insertData2[0].city);
      expect(response.body.street).toBe(insertData2[0].street);
      const deletedAddresses = await Address.deleteMany({}).exec();
      console.log('deletedAddresses', deletedAddresses);
    } catch (err) {
      throw new Error(err);
    }
  })

  test('PUT /address/:id', async () => {
    try {
      const address = await Address.create(insertData2[0]);
      const response = await supertest(app)
        .put(`/address/${address._id}`)
        .set('authorization', `Bearer ${lastAccessToken}`)
        .send(insertData2[1]);
      expect(response.status).toBe(200);
      expect(response.body.zip).toBe(insertData2[1].zip);
      expect(response.body.city).toBe(insertData2[1].city);
      expect(response.body.street).toBe(insertData2[1].street);
      const deletedAddresses = await Address.deleteMany({}).exec();
      console.log('deletedAddresses', deletedAddresses);
    } catch (err) {
      throw new Error(err);
    }
  })

  test('DELETE /address/:id', async () => {
    try {
      const address = await Address.create(insertData2[0]);
      const response = await supertest(app)
        .delete(`/address/${address._id}`)
        .set('authorization', `Bearer ${lastAccessToken}`);
      expect(response.status).toBe(200);
      const deletedAddresses = await Address.deleteMany({}).exec();
      console.log('deletedAddresses', deletedAddresses);
    } catch (err) {
      throw new Error(err);
    }
  })

  
});
