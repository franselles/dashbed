<template>
  <div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <a href="#" @click="back"
            ><b-icon icon="arrow-left-thick"></b-icon> VOLVER</a
          >
        </li>
        <li>{{ user.name }}</li>
      </ul>
    </nav>

    <article class="message is-primary">
      <div class="message-header">
        <p>RESERVA DE HAMACAS</p>
      </div>
      <div class="message-body">
        <b-field>
          <div>
            USUARIO:<span class="has-text-weight-bold"> {{ user.name }}</span>
          </div>
        </b-field>
        <b-field>
          <div>
            TELEFONO:<span class="has-text-weight-bold"> {{ user.phone }}</span>
          </div>
        </b-field>
      </div>
    </article>

    <div v-for="items in ticketsDay" :key="items.index" class="card-custom">
      <article
        :class="
          items.date == date ? 'message is-primary' : ' message is-warning'
        "
      >
        <div class="message-body">
          <b-field>
            <div>
              FECHA TICKET:
              <span class="tag is-black is-medium has-text-weight-bold">{{
                formatDate(items.date)
              }}</span>
            </div>
          </b-field>
          <b-field>
            <div>
              ID:
              <span class="has-text-weight-bold">{{ items.itemID }} </span>
            </div>
          </b-field>
          <b-field>
            <div>
              CIUDAD:<span class="has-text-weight-bold">
                {{ items.cityID }} - {{ items.city }}</span
              >
            </div>
          </b-field>
          <b-field>
            <div>
              PLAYA:<span class="has-text-weight-bold">
                {{ items.beachID }} - {{ items.beach }}</span
              >
            </div>
          </b-field>
          <b-field>
            <div>
              SECTOR:<span class="has-text-weight-bold">
                {{ items.sectorID }} - {{ items.sector }}</span
              >
            </div>
          </b-field>
          <b-field>
            <div>
              COLUMNA:<span class="has-text-weight-bold"> {{ items.col }}</span>
            </div>
          </b-field>
          <b-field>
            <div>
              FILA:<span class="has-text-weight-bold"> {{ items.row }}</span>
            </div>
          </b-field>
          <div>
            <qrcode-vue
              :value="items.itemID"
              :size="size"
              level="H"
            ></qrcode-vue>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import QrcodeVue from 'qrcode.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'cartdetail',
  components: {
    QrcodeVue,
  },
  data() {
    return {
      ticketsDay: [],
      size: 250,
      date: dayjs(new Date()).format('YYYY-MM-DD'),
    };
  },

  mounted() {
    const userID = this.user.userID;
    this.getCartsDetail({ userID, date: this.date }).then(result => {
      this.ticketsDay = result;
    });
  },

  methods: {
    ...mapActions('userStore', ['getCartsDetail']),

    back() {
      this.$router.go(-1);
    },

    formatDate(date) {
      return dayjs(date).format('DD-MM-YYYY');
    },
  },

  computed: {
    ...mapState('userStore', ['user']),
  },
};
</script>

<style scoped>
.card-custom {
  padding-bottom: 30px;
}
</style>
