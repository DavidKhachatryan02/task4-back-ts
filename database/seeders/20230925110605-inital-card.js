"use strict";

import { models } from "../../src/services/sequelize";
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  const userEmail = "test@test.com";
  const productName = "testProduct";

  const user = await models.User.findOne({
    where: { email: userEmail },
    attributes: ["id"],
  });
  const product = await models.Products.findOne({
    where: { name: productName },
    attributes: ["id"],
  });

  if (!user || !product) return;

  const initialCard = await models.Card.findOne({
    where: { userId: user.id },
  });

  if (initialCard) return;

  await models.Card.create({
    productId: product.id,
    userId: user.id,
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("card", null, {});
}
