<template>
    <OrderList />
</template>
<script>
import OrderList from "@/components/order/OrderList";

export default {
  components: {
    OrderList,
  },
  mounted() {
    // let routeStatusSeo = this.$route.params.status;
    // //console.log(JSON.parse(localStorage.getItem("staticValues")).orderStatuses.find(x=>x.seo==="accepted"), routeStatusSeo)

    // let selectedOrderStatus = JSON.parse(localStorage.getItem("staticValues")).orderStatuses.find(x=>x.seo==="accepteda");
    // let title = selectedOrderStatus === undefined ? "" : selectedOrderStatus.title;
    // console.log(this.$store.getters.getStaticValues)
    
    this.$emit("getTitle", "başlıkkkk")
  },
};
</script>