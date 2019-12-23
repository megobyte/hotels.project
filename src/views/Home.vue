<template lang="pug">
  .container
    .hotels
      .row.head
        .title Название
        .price Цена за сутки
          .filter
            input(v-model="filter")
        .action
      template(v-for="(hotel, index) in hotels")
        template(v-if="filtered(hotel)")
          .row
            .title {{hotel.hotelName}}
              .badge(v-if="hotel.selected") Текущий выбор
            .price {{hotel.price | formatPrice}}
            .action
              button(@click="selectThis(index)", :class="{disabled:hotel.selected}") Выбрать
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "home",
  data() {
    return {
      filter: ""
    };
  },
  computed: {
    hotels() {
      return this.$store.state.hotels;
    }
  },
  filters: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  },
  methods: {
    ...mapMutations(["selectHotel"]),

    filtered(hotel) {
      if (this.filter === "") return true;
      if (parseInt(this.filter)) {
        let price = parseInt(this.filter);
        if (price >= hotel.price) return true;
        return false;
      } else return true;
    },

    selectThis(index) {
      this.selectHotel(index);
      localStorage.setItem("hotels", JSON.stringify(this.hotels));
      this.$router.push("/selected");
    }
  }
};
</script>

<style lang="scss">
.container {
  width: 100%;
  padding: 15px;

  .hotels {
    width: 100%;
    max-width: 1280px;

    .row {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 5px 15px;

      &.head {
        font-size: 0.8em;
        font-weight: 600;
        align-items: flex-start;

        * {
          color: #666 !important;
        }
      }

      &:nth-child(odd) {
        background: #eee;
      }

      .title {
        margin-right: auto;
        font-size: 1.2em;
        font-weight: 600;

        .badge {
          display: inline-block;
          position: relative;
          top: -10px;
          left: 3px;
          font-size: 0.7rem;
          font-weight: 400;
          padding: 3px 5px;
          border-radius: 3px;
          background: rgb(17, 85, 43);
          color: #fff;
          text-transform: uppercase;
        }
      }

      .price {
        text-align: right;
        font-size: 1.1em;
        margin-right: 15px;
        color: rgb(17, 85, 43);
        white-space: nowrap;
      }

      .action {
        width: 70px;

        button {
          width: 70px;
          height: 30px;
          background: rgb(52, 52, 161);
          border: 1px solid rgb(52, 52, 161);
          border-radius: 5px;
          color: #fff;
          cursor: pointer;

          &.disabled {
            background: #fff;
            color: rgb(52, 52, 161);
            opacity: 0.7;
            pointer-events: none;
          }

          &:hover {
            background: rgb(93, 93, 194);
            border-color: rgb(93, 93, 194);
          }
        }
      }
    }
  }

  .filter {
    width: 120px;
    height: 20px;
    border-radius: 10px;
    background: #fff;
    border: 1px solid #aaa;
    margin-top: 3px;
    position: relative;
    right: -10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &::before {
      content: "";
      width: 13px;
      height: 13px;
      margin-left: 4px;
      display: block;
      background: url(/images/filter.svg) no-repeat center;
      background-size: contain;
    }

    input {
      -webkit-appearance: none;
      border: none;
      background: none;
      width: calc(100% - 25px);
      height: 20px;
      outline: none;
      padding-right: 10px;
      text-align: right;
    }
  }
}
</style>
