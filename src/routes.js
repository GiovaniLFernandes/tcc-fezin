const express = require('express')
const CustomerController = require('./controllers/customer')

const customer = new CustomerController()

const routes = express.Router()

routes.post('/hl7', customer.saveHl7)
routes.post('/fhir', customer.saveFhir)

module.exports = { routes }