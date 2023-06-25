
exports.up = knex => knex.schema.createTable("programs", table => {
    table.increments("id");
    table.text("name");
    table.text("food");
    table.integer("power");
    table.integer("time");
    table.text("caracter");
    table.text("instruction");
    table.integer("user_id").references("id").inTable("users");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());

});

exports.down = knex => knex.schema.fropTable("Programs");