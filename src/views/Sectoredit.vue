<template>
  <div>
    <b-field label="CIUDAD">
      <b-select
        placeholder="Select a name"
        v-model="sectorLocal.cityID"
        @change.native="selectCity($event)"
      >
        <option
          v-for="option in cities"
          :value="option.cityID"
          :key="option.id"
        >
          {{ option.city }}
        </option>
      </b-select>
    </b-field>

    <b-field label="PLAYA">
      <b-select
        placeholder="Select a name"
        v-model="sectorLocal.beachID"
        @change.native="selectBeach($event)"
      >
        <option
          v-for="option in beaches"
          :value="option.beachID"
          :key="option.id"
        >
          {{ option.beach }}
        </option>
      </b-select>
    </b-field>

    <b-field label="SECTORS">
      <b-select
        placeholder="Select a name"
        v-model="sectorLocal.sectorID"
        @change.native="selectSector($event)"
      >
        <option
          v-for="option in sectors"
          :value="option.sectorID"
          :key="option.id"
        >
          {{ option.sector }}
        </option>
      </b-select>
    </b-field>

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

    <b-field>
      <div class="buttons">
        <b-button type="is-danger" expanded @click="redireccion"
          >REDIRECCION</b-button
        >
      </div>
    </b-field>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'sectoredit',
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
      cities: [],
      beaches: [],
      sectors: [],
    };
  },

  async mounted() {
    try {
      this.cities = await this.getCities();
      this.beaches = await this.getBeaches(this.sectorLocal.cityID);
      this.sectors = await this.getSectors({
        cityID: this.sectorLocal.cityID,
        beachID: this.sectorLocal.beachID,
      });
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    ...mapActions('worksStore', ['getCities', 'getBeaches', 'getSectors']),

    redireccion() {
      this.axios({
        method: 'get',
        url: 'redireccion',
      });
    },

    async selectCity(e) {
      this.sectorLocal.city = this.cities[e.target.selectedIndex].city;
      this.beaches = await this.getBeaches(this.sectorLocal.cityID);
      this.sectors = await this.getSectors({
        cityID: this.sectorLocal.cityID,
        beachID: this.sectorLocal.beachID,
      });
    },
    async selectBeach(e) {
      this.sectorLocal.beach = this.beaches[e.target.selectedIndex].beach;
      this.sectors = await this.getSectors({
        cityID: this.sectorLocal.cityID,
        beachID: this.sectorLocal.beachID,
      });
    },

    selectSector(e) {
      this.sectorLocal.sector = this.sectors[e.target.selectedIndex].sector;
    },

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
  },
};
</script>

<style scoped></style>
