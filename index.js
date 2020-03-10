const express = require('express');

const Hubs = require('./hubs/hubs-model.js');

const server = express();

//USE express.json
server.use(express.json());

//GET: /
server.get('/', (req, res) => {
  //SEND:
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

//GET: /api/hubs
server.get('/api/hubs', (req, res) => {
  //FIND:
  Hubs.find(req.query)
  //THEN:
  .then(hubs => {
    res.status(200).json(hubs);
  })
  //CATCH:
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hubs',
    });
  });
});

//GET: /api/hubs/:id
server.get('/api/hubs/:id', (req, res) => {
  //FINDBYID:
  Hubs.findById(req.params.id)
  //THEN:
  .then(hub => {
    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: 'Hub not found' });
    }
  })
  //CATCH:
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hub',
    });
  });
});

//POST: /api/hubs
server.post('/api/hubs', (req, res) => {
  //ADD:
  Hubs.add(req.body)
  //THEN:
  .then(hub => {
    res.status(201).json(hub);
  })
  //CATCH:
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the hub',
    });
  });
});

//DELETE: /api/hubs/:id
server.delete('/api/hubs/:id', (req, res) => {
  //REMOVE:
  Hubs.remove(req.params.id)
  //THEN:
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: 'The hub has been nuked' });
    } else {
      res.status(404).json({ message: 'The hub could not be found' });
    }
  })
  //CATCH:
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the hub',
    });
  });
});

//PUT: /api/hubs/:id
server.put('/api/hubs/:id', (req, res) => {
  const changes = req.body;
  //UPDATE:
  Hubs.update(req.params.id, changes)
  //THEN:
  .then(hub => {
    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: 'The hub could not be found' });
    }
  })
  //CATCH:
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the hub',
    });
  });
});

// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

//LISTEN:
server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
