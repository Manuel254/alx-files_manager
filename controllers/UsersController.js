const db = require('../utils/db');

const controller = {
  postNew: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email) {
        res.status(400).json({ error: 'Missing email' });
      } else if (!password) {
        res.status(400).json({ error: 'Missing password' });
      }

      const user = await db.findUser(email);

      if (user) {
        res.status(400).json({ error: 'Already exist' });
      }

      const userId = await db.createUser(email, password);

      res.status(201).json({ id: userId, email });
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};

module.exports = controller;
