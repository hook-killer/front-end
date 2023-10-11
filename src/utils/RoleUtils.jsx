/**
 * RoleUtils.roleCheck('Role Value')
 */
class RoleUtils {
  roleCheck(role) {
    if (!role) {
      return;
    }
    if (role.includes("ADMIN")) {
      return "admin";
    }
    if (role.includes("USER")) {
      return "user";
    }
  }
}

export default new RoleUtils();
