interface ROLE {
  id: number;
  RoleName: string;
}

interface IRoles {
  ADMIN: ROLE;
  CUSTOMER: ROLE;
  USER: ROLE;
}

const ROLES: IRoles = {
  ADMIN: {
    id: 1,
    RoleName: "Admin",
  },
  CUSTOMER: {
    id: 2,
    RoleName: "Customer",
  },
  USER: {
    id: 3,
    RoleName: "User",
  },
};

export default ROLES;
