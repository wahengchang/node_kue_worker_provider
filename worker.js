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

queue.process('email', function(job, done) {
    console.log("job.data",job.data)
    email(job.data.to, done);
});

queue.on('job enqueue', function(id, type){
  console.log( 'Job %s got queued of type %s', id, type );
}).on('job complete', function(id, result){
  kue.Job.get(id, function(err, job){
    if (err) return;
    job.remove(function(err){
      if (err) throw err;
      console.log('removed completed job #%d', job.id);
    });
  });
});

function email(address, done) {

    if (!(address)) {
        //done('invalid to address') is possible but discouraged 
        return done(new Error('invalid to address'));
    }
    // email send stuff... 
    done();
}