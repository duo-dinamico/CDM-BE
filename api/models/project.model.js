const connection = require("../../db/connection");

exports.fetchProjectByNumber = (project_number) => {
  return connection("projects").where(
    "project_number",
    project_number["project_number"]
  );
};

exports.deleteProjectByNumber = (project_number) => {
  return connection("projects")
    .where("project_number", project_number["project_number"])
    .del();
};


// exports.deleteProjectByNumber = (project_number) => {
//   connection("record_issues")
//     .where("project_number", project_number["project_number"])
//     .select("record_id")
//     .then((recordId) => {
//       // Delete Register
//       return connection("register")
//       .join("record_register", "record_register.register_id", "record_register.register_id")
//       .where("project_number", project_number["project_number"])
//       .del()
//       .then(() => {
      
//       // Delete record_register
//       return connection("record_register")
//         .where("record_id", recordId)
//         .del()
//         .then(() => {
//           // Delete Register
//           return connection("projects")
//             .where("project_number", project_number["project_number"])
//             .del()
//             .then(() => {
//               // Delete Record
//               return connection("projects")
//                 .where("project_number", project_number["project_number"])
//                 .del()
//                 .then(() => {
//                   // Delete project
//                   return connection("projects")
//                     .where("project_number", project_number["project_number"])
//                     .del();
//                 });
//             });
//         });
//     });
// };
