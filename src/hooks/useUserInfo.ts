import { create } from 'zustand';

type userInfoType = {
  id: string;
  nickname: string;
  email: string;
};

type UserInfoState = {
  userInfo: userInfoType;
};

type UserInfoActions = {
  setUserInfo: (userInfo: userInfoType) => void;
  deleteUserInfo: () => void;
};

const defaultState = { id: '', nickname: '', email: '' };

const useUserInfo = create<UserInfoState & UserInfoActions>((set) => ({
  userInfo: defaultState,
  setUserInfo: (userInfo: userInfoType) => {
    set({ userInfo });
  },
  deleteUserInfo: () => {
    set({ userInfo: defaultState });
  }
}));

export default useUserInfo;
