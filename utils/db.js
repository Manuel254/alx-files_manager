const { MongoClient } = require("mongodb");

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || "localhost";
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || "files_manager";

    this.url = `mongodb://${this.host}:${this.port}`;
    this.client = new MongoClient(this.url, { useUnifiedTopology: true });
    this.connected = false;
    this.client
      .connect()
      .then(() => {
        this.connected = true;
      })
      .catch((err) => console.error(err));
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    await this.client.connect();
    const users = await this.client
      .db(this.database)
      .collection("users")
      .countDocuments();

    return users;
  }

  async nbFiles() {
    await this.client.connect();
    const files = await this.client
      .db(this.database)
      .collection("files")
      .countDocuments();

    return files;
  }
}

const dbClient = new DBClient();
export default dbClient;
