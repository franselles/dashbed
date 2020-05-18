<template>
  <div>
    <b-field label="cityID">
      <b-input type="number" v-model="sectorLocal.cityID"></b-input>
    </b-field>
    <b-field label="city">
      <b-input v-model="sectorLocal.city"></b-input>
    </b-field>
    <b-field label="beachID">
      <b-input type="number" v-model="sectorLocal.beachID"></b-input>
    </b-field>
    <b-field label="beach">
      <b-input v-model="sectorLocal.beach"></b-input>
    </b-field>
    <b-field label="sectorID">
      <b-input type="number" v-model="sectorLocal.sectorID"></b-input>
    </b-field>
    <b-field label="sector">
      <b-input v-model="sectorLocal.sector"></b-input>
    </b-field>
    <b-field label="Descripcion">
      <b-input v-model="sectorLocal.description"></b-input>
    </b-field>
    <b-field label="Posicion X">
      <b-input type="number" v-model="sectorLocal.positionX"></b-input>
    </b-field>
    <b-field label="Posicion Y">
      <b-input type="number" v-model="sectorLocal.positionY"></b-input>
    </b-field>
    <b-field label="Imagen 1">
      <b-input v-model="sectorLocal.image1"></b-input>
    </b-field>
    <b-field label="Imagen 2">
      <b-input v-model="sectorLocal.image2"></b-input>
    </b-field>
    <b-field label="COLS">
      <b-input type="number" v-model="sectorLocal.cols"></b-input>
    </b-field>
    <b-field label="ROWS">
      <b-input type="number" v-model="sectorLocal.rows"></b-input>
    </b-field>
    <b-field label="Blocked">
      <b-checkbox v-model="sectorLocal.blocked">
        Bloqueado
      </b-checkbox>
    </b-field>

    <b-field>
      <b-button type="is-info" expanded @click="updateSector()"
        >ACTUALIZA SECTOR</b-button
      >
    </b-field>
    <b-field>
      <b-button type="is-danger" expanded @click="insertSector()"
        >INSERTA NUEVO SECTOR</b-button
      >
    </b-field>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'sectordetail',
  data() {
    return {
      sectorLocal: {
        cityID: 1,
        city: '',
        beachID: 1,
        beach: '',
        sectorID: 1,
        sector: '',
        description: '',
        positionX: 0,
        positionY: 0,
        image1: '',
        image2: '',
        cols: 0,
        rows: 0,
        blocked: false,
      },
    };
  },

  methods: {
    ...mapActions('worksStore', ['postSector', 'putSector']),

    updateSector() {
      this.putSector(this.sectorLocal).then(() => {
        console.log('updated');
      });
    },

    insertSector() {
      this.postSector(this.sectorLocal).then(() => {
        console.log('inserted');
        this.$emit('refresh-sectors');
      });
    },

    refresh() {
      this.sectorLocal = this.sectorActual;
    },
  },

  computed: {
    ...mapState('worksStore', ['sectorActual']),
  },
};
</script>

<style scoped></style>
