// Coloque aqui suas actions
export const USER_INFOS = 'MODIFY_USER_INFOS';

export const userInfos = (email) => (
  {
    type: USER_INFOS,
    email,
  }
);
