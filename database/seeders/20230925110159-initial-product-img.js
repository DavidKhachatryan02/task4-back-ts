"use strict";

import { models } from "../../src/services/sequelize";
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  const productName = "testProduct";

  const product = await models.Products.findOne({
    where: { name: productName },
    attributes: ["id"],
  });

  if (!product) return;

  await models.ProductImg.create({
    productId: product.id,
    imgUrl: "InitialImgUrl",
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("product_Images", null, {});
}
