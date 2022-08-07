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
            table.text('item').notNullable();
            table.timestamp('updated_at').defaultTo(knex.fn.now());
            table
                .foreign('user_id')
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable('details', (table) => {
            table.increments('id').primary();
            table.integer('user_id').unsigned().notNullable();
            table.string('label', 75 ).notNullable();
            table.text('detail').notNullable();
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
        .dropTable('details')
        .dropTable('lists')
        .dropTable('notes')
        .dropTable('users');
};
