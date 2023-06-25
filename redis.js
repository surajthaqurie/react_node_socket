const redis = require("redis");

const redisConfig = {
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
};

const redisClient = redis.createClient({
  url: `redis://${redisConfig.REDIS_HOST}:${redisConfig.REDIS_PORT}`,
});

redisClient.on("connect", () => {
  console.info(
    `Redis Connected at ${redisConfig.REDIS_HOST}:${redisConfig.REDIS_PORT}`
  );
});

redisClient.on("error", (err) => {
  console.log("Something went wrong on redis client " + err);
});

/* 
hash: name of collection (table),
key: id,
dataToSave: data to save
*/

const setData = (hash, dataToSave) => {
  redisClient.SETEX(hash, 100, JSON.stringify(dataToSave));
};

const hSetData = (hash, key, dataToSave) => {
  return new Promise((resolve, reject) => {
    redisClient.HSET(hash, key, JSON.stringify(dataToSave), (err, res) => {
      resolve(res);
    });
  });
};

// const

exports.getData = (hash, key) => {};

exports.expireData = (hash, time) => {
  redisClient.EXPIRE(hash, parseInt(time));
};

module.exports = redisClient;
module.exports.setData = setData;
module.exports.hSetData = hSetData;

// https://www.sitepoint.com/using-redis-node-js/
// redisinsight
