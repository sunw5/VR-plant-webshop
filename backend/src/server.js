const express = require('express');
const config = require('config');
const morgan = require('morgan');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// Authentication, authorization
const authenticateJwt = require('./controllers/auth/authenticate');
const roleGuard = require('./controllers/auth/roleGuard');

const swaggerDocument = YAML.load('./docs/swagger.yaml');
const options = {
  swaggerOptions: {
    persistAuthorization: true
  }
};

const app = express();

const { host, user, pass } = config.get('database');
mongoose
  .connect(`mongodb+srv://${host}`, {
    user,
    pass,    
  })
  .then((conn) => {
    console.log('Connection success!');
    // One time seed - uncomment to seed database
    /* const seed = require('./seed/seeder');
    seed(); */
  })
  .catch((err) => {
    throw new Error(err.message);    
  });

// Cross origin resource sharing: CORS
app.use(cors());
app.use(express.static('public'));
app.use(morgan('tiny', { stream: logger.stream }));
app.use(express.json());

app.use('/login', require('./controllers/login/router'));
app.use('/product', authenticateJwt, require('./controllers/product/router'));
app.use('/customer', authenticateJwt, require('./controllers/customer/router'));
app.use('/order', authenticateJwt, require('./controllers/order/router'));
app.use('/bill', authenticateJwt, require('./controllers/bill/router'));
app.use('/address', authenticateJwt, require('./controllers/address/router'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use('/', (req, res) => {
  console.log(req.url);
  res.send('api server');
});

app.use((err, req, res, next) => {
  logger.error(err.message);
    
  res.status(err.status || 500);
  if (res.status === 500) {
    err.message = 'Server Error';    
  }
  
  res.json({
    hasError: true,
    status: err.status,
    message: err.message,    
  }); 
  
});

module.exports = app;
