/**
 * NABATI ORIGINALS — Cart state (localStorage)
 * Used by masthead count, cart page, and Add to bag actions.
 */
(function () {
  'use strict';

  var KEY = 'nabati_cart';
  var PRICES = { 'dunes-of-gold': 340, 'sacred-smoke': 360, 'midnight-oasis': 340 };

  function getCart() {
    try {
      var raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function setCart(items) {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
      return true;
    } catch (e) {
      return false;
    }
  }

  function addItem(id, qty) {
    if (!PRICES[id] || qty < 1) return getCart();
    var cart = getCart();
    var i = cart.findIndex(function (x) { return x.id === id; });
    if (i >= 0) cart[i].qty += qty;
    else cart.push({ id: id, qty: qty });
    setCart(cart);
    return cart;
  }

  function setItemQty(id, qty) {
    var cart = getCart();
    if (qty < 1) {
      cart = cart.filter(function (x) { return x.id !== id; });
    } else {
      var i = cart.findIndex(function (x) { return x.id === id; });
      if (i >= 0) cart[i].qty = qty;
    }
    setCart(cart);
    return cart;
  }

  function getCount() {
    return getCart().reduce(function (sum, x) { return sum + x.qty; }, 0);
  }

  function getTotal() {
    return getCart().reduce(function (sum, x) {
      return sum + (PRICES[x.id] || 0) * x.qty;
    }, 0);
  }

  window.NabatiCart = {
    getCart: getCart,
    addItem: addItem,
    setItemQty: setItemQty,
    getCount: getCount,
    getTotal: getTotal,
    PRICES: PRICES
  };
})();
