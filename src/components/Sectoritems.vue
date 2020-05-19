<template>
  <div>
    <b-field>
      <b-icon icon="arrow-bottom-left-thick"></b-icon>PRIMERA LINEA DE PLAYA
    </b-field>

    <div id="beach" class="columns">
      <div class="column is-3" align="right">
        <b-field>
          <table>
            <tr v-for="line in statusSector" :key="line.index">
              <td v-for="cell in line" :key="cell.index">
                <div class="cell">
                  <b-button
                    v-if="cell.empty === 1"
                    size="is-small"
                    outlined
                    @click="pushed(cell)"
                    >E
                  </b-button>
                  <b-button
                    v-if="cell.empty === 0"
                    size="is-small"
                    type="is-success"
                    @click="pushed(cell)"
                    >{{ cell.row }}.{{ cell.col }}</b-button
                  >
                </div>
              </td>
            </tr>
          </table>
        </b-field>
      </div>
    </div>
    <b-field>
      <b-button type="is-success" @click="updateItem()"
        >ACTUALIZAR ITEMS</b-button
      >
    </b-field>
    <b-field>
      <b-button type="is-danger" @click="deleteItemsButton"
        >BORRAR ITEMS</b-button
      >
    </b-field>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'sectoritems',
  data() {
    return {
      statusSector: [],
    };
  },

  methods: {
    ...mapActions('worksStore', [
      'getSector',
      'getItems',
      'putItems',
      'deleteItems',
    ]),

    getSectorLocal() {
      this.statusSector = [];

      this.getSector({
        cityID: this.cityLocal.cityID,
        beachID: this.beachLocal.beachID,
        sectorID: this.sectorLocal.sectorID,
      }).then(() => {
        this.getStateSectorItemsLocal(this.sectorActual.rows);
      });
    },

    getStateSectorItemsLocal(rows) {
      this.getItems({
        cityID: this.cityLocal.cityID,
        beachID: this.beachLocal.beachID,
        sectorID: this.sectorLocal.sectorID,
      }).then(result => {
        let line = [];
        for (let c = 0; c < result.length; c++) {
          line.push(result[c]);
          if ((c + 1) % rows == 0) {
            this.statusSector.push(line);
            line = [];
          }
        }
      });
    },

    async updateItem() {
      let updatedItemsToSend = [];
      let step = 8;

      for (let i = 0; i < this.statusSector.length; i++) {
        for (let e = 0; e < this.statusSector[i].length; e++) {
          updatedItemsToSend.push(this.statusSector[i][e]);
        }
        if (i == step) {
          await this.putItems(updatedItemsToSend);
          step += 8;
          updatedItemsToSend = [];
        }
      }
      await this.putItems(updatedItemsToSend);

      this.getSectorLocal();
    },

    deleteItemsButton() {
      this.deleteItems({
        cityID: this.cityLocal.cityID,
        beachID: this.beachLocal.beachID,
        sectorID: this.sectorLocal.sectorID,
      }).then(() => {
        this.getSectorLocal();
      });
    },

    pushed(e) {
      let state;
      if (e.empty === 0) {
        state = 1;
      } else {
        state = 0;
      }
      this.statusSector[e.col - 1][e.row - 1].empty = state;
      // e.empty = state;
      // this.updateItem(e);
    },

    refresh() {
      this.getSectorLocal();
    },
  },

  computed: {
    ...mapState('worksStore', [
      'cityActual',
      'beachActual',
      'typeIDActual',
      'sectorActual',
      'stateSector',
    ]),

    cityLocal: function () {
      return this.cityActual;
    },

    beachLocal: function () {
      return this.beachActual;
    },

    sectorLocal: function () {
      return this.sectorActual;
    },
  },
};
</script>

<style scoped>
.cell {
  padding: 5px;
}
</style>
