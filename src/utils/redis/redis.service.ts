import cuid from 'cuid';

import { CacheModule, Module } from '@nestjs/common';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'

@Injectable()
export class RedisService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) { }

    confirmEmailLink = async (userId: string) => {
        const id = cuid();

        await this.cacheManager.set(`${id}`, userId, { ttl: 60 * 60 * 2 });
        return `${process.env.FRONTEND_HOST}?code=$${id}`;
    };

    resetPasswordLink = async (userId: string) => {
        const id = cuid();
        await this.cacheManager.set(`${id}`, userId, { ttl: 60 * 60 * 2 });
        return `${process.env.FRONTEND_HOST}?code=$${id}`;
    };

    resetPasswordSecurity = async (userId: string) => {
        const id = cuid();
        await this.cacheManager.set(`${id}`, userId, { ttl: 60 * 60 * 2 });
        return `${process.env.FRONTEND_HOST}?code=${id}`;
    };

    get = async (id: string) => {
        const result = await this.cacheManager.get(id);
        return result;
    }

    delete = async (id: string) => {
        await this.cacheManager.del(id);
    }
}
