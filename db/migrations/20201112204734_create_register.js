exports.up = function (knex) {
  return knex.schema.createTable("register", (registerTable) => {
    registerTable.string("project_number").notNullable();
    registerTable
      .foreign("project_number")
      .references("projects.project_number")
      .onDelete("CASCADE");
    registerTable.increments("register_id");
    registerTable.text("description").notNullable();
    registerTable.string("risk_status").notNullable();
    registerTable.string("discipline").notNullable();
    registerTable.string("revision").notNullable();
    registerTable.string("project_lifecycle_stage").notNullable();
    registerTable.boolean("hs_risk").defaultTo(false);
    registerTable.boolean("environmental_risk").defaultTo(false);
    registerTable.boolean("programme_risk").defaultTo(false);
    registerTable.boolean("other_risk").defaultTo(false);
    registerTable.integer("likelihood").notNullable();
    registerTable.integer("severity").notNullable();
    registerTable.string("relevant_documentation");
    registerTable.string("owner_of_risk").notNullable();
    registerTable.text("mitigation_action");
    registerTable.integer("likelihood_mitigated");
    registerTable.integer("severity_mitigation");
    registerTable.boolean("further_action_required").defaultTo(false);
    registerTable.string("identified_by").notNullable();
    registerTable.datetime("date", { useTz: true }).defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("register");
};
