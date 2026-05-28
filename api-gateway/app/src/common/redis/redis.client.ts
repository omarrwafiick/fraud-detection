import { createClient } from 'redis';

export class RedisInstance{
    private static redisClient;
    private constructor(){}

    public static get(){
        if(!this.redisClient){
            this.redisClient = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
            this.redisClient.connect().catch(console.error);
        }
        return this.redisClient;
    }
}