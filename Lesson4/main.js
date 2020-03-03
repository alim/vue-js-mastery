// Add a link to your data object, and use v-bind to sync it up with an
// anchor tag in your HTML. Hint: you’ll be binding to the href attribute.

var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    image: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
    link: 'https://www.amazon.com',
    inStock: true,
    onSale: true,
    details: ['80% cotton', '20% polyester', 'Gender-neutral'],
    variants: [
      {
        variantId: 2234,
        variantColor: 'Green'
      },
      {
        variantId: 2235,
        variantColor: 'Blue'
      }
    ],
    sizes: ['small', 'medium', 'large', 'x-large']
  }
})

