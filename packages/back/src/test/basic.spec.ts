import fastify from 'fastify'

import routes from '../routes/routes'

test('Get list of users', async () => {
  const app = fastify().register(routes)
  const response = await app.inject({
    method: 'GET',
    url: '/users'
  })
  expect(response.statusCode).toBe(200)
  expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
  console.log(response.payload)
  expect(response.payload?.length).toBeGreaterThan(1)
})

test('Create new OTP for missing user', async () => {
  const app = fastify().register(routes)
  const response = await app.inject({
    method: 'POST',
    url: '/users/generate_otp',
    payload: {
      UserId: 'test2',
      DateTime: '2020-01-01T00:00:00.000Z'
    }
  })
  expect(response.statusCode).toBe(401)
  expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
})

let code = ''
test('Create new OTP for existing user', async () => {
  const app = fastify().register(routes)
  const response = await app.inject({
    method: 'POST',
    url: '/users/generate_otp',
    payload: {
      UserId: 'test1',
      DateTime: new Date().toISOString()
    }
  })
  code = response.json().Code
  expect(response.statusCode).toBe(200)
  expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
})


test('test OTP', async () => {
  const app = fastify().register(routes)
  const response = await app.inject({
    method: 'POST',
    url: '/users/check_otp',
    payload: {
      UserId: 'test1',
      Code: code
    }
  })
  expect(response.statusCode).toBe(200)
  expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
})
