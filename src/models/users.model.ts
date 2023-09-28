import { Sequelize, DataTypes, Model } from "sequelize";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public refreshToken!: string | null;
  public accessToken!: string | null;
}

export const UserModel = (sequelizeClient: Sequelize) => {
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      accessToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize: sequelizeClient,
      modelName: "User",
      tableName: "users",
    }
  );

  return User;
};
