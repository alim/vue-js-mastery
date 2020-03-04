// Add a link to your data object, and use v-bind to sync it up with an
// anchor tag in your HTML. Hint: you’ll be binding to the href attribute.

var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    brand: 'Vue Mastery',
    selectedVariant: 0,
    link: 'https://www.amazon.com',
    details: ['80% cotton', '20% polyester', 'Gender-neutral'],
    variants: [
      {
        variantId: 2234,
        variantColor: 'green',
        variantImage:  'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
        variantQuantity: 10
      },
      {
        variantId: 2235,
        variantColor: 'blue',
        variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
        variantQuantity: 0
      }
    ],
    sizes: ['small', 'medium', 'large', 'x-large'],
    cart: 0,
    onSale: true
  },

  methods: {
    addToCart() {
      this.cart += 1
    },

    updateProduct(index) {
      this.selectedVariant = index
      console.log("Image index - " + index)
    },

    removeFromCart() {
      if (this.cart > 0) {
        this.cart -= 1
      }
    },
  },

  computed: {
    title() {
      return this.brand + ' ' + this.product
    },

    image(){
      return this.variants[this.selectedVariant].variantImage
    },

    inStock(){
      return this.variants[this.selectedVariant].variantQuantity
    },

    isOnSale() {
      if (this.onSale) {
        return this.brand + ' ' + this.product + ' are on Sale Now!'
      } else {
        return this.brand + ' ' + this.product + ' are at our regular low price.'
      }
    }
  }
})

