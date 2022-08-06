exports.up = function(knex) {
    return knex.schema
        .createTable('users', (table) => {
            table.increments('id').primary();
            table.string('google_id').nullable();
            table.string('email').notNullable();
            table.string('password').nullable();
            table.string('picture').notNullable().defaultTo('https://picsum.photos/id/237/200/300');
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
            // table.json('list').notNullable();
            table.timestamp('updated_at').defaultTo(knex.fn.now());
            table
                .foreign('user_id')
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable('items', (table) => {
            table.increments('id').primary();
            table.integer('list_id').unsigned().notNullable();
            // table.string('label', 75 ).notNullable();
            table.text('item').notNullable();
            table.timestamp('updated_at').defaultTo(knex.fn.now());
            table
                .foreign('list_id')
                .references('id')
                .inTable('lists')
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
        .dropTable('items')
        .dropTable('lists')
        .dropTable('notes')
        .dropTable('users');
};
