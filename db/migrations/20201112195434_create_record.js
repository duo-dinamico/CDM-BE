
exports.up = function(knex) {
    return knex.schema.createTable("record_issues", (recordsTable) => {
        recordsTable.increments("record_id");
        recordsTable.string("project_number").references("project_number").inTable("projects").onDelete("CASCADE");
        recordsTable.string("version_number").notNullable();
        recordsTable.string("stage_issued").notNullable();
        recordsTable.string("purpose").notNullable();
        recordsTable.datetime("date", {useTz:true}).defaultTo(knex.fn.now());
        recordsTable.string("prepared").notNullable();
        recordsTable.string("checked").notNullable();
        recordsTable.string("approved").notNullable();
        recordsTable.string("remarks");
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable("record_issues");
};
