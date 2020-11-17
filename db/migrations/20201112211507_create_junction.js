exports.up = function(knex) {
    return knex.schema.createTable("record_register", (record_registerTable) => {
        record_registerTable.increments("record_register_id");
        record_registerTable.integer("record_id").references("record_id").inTable("record_issues").onDelete("CASCADE");
        record_registerTable.integer("register_id").references("register_id").inTable("register").onDelete("CASCADE");
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable("record_register");
};
