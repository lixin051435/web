<template>
  <div class="title">
    <h1>
      <img src="../assets/img/index.jpg" alt>
      {{title}}
    </h1>
  </div>
</template>
<script>
export default {
  props: ["title"]
};
</script>
<style>
.title {
  padding: 0 0 5px 0;
  border-bottom: 1px solid #a7aaac;
  width: 100%;
  margin-bottom: 30px;
  margin-top: 10px;
}
h1{
  width: 98%;
  padding-left: 2%;
  text-align: left;
}
</style>


