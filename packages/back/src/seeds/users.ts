import { Knex } from 'knex'
import { faker } from '@faker-js/faker'

export async function seed(knex: Knex): Promise<void> {
  const fakeUsers = Array.from({ length: 10 }, () => ({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
  }))
  // Deletes ALL existing entries
  await knex('users').del()

  // Inserts seed entries
  await knex('users').insert([...fakeUsers, { id: 'test1', name: 'test1' }])
}
