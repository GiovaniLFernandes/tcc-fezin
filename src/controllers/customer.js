const HL7 = require('hl7-standard/src/api')
const fhir = require('fhir-validator')

class CustomerController {
  saveHl7(req, res, next) {
    try {
      const hl7Body = req.body
      const message = new HL7(hl7Body)
      message.transform(err => {
        if (err) return res.status(400).send(err)
      })
      const result = message.transformed

      return res.status(201).send(result)
    } catch (error) {
      console.log(error)
      return res.status(500).json('Server Error')
    }

  }

  saveFhir(req, res, next) {
    try {
      const fhirBody = req.body
      const result = fhir.validate(fhirBody)
      if (result.errors.length > 0) {
        return res.status(400).send({ errors: result.errors, message: 'The given resource is invalid. There were ' + result.errors.length + ' errors.' })
      }

      return res.status(201).send('Criado com sucesso!')
    } catch (error) {
      console.log(error)
      return res.status(500).json('Server Error')
    }

  }
}

module.exports = CustomerController