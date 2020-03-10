exports.up = function(knex) {
  return knex.schema
  //HUBS TABLE
    .createTable('hubs', tbl => {
      //ID:
      tbl
      .increments();

      //NAME Field:
      tbl
      .string('name')
      .notNullable();

      //TIMESTAMPS Field:
      tbl
      .timestamps(true, true);

      //UNIQUE NAME Field
      tbl
      .unique('name');
    })

  //MESSAGES TABLE
    .createTable('messages', tbl => {
      //ID:
      tbl
      .increments();

      //SENDER Field:
      tbl
      .string('sender')
      .notNullable()
      .index();

      //TEXT Field:
      tbl
      .text('text')
      .notNullable();

      //TIMESTAMP Field:
      tbl
      .timestamps(true, true);

      //HUB_ID Field:
      tbl
      .integer('hub_id')
      .unsigned()
      .references('id')
      .inTable('hubs')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('messages').dropTableIfExists('hubs');
};
