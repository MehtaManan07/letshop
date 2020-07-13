export const addItem = (item, next) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
        ...item, count: 1
    })
    cart = Array.from(new Set(cart.map((product) => (product._id)))).map(id => {
        return cart.find(product => product._id === id)
    })

    localStorage.setItem('cart',JSON.stringify(cart))
    next()

  }
};
