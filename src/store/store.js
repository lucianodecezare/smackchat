import Vue from 'vue';

import { firebaseAuth, firebaseDb } from 'boot/firebase';

const state = {
  userDetails: {},
  users: {}
};

const getters = {
  users: (state) => {
    const filteredUsers = {};
    
    Object.keys(state.users).forEach((key) => {
      if (key !== state.userDetails.userId) {
        filteredUsers[key] = state.users[key];
      }
    });

    return filteredUsers;
  }
};

const actions = {
  firebaseGetUsers({ commit }) {
    firebaseDb.ref('users').on('child_added', (snapshot) => {
      const userDetails = snapshot.val();
      const userId = snapshot.key;

      commit('addUser', { userId, userDetails });
    });

    firebaseDb.ref('users').on('child_changed', (snapshot) => {
      const userDetails = snapshot.val();
      const userId = snapshot.key;

      commit('updateUser', { userId, userDetails });
    });
  },
  async firebaseUpdateUser({}, payload) {
    const { updates, userId } = payload;

    await firebaseDb.ref(`users/${userId}`).update(updates);
  },
  handleAuthStateChanged({ commit, dispatch, state }) {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        // User are logged in.
        const userId = firebaseAuth.currentUser.uid;

        firebaseDb.ref(`users/${userId}`).once('value', (snapshot) => {
          const { email, name } = snapshot.val();

          commit('setUserDetails', { email, name, userId });
        });

        // Update user status to online.
        dispatch('firebaseUpdateUser', {
          userId,
          updates: {
            online: true
          }
        });

        // Get users
        dispatch('firebaseGetUsers');
        
        // #TODO: Improve redirection
        // Avoiding redundant navigation
        if (this.$router.app.$route.fullPath !== '/') {
          this.$router.push('/');
        }
      } else {
        // User is logged out.
        // Update user status to offline.
        dispatch('firebaseUpdateUser', {
          userId: state.userDetails.userId,
          updates: {
            online: false
          }
        });

        commit('setUserDetails', {});

        // #TODO: Improve redirection
        // Avoiding redundant navigation
        if (this.$router.app.$route.fullPath !== '/auth') {
          this.$router.replace('/auth');
        }
      }
    })
  },
  async loginUser({}, payload) {
    const { email, password } = payload;

    await firebaseAuth.signInWithEmailAndPassword(
      email,
      password
    ).catch((error) => console.error(error.message));
  },
  async logoutUser() {
    await firebaseAuth.signOut();
  },
  async registerUser({}, payload) {
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
  },
};

const mutations = {
  addUser(state, payload) {
    const { userDetails, userId } = payload;

    Vue.set(state.users, userId, userDetails);
  },
  setUserDetails(state, payload) {
    state.userDetails = payload;
  },
  updateUser(state, payload) {
    const { userId, userDetails } = payload;

    Object.assign(state.users[userId], userDetails);
  }
};

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}