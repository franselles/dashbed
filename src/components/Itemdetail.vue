<template>
  <div>
    {{ itemLocal._id }}
    <b-field>
      <b-button type="is-primary" expanded @click="getItem()">ITEM</b-button>
    </b-field>
    <b-field label="cityID">
      <b-input type="number" v-model="itemLocal.cityID"></b-input>
    </b-field>
    <b-field label="city">
      <b-input v-model="itemLocal.city"></b-input>
    </b-field>
    <b-field label="beachID">
      <b-input type="number" v-model="itemLocal.beachID"></b-input>
    </b-field>
    <b-field label="beach">
      <b-input v-model="itemLocal.beach"></b-input>
    </b-field>
    <b-field label="sectorID">
      <b-input type="number" v-model="itemLocal.sectorID"></b-input>
    </b-field>
    <b-field label="sector">
      <b-input v-model="itemLocal.sector"></b-input>
    </b-field>
    <b-field label="typeID">
      <b-input type="number" v-model="itemLocal.typeID"></b-input>
    </b-field>
    <b-field label="type">
      <b-input v-model="itemLocal.type"></b-input>
    </b-field>
    <b-field label="Price">
      <b-input type="number" v-model="itemLocal.price"></b-input>
    </b-field>
    <b-field label="itemID">
      <b-input v-model="itemLocal.itemID"></b-input>
    </b-field>
    <b-field label="COL">
      <b-input type="number" v-model="itemLocal.col"></b-input>
    </b-field>
    <b-field label="ROW">
      <b-input type="number" v-model="itemLocal.row"></b-input>
    </b-field>
    <b-field label="Filled">
      <b-input type="number" v-model="itemLocal.filled"></b-input>
    </b-field>
    <b-field label="Emprty">
      <b-input type="number" v-model="itemLocal.empty"></b-input>
    </b-field>

    <b-field>
      <b-button type="is-info" expanded @click="updateItem()"
        >ACTUALIZA ITEM</b-button
      >
    </b-field>
    <b-field>
      <b-button type="is-danger" expanded @click="insertItem()"
        >INSERTA NUEVO ITEM</b-button
      >
    </b-field>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'itemdetail',
  data() {
    return {
      itemLocal: {
        _id: '',
        cityID: 1,
        city: '',
        beachID: 1,
        beach: '',
        sectorID: 1,
        sector: '',
        typeID: 9,
        type: '',
        price: 0,
        itemID: '',
        col: 0,
        row: 0,
        filled: 0,
        empty: 0,
        numbetItem: 0,
      },
    };
  },

  methods: {
    ...mapActions('worksStore', ['postItem', 'putItem', 'deleteItem']),

    getItem() {
      this.itemLocal = this.itemToEdit;
    },

    updateItem() {
      this.putItem(this.itemLocal).then(() => {
        console.log('Actualizado');
      });
    },

    insertItem() {
      this.postItem(this.itemLocal).then(() => {
        console.log('Insertado');
      });
    },
  },

  computed: {
    ...mapState('worksStore', ['itemToEdit']),
  },
};
</script>

<style scoped></style>
