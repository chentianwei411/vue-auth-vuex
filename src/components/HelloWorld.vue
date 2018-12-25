<template>
  <div class="hello">
    <h1>test: {{ typesth }}</h1>
    <h1>{{title}}</h1>
		<ul>
			<li v-for="(loop, index) in forLoop" :key="index">
				{{loop}}
			</li>
		</ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "HelloWorld",
  computed: {
    typesth() {
      return this.$store.state.test
    },
    ...mapState(['title', 'forLoop'])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
