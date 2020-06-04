// Product details for components
Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },

  template: `
    <div>
      <p>Product Details:</p>
      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>
    </div>
  `
})


// Setup a component for the product
Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
    cart: {
      type: Array,
      required: true,
    }
  },

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

        <p>User is premium: {{ premium }}</p>
        <p>Shipping cost: {{ shipping }}</p>

        <product-details :details="details"></product-details>

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
        <div>
          <h2>Reviews</h2>
          <p v-if="!reviews.length">There are no reviews yet.</p>
          <p v-else>You have {{ reviews.length }} review(s).</p>
          <ul>
            <li v-for="review in reviews">
            <p>{{ review.name }}</p>
            <p>Rating: {{ review.rating }}</p>
            <p>{{ review.review }}</p>
            <p>Would recommend? {{ review.recommend }}</p>
            </li>
          </ul>
        </div>

        <product-review @review-submitted="addReview"></product-review>
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
      onSale: true,
      reviews: []
    }
  },

  methods: {
    addReview(productReview) {
      this.reviews.push(productReview)
    },

    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },

    updateProduct(index) {
      this.selectedVariant = index
      console.log("Image index - " + index)
    },

    removeFromCart() {
      if (this.cart.length > 0) {
        this.$emit('remove-from-cart')
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
    },

    shipping() {
      if (this.premium) {
        return "Free"
      } else {
        return 2.99
      }
    }
  }
})

// Product review component
Vue.component('product-review', {
  template: `
    <div>
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
      <form class="review-form" @submit.prevent="onSubmit">
        <p>
          <label for="name">Name:</label>
          <input id="name" v-model="name" placeholder="name">
        </p>

        <p>
          <label for="review">Review:</label>
          <textarea id="review"
            v-model="review"
            placeholder="Please write a review here">
          </textarea>
        </p>

        <p>
          <label for="rating">Rating:</label>
          <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </p>

        <p>
          Would you recommend this product?
        </p>
        <p>
          <label for="recommend-yes">Yes, I would</label>
          <input type="radio" v-model="recommend" id="recommend-yes" value="yes" name="recommned">
          <label for="recommend-no">No, I wouldn't</label>
          <input type="radio" v-model="recommend" id="recommend-no" value="no" name="recommned">
        </p>
        <p>
          <input type="submit" value="Submit">
        </p>

      </form>
    </div>

  `,

  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: [],
      recommend: null
    }
  },

  // Review component methods
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        }
        this.$emit('review-submitted', productReview)
        this.name = null
        this.review = null
        this.rating = null
        this.recommend = null
      } else {
        if(!this.name) this.errors.push("Name required.")
        if(!this.review) this.errors.push("Review required.")
        if(!this.rating) this.errors.push("Rating required.")
        if(!this.recommend) this.errors.push("Recommendation required.")
      }
    }
  }
})

// Main top level component
var app = new Vue({
  el: '#app',
  data: {
    premium_status: true,
    cart: []
  },
  methods: {
    addItemToCart(id) {
      this.cart.push(id)
    },

    removeItemFromCart() {
      this.cart.pop()
    }
  }
})

