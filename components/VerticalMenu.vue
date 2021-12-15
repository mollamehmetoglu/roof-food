<template>
  <div class="vertical-menu">
    <h2 class="mb-3">Orders</h2>
    <ul>
      <li>
        <nuxt-link to="/order/create" tag="a" active-class="active">
          <span>New Order</span>
          <span>*</span>
        </nuxt-link>
      </li>
      <li v-for="item in orderStatuses" :key="item.id">
        <nuxt-link :to="`/order/${item.seo}`" tag="a" active-class="active">
          <span>{{ item.title }}</span>
          <span>{{ getCountByStatusId(item.id) }}</span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //orderList: [],
    };
  },
  props: {
    orderStatuses: {
      required: true,
      type: Array,
    },
  },
  computed: {
    orderList() {
      return this.$store.getters.getOrders;
    },
  },
  methods: {
    getCountByStatusId(statusId) {
      return this.orderList.filter(x=>x.status === statusId).length;
    },
  },
};
</script>