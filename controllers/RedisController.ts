import {controller, httpGet, httpPost} from "inversify-express-utils"
import {Container, inject} from "inversify"
import {BASE_TYPES, ILogger} from "@curefit/base"
import {ICrudKeyValue, REDIS_TYPES} from "@curefit/redis-utils"


export function RedisControllerFactory(kernel: Container) {

    @controller("/redis")
    class RedisController {
        constructor(
            @inject(BASE_TYPES.ILogger) private logger: ILogger,
            @inject(REDIS_TYPES.RedisDao) private redisDao: ICrudKeyValue
        ) {
        }

        @httpGet("/get")
        public async getKey(request): Promise<{ data: string }> {
            const {key} = request.query
            return {data: await this.redisDao.read(key)}
        }

        @httpPost("/set")
        public async setKey(request): Promise<{ status: boolean }> {
            const {key, value} = request.body
            return {status: await this.redisDao.upsert(key, value)}
        }

        @httpPost("/setAndGet")
        public async setAndGet(request): Promise<{ data: any }> {
            const {key, value} = request.body
            await this.redisDao.upsert(key, JSON.stringify(value))
            return {data: JSON.parse(await this.redisDao.read(key))}
        }
    }

    return RedisController
}
