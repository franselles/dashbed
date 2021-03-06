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
    <b-field>
      <div>
        <p class="title is-4">
          RESERVA DE HAMACAS
        </p>
      </div>
    </b-field>
    <b-field>
      <div>
        FECHA TICKET:
        <span class="has-text-weight-bold"
          >{{ formatDate(cartLocal.date) }}
        </span>
      </div>
    </b-field>
    <b-field>
      <div>
        TICKET:
        <span class="has-text-weight-bold">{{ cartLocal.ticketID }} </span>
      </div>
    </b-field>
    <b-field>
      <div>
        USUARIO:<span class="has-text-weight-bold">
          {{ cartLocal.userID }}</span
        >
      </div>
    </b-field>
    <b-field>
      <div>
        TELEFONO:<span class="has-text-weight-bold">
          {{ cartLocal.phone }}</span
        >
      </div>
    </b-field>

    <b-field>
      <table class="table is-striped">
        <thead>
          <tr>
            <th class="is-size-7">#</th>
            <th class="is-size-7">FECHA</th>
            <th class="is-size-7">SECT</th>
            <th class="is-size-7">COL/FIL</th>
            <th class="is-size-7">PRECIO</th>
            <th class="is-size-7"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cartLocal.detail" :key="item.index">
            <td class="is-size-7">{{ index + 1 }}</td>
            <td class="is-size-7">{{ formatDate(item.date) }}</td>
            <td class="is-size-7">{{ item.sectorID }}</td>
            <td class="is-size-7">{{ item.col }}.{{ item.row }}</td>
            <td class="is-size-7">{{ item.price }} €</td>
            <td class="is-size-7" @click="removeItem(index)">
              <b-button type="is-danger" icon-right="delete" size="is-small" />
            </td>
          </tr>
        </tbody>
      </table>
    </b-field>
    <b-field>
      <div>
        IMPORTE TOTAL:<span class="has-text-weight-bold"> {{ total }} €</span>
      </div>
    </b-field>

    <div class="buttons">
      <b-button
        icon-left="shopping"
        type="is-success"
        @click="purchase"
        :disabled="!purchased"
        >COMPRAR</b-button
      >
      <b-button type="is-danger" @click="cancel">CANCELAR</b-button>
    </div>
    <article class="message is-danger" v-if="detailDuplicated.length > 0">
      <div class="message-header">
        <p>ELEMENTOS NO DISPONIBLES</p>
      </div>
      <div class="message-body">
        <p>SE RETIRAN DE LAS RESERVAS</p>
        <table class="table is-striped">
          <thead>
            <tr>
              <th class="is-size-7">#</th>
              <th class="is-size-7">FECHA</th>
              <th class="is-size-7">SECT</th>
              <th class="is-size-7">COL/FIL</th>
              <th class="is-size-7">PRECIO</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in detailDuplicated" :key="item.index">
              <td class="is-size-7">{{ index + 1 }}</td>
              <td class="is-size-7">{{ formatDate(item.date) }}</td>
              <td class="is-size-7">{{ item.sectorID }}</td>
              <td class="is-size-7">{{ item.col }}.{{ item.row }}</td>
              <td class="is-size-7">{{ item.price }} €</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
  name: 'cart',
  data() {
    return {
      cartLocal: {
        date: null,
        userID: null,
        phone: null,
        ticketID: null,
        canceled: false,
        detail: [],
      },
      total: 0,
      detailDuplicated: [],
    };
  },

  mounted() {
    this.cartLocal = this.cart;
    this.calcTotal();
  },

  methods: {
    ...mapActions('userStore', ['postCart', 'checkCart', 'getTicketNumber']),
    ...mapMutations('userStore', ['setCart', 'resetCart']),

    cancel() {
      this.$router.replace({ name: 'sector' });
    },

    purchase() {
      this.getTicketNumber({ date: this.cartLocal.date }).then(result => {
        this.cartLocal.ticketID = (
          this.cartLocal.date + ('00000' + result).slice(-5)
        ).replace(/-/g, '');

        this.postCart(this.cartLocal).then(result => {
          if (result === true) {
            setTimeout(() => {
              this.resetCart();
              this.$router.replace({ name: 'citybeaches' });
            }, 2000);
          } else {
            this.detailDuplicated = result;
            result.forEach(element => {
              const index = this.cartLocal.detail.findIndex(
                (p => p.citiID === element.cityID) &&
                  (p => p.beachID === element.beachID) &&
                  (p => p.sectorID === element.sectorID) &&
                  (p => p.typeID === element.typeID) &&
                  (p => p.col === element.col) &&
                  (p => p.row === element.row)
              );

              this.cartLocal.detail.splice(index, 1);
            });

            if (this.detailDuplicated.length > 0) {
              this.setCart(this.cartLocal);
              this.calcTotal();
            }
          }
        });
      });
    },

    formatDate(date) {
      return dayjs(date).format('DD-MM-YY');
    },

    removeItem(i) {
      this.cartLocal.detail.splice(i, 1);
      this.resetCart();
      this.setCart(this.cartLocal);

      this.calcTotal();
    },

    calcTotal() {
      this.total = 0;
      this.cartLocal.detail.forEach(element => {
        this.total += element.price;
      });
    },

    back() {
      this.$router.go(-1);
    },
  },

  computed: {
    ...mapState('userStore', ['cart', 'user']),

    purchased: function () {
      return this.cartLocal.detail.length > 0;
    },
  },
};
</script>

<style scoped></style>
