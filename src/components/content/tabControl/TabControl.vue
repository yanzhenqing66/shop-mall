<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item, index) in titles" :class="{active: index == currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: Array,
    default() {
      return []
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
    }
  },
}
</script>

<style>
  .tab-control {
    display: flex;
    height: 40px;
    font-size: 16px;
    text-align: center;
    background-color: #fff;
    z-index: 9;
  }

  .tab-control-item {
    flex: 1;
    line-height: 44px;
  }

  .tab-control span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 2px solid var(--color-tint);
  }


</style>