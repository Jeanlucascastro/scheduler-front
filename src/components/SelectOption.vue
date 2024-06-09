<template>
  <div class="dynamic-box">
    <div v-for="time in datas" :key="time.time" :value="time.time">
      <button class="dynamic-element" @click="select(time)">
        {{ time.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>

<script lang="ts">
export default {
  name: 'SelectOption',
  data() {
    return {}
  },
  setup() {},

  components: {},

  props: {
    datas: [] as any,
    destination: String
  },

  methods: {
    select(option: any) {
      this.$emit('optionSelected', option)
    }
  }
}
</script>
