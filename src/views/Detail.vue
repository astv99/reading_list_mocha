<template>
  <div>
    <h2>Detailed Book Information</h2>
    <section class="info">
      <h3>{{title}}</h3>

      <h4 class="subheading">Author:</h4>
      <p class="subheading__info">{{author}}</p><br>

      <h4 class="subheading">Publisher:</h4>
      <p class="subheading__info"><span v-if="publisher">{{publisher}}</span><span v-else>N/A</span></p><br>

      <h4 class="subheading">Published:</h4>
      <p class="subheading__info">{{date}}</p><br>

      <h4 class="subheading">Pages:</h4>
      <p class="subheading__info">{{pageCount}}</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: {
    title: '',
    author: '',
    publisher: '',
    date: '',
    pageCount: 0
  }
}
</script>

<style scoped>
.info {
  border: 1px solid #DEDEDE;
  margin: 0 auto;
  padding: 1em 2em;
  text-align: left;
  width: fit-content;
}

.subheading {
  display: inline;
}

.subheading__info {
  display: inline-block;
  margin: 0 0 0.5em 0.5em;
}
</style>