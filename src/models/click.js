module.exports = (sequelize, DataTypes) => {
  const Click = sequelize.define("Click", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    referrer: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    clickedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  Click.associate = (models) => {
    Click.belongsTo(models.Url, {
      foreignKey: "urlId",
      as: "url"
    });
  };

  return Click;
};
