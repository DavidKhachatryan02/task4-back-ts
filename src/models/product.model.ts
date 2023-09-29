import { Sequelize, DataTypes, Model } from "sequelize";

class Product extends Model {
  public name!: string;
  public price!: number;
  public description!: string;
}

export const ProductModel = (sequelizeClient: Sequelize) => {
  Product.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.INTEGER },
      description: { type: DataTypes.STRING },
    },
    {
      sequelize: sequelizeClient,
      modelName: "Products",
      tableName: "products",
    }
  );

  return Product;
};
