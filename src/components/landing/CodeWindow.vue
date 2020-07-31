<template>
	<section class="code__window">
    <section class="dots">
      <article class="dot dot__red"></article>
      <article class="dot dot__orange"></article>
      <article class="dot dot__green"></article>
    </section>
    <q-img src="statics/showcase.webp" />
  </section>
</template>

<script>
export default {
	name: "CodeWindow"
}
</script>

<style lang="scss" scoped>

.code__window {
  border-radius: 0.45rem;
  background-color: #ffffff;
  padding: 1.52rem;
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.1);
}

.dots {
	display: flex;
	align-items: flex-start;

	.dot {
		margin-right: 0.5rem;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
	}
}

.dot__red { background-color: #ff1744; }
.dot__orange { background-color: #f6c343; }
.dot__green { background-color: #5cc72a; }

</style>