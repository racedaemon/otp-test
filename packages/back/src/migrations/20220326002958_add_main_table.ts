import { Knex } from 'knex'


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', function (table) {
    table.string('id').notNullable().primary()
    table.string('name')
    table.timestamps(false, true)
  }).createTable('otps', function (table) {
    table.bigIncrements('id')
    table.string('user_id').notNullable()
    table.string('otp').notNullable()
    table.timestamp('start_timestamp').notNullable()
    table.timestamps(false, true)
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
  })
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema
    .dropTable('otps')
}

