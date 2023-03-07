<template >
<div class="home">
    
</div>
</template>

<script setup name="Home">
const version = ref('3.6.2')

function goTarget(url) {
  window.open(url, '__blank')
}
</script>

<style scoped lang="scss">
.home {
  background-image: url("@/assets/images/psc.jpg");
  background-size: cover;

  // 屏幕宽度-100px
  width: calc(100vw );
  // 屏幕高度-100px
  height: calc(100vh - 90px);
}
</style>

