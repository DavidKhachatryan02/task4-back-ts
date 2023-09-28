import { Sequelize, DataTypes, Model } from "sequelize";

class UsersOnRoles extends Model {
  public id!: number;
  public roleId!: number;
  public userId!: number;
}

export const UsersOnRolesModel = (sequelizeClient: Sequelize) => {
  UsersOnRoles.init(
    {
      roleId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
        },
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
        },
      },
    },
    {
      sequelize: sequelizeClient,
      modelName: "UsersOnRoles",
      tableName: "users_on_roles",
    }
  );

  return UsersOnRoles;
};
