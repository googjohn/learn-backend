const express = require('express');
const router = express.Router();


router.route('/').get(function (req, res) {
  res.status(200).json({ message: 'Get all contacts.', allContacts: true, })
})

router.route('/:id').get(function (req, res) {
  res.status(200).json({ message: 'Get a contact.', allContacts: false })
})

router.route('/').post(function (req, res) {
  res.status(200).json({ message: 'You are now in contacts.' })
})

router.route('/:id').put(function (req, res) {
  res.status(200).json({ message: 'Contacts updated.' })
})

router.route('/').delete(function (req, res) {
  res.status(200).json({ message: 'Contacts deleted.' })
})

router.route('/:id').delete(function (req, res) {
  res.status(200).json({ message: 'Contact deleted.' })
})

module.exports = router