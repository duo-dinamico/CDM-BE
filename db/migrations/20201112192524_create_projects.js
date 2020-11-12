exports.up = function(knex) {
    return knex.schema.createTable("projects", (projectsTable) => {
        projectsTable.string("project_number").unique().primary();
        projectsTable.string("project_title").notNullable();
        projectsTable.string("project_lead_office").notNullable();
        projectsTable.string("client");
        projectsTable.string("stage").notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("projects");
};