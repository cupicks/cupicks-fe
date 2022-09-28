import { useJwt } from "react-jwt";

/** 로컬 스토리지에서 refreshToken 꺼내기 */
const getLocalRefreshToken = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  return refreshToken;
};

/** 로컬 스토리지에서 accessToken 꺼내기 */
const getLocalAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
};

/** 로컬 스토리지에 accessToken 넣기 */
const updateLocalAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

/** (추후 구현)토큰에서 유저 정보 꺼내기 */
const getUser = () => {
  const token = localStorage.getItem("refreshToken");
  const { decodedToken } = useJwt(token);

  return decodedToken;
};

/** (추후 구현)토큰에서 꺼낸 유저 정보를 저장 */
const setUser = (user) => {
  localStorage.setItem("user", user);
};

/** 로컬 스토리지의 유저 정보를 지우기 */
const removeUser = () => {
  localStorage.removeItem("user");
};

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;
