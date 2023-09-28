import { Sequelize, DataTypes, Model } from "sequelize";

class Card extends Model {
  public productId!: number;
  public userId!: number;
  public quantity!: number;
}

export const CardModel = (sequelizeClient: Sequelize) => {
  Card.init(
    {
      productId: { type: DataTypes.INTEGER },
      userId: { type: DataTypes.INTEGER },
      quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
    },
    {
      sequelize: sequelizeClient,
      modelName: "Card",
      tableName: "card",
    }
  );

  return Card;
};
