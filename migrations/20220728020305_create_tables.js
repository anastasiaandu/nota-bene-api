exports.up = function(knex) {
    return knex.schema
        .createTable('users', (table) => {
            table.increments('id').primary();
            table.integer('google_id').nullable();
            table.string('email').notNullable();
            table.string('password').notNullable();
            table.string('avatar_url').notNullable();
            table.string('username').notNullable();
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
        .createTable('notes', (table) => {
            table.increments('id').primary();
            table.integer('user_id').unsigned().notNullable();
            table.string('label', 75 ).notNullable();
            table.text('note').notNullable();
            table.timestamp('updated_at').defaultTo(knex.fn.now());
            table
            .foreign('user_id')
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        })
        .createTable('lists', (table) => {
            table.increments('id').primary();
            table.integer('user_id').unsigned().notNullable();
            table.string('label', 75 ).notNullable();
            table.text('list').notNullable();
            table.timestamp('updated_at').defaultTo(knex.fn.now());
            table
            .foreign('user_id')
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        })
        .createTable('files', (table) => {
            table.increments('id').primary();
            table.integer('user_id').unsigned().notNullable();
            table.string('label', 75 ).notNullable();
            table.text('file').notNullable();
            table.timestamp('updated_at').defaultTo(knex.fn.now());
            table
            .foreign('user_id')
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        });
};


exports.down = function(knex) {
    return knex.schema
        .dropTable('files')
        .dropTable('lists')
        .dropTable('notes')
        .dropTable('users');
};
