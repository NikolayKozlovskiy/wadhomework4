<template>

<div class="page-leftCol">
  <div class='leftCol'></div>
</div>

</template>

<script>
export default {
  name: "leftrightCols",
}
</script>

<style scoped>
.page-leftCol{
  flex: 0 0 100px;
  max-width: 20%;
}

.leftCol {
  height: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: rgb(197, 195, 195);
}
</style>