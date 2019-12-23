<template lang="pug">
  .container.selected
    h1 Спасибо за использование нашего сервиса.
    h2 Ваше бронирование в <br /><b>&laquo;{{ hotels[selected].hotelName }}&raquo;</b><br /> подтверждено.
    router-link(to="/") &larr; Вернуться
</template>
<script>
export default {
  name: "selected",
  computed: {
    hotels() {
      return this.$store.state.hotels;
    },
    selected() {
      return this.$store.state.selected;
    }
  }
};
</script>
<style lang="scss">
.container.selected {
  text-align: center;

  h1 {
    font-size: 2em;
    font-weight: 400;
  }
  h2 {
    font-size: 1.5em;
    font-weight: 400;
  }
}
</style>
