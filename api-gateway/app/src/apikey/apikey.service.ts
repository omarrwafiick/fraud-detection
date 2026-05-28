import { Injectable } from '@nestjs/common';
import { RedisInstance } from '../common/redis/redis.client';
import { randomBytes } from 'node:crypto';

@Injectable()
export class ApikeyService {
    private readonly redisInstance = RedisInstance.get();
    createKey(userId: string){
        const key = `apikey:${userId}`;
        const hasKey = this.redisInstance.get(key);

        if(!hasKey){
            const newKey = this.generateKey();
            this.redisInstance.set(key, newKey);
            return { key: newKey };
        }
        
        return { key: hasKey }
    }

    private generateKey(){
        return randomBytes(32).toString('hex');
    }
}
