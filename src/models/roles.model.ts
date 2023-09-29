import { Sequelize, DataTypes, Model } from "sequelize";

enum RoleName {
  Admin = "Admin",
  User = "User",
  Customer = "Customer",
}

class Role extends Model {
  public name!: RoleName;
  id: any;
}

export const RoleModel = (sequelizeClient: Sequelize) => {
  Role.init(
    {
      name: {
        type: DataTypes.ENUM(...Object.values(RoleName)),
        allowNull: false,
      },
    },
    {
      sequelize: sequelizeClient,
      modelName: "Role",
      tableName: "roles",
    }
  );

  return Role;
};
