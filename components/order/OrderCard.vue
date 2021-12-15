<template>
  <div class="order-item">
    <div class="order-header d-flex justify-content-between mb-5">
      <span class="d-flex flex-column">
        <span class="title">Order number</span>
        <span>#{{ order.orderNumber }}</span>
      </span>
      <span class="d-flex flex-column">
        <span class="title">Date &amp; Time</span>
        <span>{{ order.createDate }}</span>
      </span>
      <span class="d-flex flex-column">
        <span class="title">Name</span>
        <span>{{ order.name }}</span>
      </span>
      <span class="d-flex flex-column">
        <span class="title">Contact</span>
        <span>{{ order.contact }}</span>
      </span>
      <span class="d-flex flex-column">
        <span class="title">Trans Type</span>
        <span class="badge" :class="order.transType === 1 ? 'bg-primary' : 'bg-secondary'">{{
          getTransType(order.transType)
        }}</span>
      </span>
      <span class="d-flex flex-column">
        <span class="title">Amount</span>
        <span>{{ order.total }}$
          <span class="badge bg-dark-yellow">COD</span></span>
      </span>
    </div>
    <div class="d-flex align-items-center mb-5">
      <span class="me-3 lh-1">
        Ordered<br />
        Items
      </span>
      <span class="btn btn-secondary me-3" v-for="item in order.orderItems" :key="item.id">{{ item.title }} X {{item.quantity}}</span>
    </div>
    <div class="order-footer d-flex align-items-end justify-content-between">
      <div class="d-flex flex-column">
        <span>Additional information from customer</span>
        <span class="note"
          >Please send salad and green chantni with 2 paper dish.</span
        >
      </div>
      <div class="d-flex align-items-center justify-content-end">
        <a onclick="window.print();">
          <img src="~/static/printer.svg" class="me-5" />
        </a>
        <button class="btn btn-primary" @click="updateOrder(order)">
          Move to Cooking
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    order: {
      required: true,
      type: Object,
    },
  },
  methods: {
    getTransType(transId) {
      var item = this.$store.getters.getStaticValues.transTypes.find(
        (x) => x.id === transId
      );

      return item === undefined ? '' : item.title;
    },
    updateOrder(order){
      order.status = 2
      this.$store
        .dispatch("updateOrder", order)
        .then((response) => {
          console.log(response);
          this.$router.push("/");
        });
    }
  },
};
</script>
<style scoped>
.bg-secondary{
  background-color: var(--orange) !important;
}
</style>