const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  logging: false,
  define: {
    underscored: true
  },
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  }
});

const db = {};
const modelsDir = path.join(__dirname);

// Auto-load all models
fs.readdirSync(modelsDir)
  .filter((file) => file !== "db.js" && file.endsWith(".js"))
  .forEach((file) => {
    const model = require(path.join(modelsDir, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// Run model associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
