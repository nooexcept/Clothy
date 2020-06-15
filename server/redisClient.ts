import redis from 'redis'

const redisClient = redis.createClient({ host: 'redis' })
export default redisClient
