<template>
  <div>
    <form @submit.prevent="saveOrderOnSubmit" class="row order-form">
      <div class="col-12 col-lg-6">
        <div class="row mb-2">
          <span class="col-3 title">Order Number:</span>
          <span class="col-9">{{ "#" + orderNumber }}</span>
        </div>
        <div class="row mb-4">
          <span class="col-3 title">Date &amp; Time:</span>
          <span class="col-9">{{ now }}</span>
        </div>
        <div class="form-group">
          <label class="form-label title">Name</label>
          <input type="text" class="form-control" v-model="name" />
        </div>
        <div class="form-group">
          <label class="form-label title">Contact</label>
          <input type="text" class="form-control" v-model="contact" />
        </div>
        <h3>Trans Type</h3>
        <div
          class="form-check form-check-inline"
          v-for="item in transTypes"
          :key="item.id"
        >
          <input
            class="form-check-input"
            type="radio"
            :id="item.id"
            :value="item.id"
            v-model="transType"
          />
          <label class="form-check-label" :for="item.id">{{
            item.title
          }}</label>
        </div>
        <div class="form-group mb-3">
          <label for="message" class="form-label">Message to client</label>
          <textarea
            class="form-control"
            id="message"
            rows="4"
            v-model="message"
          ></textarea>
        </div>
        <div class="form-group mb-3">
          <label for="orderitems" class="form-label">Order Items</label>
          <multiselect
            v-model="selectedOrderItems"
            :options="orderItems"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Pick some"
            label="title"
            track-by="id"
          >
          </multiselect>
        </div>
        <div class="mb-3">
          <div
            class="d-flex align-items-center"
            v-for="item in selectedOrderItems"
            :key="item.id"
          >
            <div class="flex-grow-1">{{ item.title }}</div>
            <div class="price">{{ item.price * item.quantity }}$</div>
            <div
              class="rounded-pill border d-flex align-items-center ms-5 me-3"
            >
              <span class="btn btn-sm ps-3" @click="setQuantity(item.id, -1)"
                >-</span
              >
              <input
                class="border-0 d-inline quantity text-center"
                v-model="item.quantity"
              />
              <span class="btn btn-sm pe-3" @click="setQuantity(item.id, 1)"
                >+</span
              >
            </div>
            <button class="btn" type="button" @click="remove(item.id)">
              <strong>x</strong>
            </button>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="del ivery-details rounded mb-4">
          <div class="title mb-4">Delivery Details</div>
          <div class="row justify-content-between order-title">
            <span class="col-4">Order Item</span>
            <span class="col-4">Number</span>
            <span class="col-4 text-end">Cost</span>
          </div>
          <div
            class="row justify-content-between title"
            v-for="item in selectedOrderItems"
            :key="item.id"
          >
            <span class="col-4">{{ item.title }}</span>
            <span class="col-4">{{ item.quantity }}</span>
            <span class="col-4 text-end"
              >{{ item.quantity * item.price }}$</span
            >
          </div>
        </div>
        <div class="delivery-details rounded mb-4">
          <div class="row total justify-content-between">
            <span class="title col-6">Total Amount</span>
            <span class="col-6 text-end">{{ total }}$</span>
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <nuxt-link to="/" tag="a" class="btn btn-cancel w-100 me-2">Cancel</nuxt-link>
          <button
            class="btn btn-success w-100 border-0 ms-2"
            type="submit"
            :disabled="total <= 0"
          >
            Add Order
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      now: new Date().toLocaleString(),
      orderNumber: 0,
      transTypes: [],
      orderItems: [],
      name: null,
      contact: null,
      transType: null,
      message: null,
      selectedOrderItems: [],
    };
  },
  computed: {
    total() {
      var total = 0;
      for (let i = 0; i < this.selectedOrderItems.length; i++) {
        total +=
          this.selectedOrderItems[i].price *
          this.selectedOrderItems[i].quantity;
      }
      return total;
    },
  },
  methods: {
    saveOrderOnSubmit() {
      var newOrder = {
        name: this.name,
        contact: this.contact,
        createDate: this.now,
        orderNumber: this.orderNumber,
        transType: this.transType,
        message: this.message,
        total: this.total,
        orderItems: this.selectedOrderItems,
        status: 1
      };
      this.$store
        .dispatch("addOrder", newOrder)
        .then((response) => {
          console.log(response);
          this.$router.push("/");
        });
    },
    setQuantity(itemId, quantity) {
      if (
        this.selectedOrderItems.find((x) => x.id == itemId).quantity +
          quantity <
        1
      ) {
        this.selectedOrderItems.find((x) => x.id == itemId).quantity = 1;
      } else {
        this.selectedOrderItems.find((x) => x.id == itemId).quantity +=
          quantity;
      }
    },
    remove(itemId) {
      this.selectedOrderItems = this.selectedOrderItems.filter(
        (x) => x.id != itemId
      );
    },
  },
  created() {
    this.transTypes = this.$store.getters.getStaticValues.transTypes;
    this.orderItems = this.$store.getters.getOrderItems;
  },
  mounted() {
    setInterval(() => {
      this.now = new Date().toLocaleString();
    }, 1000);
    this.orderNumber = Math.floor(Math.random() * 100000);
  },
};
</script>
<style scoped>
.title {
  font-weight: var(--fw-500);
}
.title + span {
  color: var(--dark-gray);
}
.form-group,
.form-check {
  margin-bottom: 1rem;
}
.delivery-details {
  background-color: var(--light-card-color);
  padding: 26px 69px 26px 26px;
}
.delivery-details > .order-title {
  font-size: var(--fs-secondary);
  color: var(--dark-gray);
  font-weight: var(--fw-400);
}
.delivery-details .total > span {
  font-size: var(--fs-total);
  font-weight: var(--fw-500);
  color: var(--primary-black);
}
.delivery-details .total > span.title {
  font-weight: var(--fw-600);
}
.btn-success {
  background-color: var(--green);
  color: var(--light-card-color);
  font-size: var(--fs-primary);
  font-weight: var(--fw-500);
}
.btn-cancel {
  font-size: var(--fs-secondary);
  color: var(--dark-gray);
  border: 1.5px solid #cccccc;
}

.order-form .title {
  font-weight: var(--fw-500);
}
.order-form .title + span {
  color: var(--dark-gray);
}
.order-form .form-group,
.order-form .form-check {
  margin-bottom: 1rem;
}
.order-form .quantity {
  width: 40px;
}
.btn-sm {
  font-size: 20px;
  line-height: 20px;
  margin: 0;
  padding: 0;
  color: var(--gray);
}
strong {
  color: var(--gray);
}
.price {
  font-weight: var(--fw-500);
}
</style>