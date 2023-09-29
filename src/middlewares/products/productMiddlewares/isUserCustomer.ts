// import { Request, Response, NextFunction } from "express";
// import CUSTOMER from "../../../constants/roles";
// import { UserNotExists, IsNotCustomer } from "../../../errors/auth";
// import { models } from "../../../services/sequelize";

// export const isUserCustomer = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const email = req.user.data;
//     const user = await models.users.findOne({
//       where: { email },
//       include: {
//         model: models.roles,
//       },
//     });

//     if (!user) {
//       return next(new UserNotExists(email));
//     }

//     const userRoles = user.roles.map((role) => role.id);

//     if (!userRoles.includes(CUSTOMER.id)) {
//       return next(new IsNotCustomer());
//     }

//     next();
//   } catch (e) {
//     console.error(
//       `[middleware]: Error on isUserCustomer middleware error => ${e}`
//     );
//     next(e);
//   }
// };
