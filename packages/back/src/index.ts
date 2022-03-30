import Fastify from 'fastify'
import routes from './routes/routes'
import fastifyCors from 'fastify-cors'
const fastify = Fastify({
  logger: {
    prettyPrint: {
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname'
    }
  }
})

fastify.register(fastifyCors, {})

fastify.register(routes, { prefix: '/api/v1/' })

fastify.listen(3333, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
