import { ref } from 'vue';
import { defineStore } from 'pinia';
import AuthService from '../service/auth';

const authService = new AuthService();

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('psg_user')) || {});
  const loggedIn = ref(!!localStorage.getItem('psg_auth_token'));

  const authToken = ref(localStorage.getItem('psg_auth_token'));

  async function setToken(token) {
    localStorage.setItem('psg_auth_token', token);
    authToken.value = token;


    const loggedUser = await authService.postUserToken(token);

    user.value = loggedUser;

 
    localStorage.setItem('psg_user', JSON.stringify(loggedUser));

    loggedIn.value = true;
  }

  function unsetToken() {
    localStorage.removeItem('psg_auth_token');
    localStorage.removeItem('psg_user');

    user.value = {};
    authToken.value = null;
    loggedIn.value = false;
  }

  async function updateUser(newUserData) {
    if (!authToken.value) return;

    const updatedUserData = await authService.updateUserData(
      user.value.id,
      newUserData,
      authToken.value
    );

    if (updatedUserData) {
      user.value = updatedUserData;
      localStorage.setItem('psg_user', JSON.stringify(updatedUserData));
    }
  }

  return {
    user,
    loggedIn,
    authToken,
    setToken,
    unsetToken,
    updateUser,
  };
});
