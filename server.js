const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const db = require('./api/db');

const {
    getAllCompanies,
    getSingleCompany,
    addNewCompany,
    updateCompany,
    deleteCompany,
    searchCompany
} = require('./api/company');

const { register, deleteUser, login } = require('./api/user');

// ###################### SWAGGER ###############################
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: '1.0.0',
            title: 'API DOC',
            description: 'Documentation for APIs',
            servers: ['http://localhost:5000']
        }
    },
    apis: ['server.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * definitions:
 *  Company:
 *      type: object
 *      properties:
 *          companies_page_count:
 *              type: integer
 *          page_number:
 *              type: integer
 *          companies:
 *              type: array
 *              items:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: integer
 *                      name:
 *                          type: string
 *                      email:
 *                          type: string
 */

// ################################ END OF SWAGGER ###############################
// parse application/json
app.use(bodyParser.json());

// ################################ COMPANY ######################################
/**
 * @swagger
 * /api/company:
 *  get:
 *      tags:
 *        - Company
 *      name: Company
 *      summary: Get all Company
 *      consumers:
 *          - application/json
 *      responses:
 *          200:
 *              description: Successfully get all Company
 *              schema:
 *                  $ref: '#/definitions/Company'
 */
app.get('/api/company', getAllCompanies);

/**
 * @swagger
 * /api/company/:id:
 *  get:
 *      tags:
 *        - Company
 *      name: Company
 *      summary: Get single Company
 *      consumers:
 *          - application/json
 *      parameters:
 *          - name: ID
 *            in: query
 *            required:
 *              - ID
 *      responses:
 *          200:
 *              description: Successfully get single Company
 */
app.get('/api/company/:id', getSingleCompany);

/**
 * @swagger
 * /api/company:
 *  post:
 *      tags:
 *        - Company
 *      name: Company
 *      summary: Create new Company
 *      consumers:
 *          - application/json
 *      parameters:
 *          - name: body
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  address:
 *                      type: string
 *            required: true
 *      responses:
 *          200:
 *              description: Created Company successfully
 */
app.post('/api/company', addNewCompany);

/**
 * @swagger
 * /api/company:
 *  put:
 *      tags:
 *        - Company
 *      name: Company
 *      summary: Update Company
 *      consumers:
 *          - application/json
 *      parameters:
 *          - name: body
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  address:
 *                      type: string
 *            required: true
 *      responses:
 *          200:
 *              description: Updated Company successfully
 */
app.put('/api/company/:id', updateCompany);

/**
 * @swagger
 * /api/company/:id:
 *  delete:
 *      tags:
 *        - Company
 *      name: Company
 *      summary: Delete Company
 *      consumers:
 *          - application/json
 *      parameters:
 *          - name: ID
 *            in: query
 *            required:
 *              - ID
 *      responses:
 *          200:
 *              description: Company Deleted
 *          404:
 *              description: Company not found
 */
app.delete('/api/company/:id', deleteCompany);

/**
 * @swagger
 * /api/search/company/:name:
 *  get:
 *      tags:
 *        - Company
 *      name: Company
 *      summary: Search Company
 *      consumers:
 *          - application/json
 *      parameters:
 *          - name: name
 *            in: query
 *            required:
 *              - name
 *      responses:
 *          200:
 *              description: Company Deleted
 *          404:
 *              description: Company not found
 */
app.delete('/api/search/company/:name', searchCompany);

// ############################# USER ##################################

/**
 * @swagger
 * /api/register:
 *  post:
 *      tags:
 *        - Users
 *      name: Login
 *      summary: Register User
 *      consumers:
 *          - application/json
 *      parameters:
 *          - name: body
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *                      format: password
 *            required:
 *              - username
 *              - email
 *              - password
 *      responses:
 *          200:
 *              description: Registered User successfully
 */
app.post('/api/register', register);

/**
 * @swagger
 * /api/login:
 *  post:
 *      tags:
 *        - Users
 *      name: Login
 *      summary: Log in a User
 *      consumers:
 *          - application/json
 *      parameters:
 *          - name: body
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *                      format: password
 *            required:
 *              - username
 *              - password
 *      responses:
 *          200:
 *              description: User found and logged in successfully
 *          401:
 *              description: Bad username. not found in db
 *          403:
 *              description: Username and password don't match
 */
app.post('/api/login', login);

/**
 * @swagger
 * /api/user/:email:
 *  delete:
 *      tags:
 *        - Users
 *      name: Login
 *      summary: Delete User
 *      consumers:
 *          - application/json
 *      parameters:
 *          - name: body
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *            required:
 *              - email
 *      responses:
 *          200:
 *              description: User deleted
 *          404:
 *              description: User not found
 */
app.delete('/api/user/:email', deleteUser);

app.listen(5000, () => {
    console.log('Server started on port 5000')
});
