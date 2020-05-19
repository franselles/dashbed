<template>
  <div>
    <h1>CREATE SECTORS</h1>
    <section>
      <b-field label="cityID">
        <b-input type="number" v-model="cityID"></b-input>
      </b-field>
      <b-field label="city">
        <b-input v-model="city"></b-input>
      </b-field>
      <b-field label="beachID">
        <b-input type="number" v-model="beachID"></b-input>
      </b-field>
      <b-field label="beach">
        <b-input v-model="beach"></b-input>
      </b-field>
      <b-field label="sectorID">
        <b-input type="number" v-model="sectorID"></b-input>
      </b-field>
      <b-field label="sector">
        <b-input v-model="sector"></b-input>
      </b-field>
      <b-field label="typeID">
        <b-input type="number" v-model="typeID"></b-input>
      </b-field>
      <b-field label="type">
        <b-input v-model="type"></b-input>
      </b-field>
      <b-field label="price">
        <b-input type="number" v-model="price"></b-input>
      </b-field>

      <b-field label="TOTAL cols EN EL SECTOR">
        <b-input type="number" v-model="col"></b-input>
      </b-field>

      <b-field label="TOTAL rows EN EL SECTOR">
        <b-input type="number" v-model="row"></b-input>
      </b-field>
      <b-field label="filled">
        <b-input type="number" v-model="filled"></b-input>
      </b-field>
    </section>
    <b-button type="is-primary" @click="createItems">CREAR</b-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'createsectors',
  data() {
    return {
      cityID: null,
      city: 'BENIDORM',
      beachID: null,
      beach: null,
      sectorID: null,
      sector: null,
      typeID: null,
      type: 'PACK DE 2 HAMACAS Y 2 SOMBRILLAS',
      price: 15,
      itemID: null,
      col: null,
      row: null,
      filled: 0,
      items: [],
    };
  },
  methods: {
    ...mapActions('worksStore', ['postItems']),
    async createItems() {
      this.items = [];
      let step = 8;

      for (let c = 1; c <= this.col; c++) {
        for (let r = 1; r <= this.row; r++) {
          let item = {
            cityID: Number(this.cityID),
            city: this.city,
            beachID: Number(this.beachID),
            beach: this.beach,
            sectorID: Number(this.sectorID),
            sector: this.sector,
            typeID: Number(this.typeID),
            type: this.type,
            price: Number(this.price),
            itemID:
              String(this.cityID) +
              String(this.typeID) +
              String(this.beachID) +
              ('0' + String(this.sectorID)).slice(-2) +
              ('0' + c).slice(-2) +
              ('0' + r).slice(-2),
            col: c,
            row: r,
            filled: this.filled,
            empty: 0,
          };
          this.items.push(item);
        }

        if (c == step) {
          await this.postItems(this.items);
          this.items = [];
          step += 8;
          this.$buefy.notification.open(step);
        }
      }
      await this.postItems(this.items);
      this.$buefy.notification.open('COMPLETADO');
    },
  },
};
</script>

<style scoped></style>
