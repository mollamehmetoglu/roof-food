<template>
  <div class="mt-2">
    <div class="d-flex justify-content-between align-items-center">
      <nuxt-link tag="a" to="/" class="btn btn-secondary btn-lg border-0">
        <span class="d-flex align-items-center">
          <img src="~/static/hamburger-menu.svg" class="me-3" width="15px" />
          Showing 10+ Orders
        </span>
      </nuxt-link>
      <nuxt-link
        tag="a"
        to="/order/create"
        class="btn btn-primary border-0 px-3 py-2"
      >
        Add New Order
      </nuxt-link>
    </div>
    <hr class="my-4" />
    <div
      class="border rounded p-4 ps-5 mb-4"
      v-for="(item, index) in fetchedOrders"
      :key="index"
    >
      <OrderCard :order="item" />
    </div>
  </div>
</template>
<script>
import OrderCard from "@/components/order/OrderCard";

export default {
  components: {
    OrderCard,
  },
  data() {
    return {
      orderStatuses: [],
    };
  },
  computed: {
    fetchedOrders() {
      if (this.$route.path.startsWith("/order/") && this.$route.params.status) {
        var statusId = this.orderStatuses.find(
          (x) => x.seo === this.$route.params.status
        ).id;
        console.log(statusId);
        return this.$store.getters.getOrders.filter(
          (x) => x.status === statusId
        );
      }
      return this.$store.getters.getOrders;
    },
  },
  created() {
    this.orderStatuses = this.$store.getters.getStaticValues.orderStatuses;
  },
};
</script>
