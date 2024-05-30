<template>
  <div class="aval">
    <div v-for="time in datas" :key="time.time" :value="time.time">
      <button class="pod" @click="select(time)">
        {{ time.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.aval {
  display: flex;
  flex-wrap: wrap;
}

.pod {
  background-color: #d18d2b;
  padding: 13px;
  border-radius: 14px;
  border: unset;
  margin-right: 2px;
}
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
