import AUTHORITY_ENUM from "@/authority/authorityEnum";

/**
 * 权限校验（判断当前用户是拥有何种权限）
 * @param loginUser 当前登录用户
 * @param needWhichAuthority 需要哪种权限
 */
const checkAuthority = (
  loginUser: any,
  needWhichAuthority = AUTHORITY_ENUM.NOT_LOGIN
) => {
  // 获取当前登录用户拥有的权限(如果没有loginUser,则表示未登录)
  const loginUserAuthority = loginUser?.userRole ?? AUTHORITY_ENUM.NOT_LOGIN;
  if (needWhichAuthority === AUTHORITY_ENUM.NOT_LOGIN) {
    return true;
  }
  // 如果不需要管理员权限，用户登录才能访问
  if (needWhichAuthority === AUTHORITY_ENUM.USER) {
    // 如果未登录，表示无权限
    if (loginUser === AUTHORITY_ENUM.NOT_LOGIN) {
      return false;
    }
  }
  // 如果需要管理员权限
  if (needWhichAuthority === AUTHORITY_ENUM.ADMIN) {
    // 判断权限，如果不是管理员则无权限
    if (loginUserAuthority !== AUTHORITY_ENUM.ADMIN) {
      return false;
    }
  }
  return true;
};

export default checkAuthority;
