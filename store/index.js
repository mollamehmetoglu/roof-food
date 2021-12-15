import Vuex from "vuex";
import axios from "axios";

const createStore = () => {
  return new Vuex.Store({
    state: {
      staticValues: null,
      orderItems: [],
      fetchedOrders: [],
    },
    mutations: {
      setStaticValues(state, staticValues) {
        state.staticValues = staticValues;
      },
      setOrderItems(state, orderItems) {
        state.orderItems = orderItems;
      },
      setOrders(state, orders) {
        state.fetchedOrders = orders;
      },
      addOrder(state, order) {
        state.fetchedOrders.push(order);
      },
      updateOrder(state, editedOrder) {
        console.log("Mutations => " + editedOrder);
        let order_index = state.fetchedOrders.findIndex(
          (order) => order.id == editedOrder.id
        );
        console.log("Mutations | Order INDEX => " + order_index);
        state.fetchedOrders[order_index] = editedOrder;
      },
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        const staticValues = {
          orderStatuses: [
            { id: 1, seo: "accepted", title: "Accepted" },
            { id: 2, seo: "cooking", title: "Cooking" },
            { id: 3, seo: "parcel-ready", title: "Parcel Ready" },
            { id: 4, seo: "delivered", title: "Delivered" },
            { id: 5, seo: "completed", title: "Completed" },
          ],
          transTypes: [
            { id: 1, title: "Delivery", cssClass: "" },
            { id: 2, title: "Takeaway", cssClass: "" },
          ],
        };
        vuexContext.commit("setStaticValues", staticValues);

        const orderItems = [
          {
            id: 1,
            title: 'Beef Stroganoff',
            price: 12,
            quantity: 1
          },
          {
            id: 2,
            title: 'Caesar Salad',
            price: 8,
            quantity: 1
          },
          {
            id: 3,
            title: 'Chicken à la King ',
            price: 15,
            quantity: 1
          },
          {
            id: 4,
            title: 'Lobster Newburg',
            price: 20,
            quantity: 1
          },
          {
            id: 5,
            title: 'Salisbury Steak',
            price: 14,
            quantity: 1
          },
          {
            id: 6,
            title: 'Kebab',
            price: 12,
            quantity: 1
          },
          {
            id: 7,
            title: 'Filter Coffee',
            price: 4,
            quantity: 1
          },
          {
            id: 8 ,
            title: 'Misto Cookie',
            price: 2,
            quantity: 1
          },
        ]

        vuexContext.commit("setOrderItems", orderItems);

        return axios
          .get(
            "https://roof-food-default-rtdb.europe-west1.firebasedatabase.app/order.json"
          )
          .then((response) => {
            let data = response.data;
            let orderArray = [];
            for (let key in data) {
              orderArray.push({ id: key, ...data[key] });
            }
            vuexContext.commit("setOrders", orderArray);
          });
      },
      setStaticValues(vuexContext, staticValues) {
        vuexContext.commit("setStaticValues", staticValues);
      },
      setOrderItems(vuexContext, orderItems) {
        vuexContext.commit("setOrderItems", orderItems);
      },
      setOrders(vuexContext, orders) {
        vuexContext.commit("setOrders", orders);
      },
      addOrder(vuexContext, order) {
        return axios
          .post(
            "https://roof-food-default-rtdb.europe-west1.firebasedatabase.app/order.json",
            order
          )
          .then((response) => {
            vuexContext.commit("addOrder", {
              ...order,
              id: response.data.name,
            });
          });
      },
      updateOrder(vuexContext, order) {
        return axios
          .put(
            "https://roof-food-default-rtdb.europe-west1.firebasedatabase.app/order/" +
              order.id +
              ".json",
            order
          )
          .then((response) => {
            console.log("Action => " + order);
            vuexContext.commit("updateOrder", order);
          })
          .catch((e) => console.log(e));
      },
    },
    getters: {
      getOrders(state) {
        return state.fetchedOrders;
      },
      getStaticValues(state) {
        return state.staticValues;
      },
      getOrderItems(state) {
        return state.orderItems;
      },
    },
  });
};

export default createStore;
