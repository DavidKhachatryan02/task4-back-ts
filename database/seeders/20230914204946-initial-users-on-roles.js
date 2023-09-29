"use strict";

const { models } = require("../../src/services/sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userEmail = "test@test.com";

    const user = await models.User.findOne({
      where: { email: userEmail },
      attributes: ["id"],
    });
    const role = await models.Role.findOne({
      where: { name: "Admin" },
      attributes: ["id"],
    });

    if (!user || !role) return;

    const initialUsersOnRoles = await models.UsersOnRoles.findOne({
      where: { userId: user.id },
    });

    if (initialUsersOnRoles) return;

    await models.UsersOnRoles.create({
      roleId: role.id,
      userId: user.id,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users_on_roles", null, {});
  },
};
