<template>
  <div>
    <Sidebar />
    <VerticalMenu :orderStatuses="orderStatuses" />
    <section class="main-container">
      <Header :title="pageTitle" />
      <nuxt />
    </section>
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar";
import VerticalMenu from "@/components/VerticalMenu";
import Header from "@/components/Header";

export default {
  components: {
    Sidebar,
    VerticalMenu,
    Header,
  },
  data() {
    return {
      orderStatuses: [],
    };
  },
  computed: {
    pageTitle() {
      if (this.$route.path.startsWith("/order/") && this.$route.params.status)
        return this.orderStatuses.find(
          (x) => x.seo === this.$route.params.status
        ).title;

      if (this.$route.path == "/order/create") return "Create New Order";
    },
  },
  created() {
    this.orderStatuses = this.$store.getters.getStaticValues.orderStatuses;
  },
  methods: {
    setTitle() {
      return false;
    },
  },
};
</script>

