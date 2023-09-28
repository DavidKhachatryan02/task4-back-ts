import { Sequelize } from "sequelize";
import { dialect } from "../constants/config";
import { DB_URL } from "../constants/env";

// Sequelize models
import { RoleModel } from "../models/roles.model";
import { UserModel } from "../models/users.model";
import { UsersOnRolesModel } from "../models/users_on_roles.model";
import { CardModel } from "../models/card.model";
import { ProductImgModel } from "../models/product_Images.model";
import { ProductModel } from "../models/product.model";

const config = {
  logging: false,
  dialect,
  define: { freezeTableName: true },
};

const sequelize = new Sequelize(DB_URL, config);

// Model initiations

const User = UserModel(sequelize);
const Role = RoleModel(sequelize);
const UsersOnRoles = UsersOnRolesModel(sequelize);
const Card = CardModel(sequelize);
const Products = ProductModel(sequelize);
const ProductImg = ProductImgModel(sequelize);

// Model associations

User.belongsToMany(Role, {
  through: UsersOnRoles,
  foreignKey: "userId",
});
Role.belongsToMany(User, {
  through: UsersOnRoles,
  foreignKey: "roleId",
});

Products.hasMany(ProductImg, { as: "imgUrl", foreignKey: "productId" });
ProductImg.belongsTo(Products, { foreignKey: "productId" });

Card.belongsTo(Products, { foreignKey: "productId" });
Card.belongsTo(User, { foreignKey: "userId" });
Products.hasMany(Card, { foreignKey: "productId" });
User.hasMany(Card, { foreignKey: "userId" });

export const models = {
  User,
  Role,
  UsersOnRoles,
  Card,
  Products,
  ProductImg,
};

export default sequelize;
