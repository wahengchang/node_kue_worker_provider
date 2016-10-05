var kue = require('./kue')



REDIS_CONN_TIMEOUT_MILLISECOND = 3000
REDIS_DNS = "viewer-redis.redis.cache.windows.net"
REDIS_PORT = 6380
REDIS_ACCESS_KEY = "hqPACs0xwUafEH5SX/9wO4w+2e9t2lgRg4qiNh6HQO0="


var queue = kue.createQueue({
    prefix: 'q',
    redis: {
        port: REDIS_PORT,
        host: REDIS_DNS,
        auth: REDIS_ACCESS_KEY,
        options: {
            connect_timeout: 3000
        }
    }
})



var job = queue.create('email', {
    title: 'welcome email for tj',
    to: 'tj@learnboost.com',
    template: 'welcome-email'
}).save(function(err) {
    if (!err) console.log(job.id);
    else console.log(err)
});