import router from "@/router";
import store from "@/store";
import AUTHORITY_ENUM from "@/authority/authorityEnum";
import checkAuthority from "@/authority/checkAuthority";

router.beforeEach(async (to, from, next) => {
  let loginUser = store.state.user.loginUser;
  // 如果之前没登录过，自动登录
  if (!loginUser || !loginUser.userRole) {
    // 加 await 是为了等用户登录成功之后，再执行后续的代码
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser;
  }
  const needAuthority =
    (to.meta?.authority as string) ?? AUTHORITY_ENUM.NOT_LOGIN;
  // 要跳转的页面必须要登录
  if (needAuthority !== AUTHORITY_ENUM.NOT_LOGIN) {
    // 如果没有登录，就强制跳转到登录页面
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === AUTHORITY_ENUM.NOT_LOGIN
    ) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    // 如果已经登录了，但是权限不足，那么就要跳转到无权限页面
    if (!checkAuthority(loginUser, needAuthority)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
