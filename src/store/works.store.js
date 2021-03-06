import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    stateSector: [],
    sectors: [],
    cities: [],
    beaches: [],
    dateActual: null,
    cityActual: null,
    beachActual: null,
    sectorActual: null,
    sectorIDActual: 1,
    typeIDActual: 9,
    itemToEdit: null,
  },
  mutations: {
    setStateSector(state, payload) {
      state.stateSector = payload;
    },
    resetStateSector(state) {
      state.stateSector = [];
    },
    setSectors(state, payload) {
      state.sectors = payload;
    },
    resetSectors(state) {
      state.sectors = [];
    },
    setBeaches(state, payload) {
      state.beaches = payload;
    },
    resetBeaches(state) {
      state.beaches = [];
    },
    setBeachActual(state, payload) {
      state.beachActual = payload;
    },
    resetBeachActual(state) {
      state.beachActual = null;
    },
    setSectorActual(state, payload) {
      state.sectorActual = payload;
    },
    resetSectorActual(state) {
      state.sectorActual = null;
    },
    setSectorIDActual(state, payload) {
      state.sectorIDActual = payload;
    },
    resetSectorIDActual(state) {
      state.sectorIDActual = null;
    },
    setDateActual(state, payload) {
      state.dateActual = payload;
    },
    resetDateActual(state) {
      state.dateActual = null;
    },
    getCities(state, payload) {
      state.cities = payload;
    },
    setCityActual(state, payload) {
      state.cityActual = payload;
    },
    resetCityActual(state) {
      state.cityActual = null;
    },
    setTypeIDActual(state, payload) {
      state.typeIDActual = payload;
    },
    resetTypeIDActual(state) {
      state.typeIDActual = null;
    },
    setItemToEdit(state, payload) {
      state.itemToEdit = payload;
    },
  },
  actions: {
    async postItems(context, payload) {
      try {
        const data = await Vue.axios({
          method: 'post',
          url: 'items',
          data: payload,
        });
        if (data) {
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async postItem(context, payload) {
      try {
        const data = await Vue.axios({
          method: 'post',
          url: 'item',
          data: payload,
        });
        if (data) {
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async putItem(context, payload) {
      try {
        const data = await Vue.axios({
          method: 'put',
          url: 'item',
          data: payload,
          params: {
            id: payload._id,
          },
        });
        if (data.data) {
          return data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async deleteItem(context, payload) {
      try {
        const data = await Vue.axios({
          method: 'delete',
          url: 'item',
          params: {
            id: payload._id,
          },
        });
        if (data.data) {
          return data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async putSector(context, payload) {
      try {
        const data = await Vue.axios({
          method: 'put',
          url: 'sector',
          data: payload,
          params: {
            id: payload._id,
          },
        });
        if (data.data) {
          return data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async postSector(context, payload) {
      try {
        const data = await Vue.axios({
          method: 'post',
          url: 'sector',
          data: payload,
        });
        if (data.data) {
          return data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async putItems(context, payload) {
      try {
        const data = await Vue.axios({
          method: 'put',
          url: 'items',
          data: payload,
        });
        if (data.data) {
          return data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getCities({ commit }) {
      try {
        const data = await Vue.axios({
          method: 'get',
          url: 'cities',
        });

        if (data.data) {
          await commit('getCities', data.data);
          return data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getItems(context, payload) {
      try {
        const data = await Vue.axios({
          method: 'get',
          url: 'items',
          params: {
            cityID: payload.cityID,
            beachID: payload.beachID,
            sectorID: payload.sectorID,
          },
        });
        if (data.data) {
          return data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async deleteItems(context, payload) {
      try {
        const data = await Vue.axios({
          method: 'delete',
          url: 'items',
          params: {
            cityID: payload.cityID,
            beachID: payload.beachID,
            sectorID: payload.sectorID,
          },
        });
        if (data.data) {
          return data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getSectors({ commit }, payload) {
      try {
        const data = await Vue.axios({
          method: 'get',
          url: 'sectors',
          params: {
            cityID: payload.cityID,
            beachID: payload.beachID,
          },
        });
        if (data.data) {
          commit('setSectors', data.data);
          return data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getBeaches({ commit }, payload) {
      try {
        const data = await Vue.axios({
          method: 'get',
          url: 'beaches',
          params: {
            cityID: payload,
          },
        });
        if (data.data) {
          commit('setBeaches', data.data);
          return data.data;
        }
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },

    async getSector({ commit }, payload) {
      try {
        const data = await Vue.axios({
          method: 'get',
          url: 'sector',
          params: {
            cityID: payload.cityID,
            beachID: payload.beachID,
            sectorID: payload.sectorID,
          },
        });

        if (data.data) {
          await commit('setSectorActual', data.data);
          return data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getStateSector({ commit }, payload) {
      try {
        const data = await Vue.axios({
          method: 'get',
          url: 'state',
          params: {
            cityID: payload.cityID,
            beachID: payload.beachID,
            sectorID: payload.sectorID,
            typeID: payload.typeID,
            date: payload.date,
          },
        });
        if (data.data) {
          await commit('setStateSector', data.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {},
};
