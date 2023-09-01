const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';

    this.url = `mongodb://${this.host}:${this.port}`;
    this.client = new MongoClient(this.url, { useUnifiedTopology: true });
    this.connected = false;
    this.client.connect().then(() => {
      this.connected = true;
    }).catch(err => console.error(err));
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    const db = this.client.db(this.database);
    const collection = db.collection('users');

    try {
      return await collection.countDocuments();
    } catch(err) {
      console.error(err);
      throw err;
    }
  }

  async nbFiles() {
    const db = this.client.db(this.database);
    const collection = db.collection('files');

    try {
      return await collection.countDocuments();
    } catch(err) {
      console.error(err);
      throw err;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
