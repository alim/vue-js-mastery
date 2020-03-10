// Setup a component for the product
Vue.component('product', {
  template: `
    <div class="product">
      <div class="product-image">
        <img :src="image" />
      </div>

      <div class="product-info">
        <h1>{{ title }}</h1>

        <p v-if="inStock">In Stock
            <span v-if="onSale"><em>and</em> On Sale!</span>
        </p>
        <p v-else :class="{ outOfStock: true }" >
          Out of Stock
        </p>

        <p>{{ isOnSale }}</p>

        <p>Product Details:</p>
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <p>Color Options:</p>
        <div
          class="color-box"
          v-for="(variant, index) in variants" :key="variant.variantId"
          :style="{ backgroundColor: variant.variantColor }"
          @mouseover="updateProduct(index)" >
        </div>

        <p>Size Options:</p>
        <ul>
          <li v-for="size in sizes">{{ size }}</li>
        </ul>

        <button
          @click="addToCart"
          :disabled="!inStock"
          :class="{ disabledButton: !inStock }" >
            Add to cart
        </button >

        <button
          @click="removeFromCart"
          :disabled="!inStock"
          :class="{ disabledButton: !inStock }" >
            Remove from cart
        </button >

        <div class="cart">
          <p>Cart({{ cart }})</p>
        </div>
      </div>
    </div>
  `,

  data() {
    return {
      product: 'Socks',
      brand: 'Vue Mastery',
      selectedVariant: 0,
      link: 'https://www.amazon.com',
      details: ['80% cotton', '20% polyester', 'Gender-neutral'],
      variants: [
        {
          variantId: 2234,
          variantColor: 'green',
          variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
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
    }
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
    }
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


// Add a link to your data object, and use v-bind to sync it up with an
// anchor tag in your HTML. Hint: you’ll be binding to the href attribute.
var app = new Vue({
  el: '#app'
})

