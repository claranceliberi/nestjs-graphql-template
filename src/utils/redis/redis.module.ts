import { CacheModule, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import * as redisStore from 'cache-manager-redis-store'
@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        ttl: 60 * 11,
        password: process.env.REDIS_PASS,
        tls: {}
      }),
    }),
  ],
  providers: [RedisService],
  exports: [RedisService]
})
export class RedisModule { }
