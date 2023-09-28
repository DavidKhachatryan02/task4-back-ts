"use strict";

import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: any): Promise<void> => {
    await queryInterface.addColumn("card", "quantity", {
      type: DataTypes.INTEGER,
    });
  },

  down: async (
    queryInterface: QueryInterface,
    Sequelize: any
  ): Promise<void> => {
    await queryInterface.removeColumn("card", "quantity");
  },
};
