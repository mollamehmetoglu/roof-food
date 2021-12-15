<template>
  <div class="sidebar">
    <ul>
      <li class="bg-primary rounded logo">
        <nuxt-link to="/" tag="a" class="">
          <img src="~/static/icon.svg" />
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/order" tag="a" class="active" active-class="active">
          <img src="~/static/box.svg" />
        </nuxt-link>
      </li>
      <li>
        <img src="~/static/category.svg" />
      </li>
      <li>
        <img src="~/static/cogs.svg" />
      </li>
    </ul>
  </div>
</template>