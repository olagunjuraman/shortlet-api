import { createClient, RedisClientType } from 'redis';
import logger from '../utils/logger';
class RedisClient {
private static instance: RedisClient;
public client: RedisClientType;
private constructor() {
this.client = createClient({
url: process.env.REDIS_URL ,
password: process.env.REDIS_PASSWORD

});

console.log(process.env.REDIS_URL)

this.client.on('error', (err) => logger.error('Redis Client Error', err));
}

public static getInstance(): RedisClient {
if (!RedisClient.instance) {
RedisClient.instance = new RedisClient();
}
return RedisClient.instance;
}
public async connect(): Promise<void> {
await this.client.connect();
}
public async quit(): Promise<void> {
await this.client.quit();
}
}
export const redisClient = RedisClient.getInstance();