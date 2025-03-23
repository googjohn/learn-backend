const Sample = require('../models/sample.model')

exports.getSample = async (req, res) => {
  try {
    const samples = await Sample.find({});

    if (!samples) {
      return res.status(404).send({ message: 'Samples not found' })
    }

    console.log(`${req.method} request successful`)

    res.status(200).send({
      message: 'Found samples',
      count: samples.length,
      data: samples
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}

exports.getSampleById = async (req, res) => {
  try {
    const sampleId = req.params.id;
    const sample = await Sample.findById(sampleId);

    if (!sample) {
      return res.status(404).send({
        message: 'Sample not found'
      })
    }

    console.log(`${req.method} request successful`)

    res.status(200).send({
      message: 'Found sample',
      data: sample
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}

exports.addSample = async (req, res) => {
  try {

    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear'
      });
    }

    const newSample = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const sample = await Sample.create(newSample)

    console.log(`${req.method} request successful`)

    return res.status(201).send({
      message: 'Sample added',
      content: sample
    })

  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}

exports.updateSample = async (req, res) => {
  try {
    const sampleId = req.params.id;
    let { title, author, publishYear } = req.body

    const sample = await Sample.findByIdAndUpdate(
      sampleId,
      {
        $set: { title, author, publishYear }
      },
      {
        new: true,
        timestamps: true,
      }
    );

    if (!req.body) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear'
      })
    }

    console.log(`${req.method} request successful`);
    res.status(200).send({
      message: 'Update successful',
      content: sample
    });

  } catch (error) {

    console.error(error.message);
    res.status(500).send('Server error');

  }
}

exports.deleteSample = async (req, res) => {
  try {

    const sampleId = req.params.id
    const sample = await Sample.findByIdAndDelete(sampleId)

    console.log(`${req.method} request successful`)

    return res.status(201).send({
      message: 'Sample deleted',
      content: sample
    })

  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}
