module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Url, {
      foreignKey: "userId",
      as: "urls",
      onDelete: "CASCADE"
    });
  };

  User.hashPassword = async (password) => {
    const bcrypt = require("bcrypt");
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  User.prototype.validatePassword = async function (password) {
    const bcrypt = require("bcrypt");
    return await bcrypt.compare(password, this.passwordHash);
  }

  return User;
};
