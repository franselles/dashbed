<template>
  <div>
    <div class="columns">
      <div class="column">
        <h6 class="title is-6">SELECIONA CIUDAD</h6>
        <b-field>
          <div class="buttons">
            <b-radio-button
              v-for="item in citiesLocal"
              :key="item.index"
              :native-value="item.cityID"
              type="is-success"
              v-model="cityID"
              @click.native="changeCity(item)"
            >
              {{ item.city }}
            </b-radio-button>
          </div>
        </b-field>

        <b-field>
          <div v-if="cityLocal">
            <h6 class="title is-6">SELECIONA PLAYA</h6>

            <div class="buttons">
              <b-radio-button
                v-for="item in beachesLocal"
                :key="item.index"
                :native-value="item.beachID"
                type="is-warning"
                v-model="beachID"
                @click.native="changeBeach(item)"
              >
                {{ item.beach }}
              </b-radio-button>
            </div>
          </div>
        </b-field>

        <b-field>
          <div v-if="beachLocal">
            <img :src="beachLocal.image1" />
          </div>
        </b-field>

        <b-field>
          <div v-if="beachLocal">
            <h6 class="title is-6">
              SECTORES DE LA PLAYA {{ beachLocal.beach }}
            </h6>
            <div class="buttons">
              <b-radio-button
                v-for="item in sectorsLocal"
                :key="item.index"
                :native-value="item.sectorID"
                v-model="sectorID"
                @click.native="changeSector(item)"
              >
                {{ item.sectorID }}
              </b-radio-button>
            </div>
          </div>
        </b-field>
        <Sectordetail ref="sectordetail" @refresh-sectors="refreshSectors" />
      </div>

      <div class="column">
        <Sectoritems ref="sectoritems" />
        <Itemdetail ref="itemdetail" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import Sectoritems from '@/components/Sectoritems.vue';
import Sectordetail from '@/components/Sectordetail.vue';
import Itemdetail from '@/components/Itemdetail.vue';

export default {
  name: 'editor',
  components: { Sectoritems, Sectordetail, Itemdetail },
  data() {
    return {
      statusSector: [],
      date: null,
      enableButtonCart: true,
      cityID: null,
      beachID: null,
      sectorID: null,
      cityLocal: null,
      beachLocal: null,
      sectorLocal: null,
      citiesLocal: [],
      beachesLocal: [],
      sectorsLocal: [],
    };
  },
  mounted() {
    // this.date = dayjs(this.dateActual).toDate();
    this.date = this.dateActual;
    this.getCities().then(response => {
      this.citiesLocal = response;
    });
  },
  methods: {
    ...mapActions('worksStore', [
      'getCities',
      'getBeaches',
      'getSectors',
      'getItems',
      'getSector',
      'putItems',
    ]),
    ...mapMutations('worksStore', [
      'setDateActual',
      'setSectorActual',
      'setCityActual',
      'setBeachActual',
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

    changeSector(event) {
      this.sectorLocal = event;

      this.setCityActual(this.cityLocal);
      this.setBeachActual(this.beachLocal);
      this.setSectorActual(event);

      this.$refs.sectoritems.refresh();
      this.$refs.sectordetail.refresh();
    },

    changeCity(event) {
      this.getBeaches(event.cityID).then(response => {
        this.cityLocal = event;
        this.beachesLocal = response;
      });
    },

    changeBeach(event) {
      this.getSectors({ cityID: event.cityID, beachID: event.beachID }).then(
        response => {
          this.beachLocal = event;
          this.sectorsLocal = response;
        }
      );
    },

    refreshSectors() {
      console.log('refresh');

      this.getSectors({
        cityID: this.beachActual.cityID,
        beachID: this.beachActual.beachID,
      }).then(response => {
        this.sectorsLocal = response;
      });
    },

    back() {
      this.$router.go(-1);
    },
  },
  computed: {
    ...mapState('userStore', ['employee']),
    ...mapState('worksStore', [
      'cityActual',
      'beachActual',
      'typeIDActual',
      'sectorActual',
      'stateSector',
    ]),
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
