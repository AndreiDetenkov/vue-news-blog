const express = require('express');
const User = require('../models/user');

const createRouter = () => {
  const router = express.Router();

  router.post('/create', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).send({ message: 'Username and Password are required' });
    if (password.length < 6)
      return res.status(400).send({ message: 'Password must be more than 6 characters.' });

    const user = await User.findOne({ username });
    if (user)
      return res.status(400).send({ message: `The user "${username}" - has already existed.` });
    else {
      try {
        const user = await new User({ username, password });
        const result = await user.save();
        if (result) res.send({ message: `User "${result.username}" - created successfully.` });
      } catch (e) {
        return res.status(400).send({ message: 'Error. Unable to create new user.', error: e });
      }
    }
  });

  router.get('/list', async (req, res) => {
    try {
      const users = await User.find();
      if (users) return res.send(users);
    } catch (error) {
      return res.status(404).send({ message: 'There are not any users.' });
    }
  });

  router.delete('/remove/:id', async (req, res) => {
    const id = req.params.id;
    // TODO: add validation - do not remove user if the user uses in article
    try {
      const result = await User.findByIdAndRemove(id);
      if (result) res.status(200).send({message: 'The User removed successfully.'});
      else return res.status(404).send({ message: `The User not found.` });
    } catch (e) {
      return res.status(400).send({ message: 'Error. Unable to removed the user.' });
    }
  });

  return router;
};
module.exports = createRouter;