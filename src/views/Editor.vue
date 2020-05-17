<template>
  <div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <a href="#" @click="back"
            ><b-icon icon="arrow-left-thick"></b-icon> VOLVER</a
          >
        </li>
        <li>{{ employee.name }}</li>
      </ul>
    </nav>

    <article class="message is-warning">
      <div class="message-header">
        <p>{{ sectorActual.sector }} PLAYA {{ beachActual.beach }}</p>
      </div>
      <div class="message-body">
        <b-field>
          <div class="field is-grouped">
            <p class="control">
              <b-button type="button" class="button" @click="addDay(-1)">
                <b-icon icon="chevron-left" both />
              </b-button>
            </p>

            <p class="control">
              <span class="tag is-large">{{ dateFormated }}</span>
            </p>

            <p class="control">
              <b-button type="button" class="button" @click="addDay(1)">
                <b-icon icon="chevron-right" both />
              </b-button>
            </p>
          </div>
        </b-field>
      </div>
    </article>

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
      <b-button type="is-danger" @click="updateItem()"
        >ACTUALIZAR ITEMS</b-button
      >
    </b-field>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import dayjs from 'dayjs';

export default {
  name: 'editor',
  data() {
    return {
      statusSector: [],
      date: null,
      enableButtonCart: true,
    };
  },
  mounted() {
    // this.date = dayjs(this.dateActual).toDate();
    this.date = this.dateActual;

    this.getSectorLocal();
  },
  methods: {
    ...mapActions('worksStore', ['getItems', 'getSector', 'putItems']),
    ...mapMutations('worksStore', [
      'setDateActual',
      'setSectorActual',
      'setCart',
    ]),

    getSectorLocal() {
      this.statusSector = [];

      this.getItems({
        cityID: this.cityActual.cityID,
        beachID: this.beachActual.beachID,
        sectorID: this.sectorActual.sectorID,
      }).then(result => {
        let line = [];
        for (let c = 0; c < result.length; c++) {
          line.push(result[c]);
          if ((c + 1) % this.sectorActual.rows == 0) {
            this.statusSector.push(line);
            line = [];
          }
        }
      });
    },

    setEnableButtonCart() {
      if (this.cartLocal.detail.length == 0) {
        this.enableButtonCart = true;
      } else {
        this.enableButtonCart = false;
      }
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

    updateItem() {
      let updatedItemsToSend = [];

      for (let i = 0; i < this.statusSector.length; i++) {
        for (let e = 0; e < this.statusSector[i].length; e++) {
          updatedItemsToSend.push(this.statusSector[i][e]);
        }
      }

      this.putItems(updatedItemsToSend).then(() => {
        this.getSectorLocal();
      });
    },

    addDay(n) {
      let checkDay = dayjs(this.date).add(n, 'days').format('YYYY-MM-DD');

      if (checkDay < dayjs(new Date()).format('YYYY-MM-DD')) return;

      this.date = checkDay;
      this.setDateActual(this.date);
      this.getSectorLocal();
    },

    formatDate(date) {
      return dayjs(date).format('DD-MM-YY');
    },

    back() {
      this.$router.go(-1);
    },
  },
  computed: {
    ...mapState('userStore', ['employee']),
    ...mapState('worksStore', [
      'dateActual',
      'cityActual',
      'beachActual',
      'typeIDActual',
      'sectorActual',
      'stateSector',
    ]),

    dateFormated: function () {
      return dayjs(this.date).format('DD-MM-YYYY');
    },
  },
};
</script>

<style scoped>
.cell {
  padding: 5px;
}

#beach {
  background-image: url('../assets/beach.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
