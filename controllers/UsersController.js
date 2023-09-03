const db = require('../utils/db');

const controller = {
  postNew: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email) {
        res.status(400).json({ error: 'Missing email' });
        res.end();
        return;
      }
      if (!password) {
        res.status(400).json({ error: 'Missing password' });
        res.end();
        return;
      }

      const user = await db.findUser(email);

      if (user) {
        res.status(400).json({ error: 'Already exist' });
        res.end();
        return;
      }

      const userId = await db.createUser(email, password);

      res.status(201).json({ id: userId, email });
      res.end();
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};

module.exports = controller;
