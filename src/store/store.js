import { firebaseAuth, firebaseDb } from 'boot/firebase';

const state = {};
const getters = {};
const actions = {
  async loginUser({}, payload) {
    const { email, password } = payload;

    const login = await firebaseAuth.signInWithEmailAndPassword(
      email,
      password
    ).catch((error) => console.error(error.message));
  },
  async registerUser({}, payload){
    const { email, name, password } = payload;

    const auth = await firebaseAuth.createUserWithEmailAndPassword(
      email,
      password
    ).catch((error) => console.error(error.message));

    if (auth) {
      const userId = firebaseAuth.currentUser.uid;

      await firebaseDb.ref(`users/${userId}`).set({
        name,
        email,
        online: true
      });
    }
  }
};
const mutations = {};

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}