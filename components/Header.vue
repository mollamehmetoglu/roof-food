<template>
  <div class="d-flex align-items-center header">
    <img src="~/static/hamburger-menu.svg" alt="Menu" class="me-3" />
    <h1>{{ title }}</h1>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      required: false,
      type: String,
      default: 'Roof Food'
    },
  }
};
</script>