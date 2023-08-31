import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();

    this.client.on('error', (error) => {
      console.error(error);
    });
  }

  isAlive() {
    return this.client.connect;
  }

  async get(key) {
    const getData = promisify(this.client.get).bind(this.client);

    try {
      return await getData(key);
    } catch(err) {
      console.error(err);
    }
  }

  async set(key, value, duration) {
    const setData = promisify(this.client.set).bind(this.client);

    try {
      await setData(key, value, 'EX', duration);
    } catch(err) {
      console.error(err);
    }
  }

  async del(key) {
    const delData = promisify(this.client.del).bind(this.client);

    try {
      await delData.del(key);
    } catch(err) {
      console.error(err);
    }
  }
}

export default new RedisClient();
