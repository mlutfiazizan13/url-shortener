module.exports = (sequelize, DataTypes) => {
  const Url = sequelize.define("Url", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    originalUrl: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    shortCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });

  Url.associate = (models) => {
    Url.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user"
    });

    Url.hasMany(models.Click, {
      foreignKey: "urlId",
      as: "clicks",
      onDelete: "CASCADE"
    });
  };

  return Url;
};
