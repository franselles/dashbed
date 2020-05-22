<template>
  <div>
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="@/assets/logo.png" alt="dashbed logo" />
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item tag="router-link" :to="{ path: '/dash' }">
          HOME
        </b-navbar-item>
        <b-navbar-item href="#">
          RESERVAS
        </b-navbar-item>
        <b-navbar-dropdown label="DISEÑO">
          <b-navbar-item tag="router-link" :to="{ path: '/sectoredit' }">
            EDITAR SECTOR SECTOR
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/editor' }">
            DISEÑO SECTOR
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/createitems' }">
            INSERTAR ITEMS
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <router-link class="button is-danger" :to="{ path: '/' }">
              <strong>SALIR</strong>
            </router-link>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'dash',
  data() {
    return {};
  },
  methods: {
    checkIn() {
      this.$router.push({ name: 'citybeaches' });
    },

    checkTicket() {
      this.$router.push({ name: 'checkticket' });
    },

    create() {
      this.$router.push({ name: 'createitems' });
    },

    booked() {
      // this.$router.push({ name: 'checkticket' });
    },

    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped></style>
