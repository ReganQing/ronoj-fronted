// 初始化state
import { StoreOptions } from "vuex";
import AUTHORITY_ENUM from "@/authority/authorityEnum";
import { UserControllerService } from "../../generated";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
    },
  }),
  actions: {
    async getLoginUser({ commit, state }, userState) {
      // 从远程请求获取用户信息
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: AUTHORITY_ENUM.NOT_LOGIN,
        });
      }
    },
  },
  mutations: {
    updateUser(state, userState) {
      state.loginUser = userState;
    },
  },
} as StoreOptions<any>;
