"use strict";
import { models } from "../../src/services/sequelize";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  const initialProduct = await models.Products.findOne({
    where: {
      name: "testProduct",
    },
  });

  if (initialProduct) return;

  await models.Products.create({
    name: "testProduct",
    description: "Test product description",
    price: 123,
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("products", null, {});
}
