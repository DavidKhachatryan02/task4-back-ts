import { Sequelize, DataTypes, Model } from "sequelize";

class ProductImage extends Model {
  public productId!: number;
  public imgUrl!: string
}

export const ProductImgModel = (sequelizeClient: Sequelize) => {
  ProductImage.init(
    {
      productId: { type: DataTypes.INTEGER, allowNull: false },
      imgUrl: { type: DataTypes.STRING },
    },
    {
      sequelize: sequelizeClient,
      modelName: "ProductImage",
      tableName: "product_Images",
    }
  );

  return ProductImage;
};
