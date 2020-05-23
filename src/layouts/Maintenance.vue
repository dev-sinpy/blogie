<!--
Simple maintenance page.

*Styling*
Uses quasar classes and some inline css.
-->

<template>
  <div class="wrapper">
    <h1 class="text-white">Coming soon<span class="dot">.</span></h1>
    <p>Blogie.</p>
    <div class="icons">
      <a href=""><i class="fab fa-twitter"></i></a>
      <a href=""><i class="fab fa-github"></i></a>
      <a href=""><i class="fab fa-facebook"></i></a>
    </div>
  </div>
</template>

<script>
document.addEventListener("touchstart", function () {}, true);

export default {
  name: "Maintenance",

  data() {
    return {
      leftDrawer: true,
    };
  },
};
</script>

<style lang="css">
body {
  background: #00091b;
  color: #fff;
}

@keyframes fadeIn {
  from {
    top: 20%;
    opacity: 0;
  }
  to {
    top: 100;
    opacity: 1;
  }
}

@-webkit-keyframes fadeIn {
  from {
    top: 20%;
    opacity: 0;
  }
  to {
    top: 100;
    opacity: 1;
  }
}

.wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  animation: fadeIn 1000ms ease;
  -webkit-animation: fadeIn 1000ms ease;
}

h1 {
  font-size: 50px;
  font-family: "Poppins", sans-serif;
  margin-bottom: 0;
  line-height: 1;
  font-weight: 700;
}

.dot {
  color: #4febfe;
}

p {
  text-align: center;
  margin: 18px;
  font-family: "Muli", sans-serif;
  font-weight: normal;
}

.icons {
  text-align: center;
}

.icons i {
  color: #00091b;
  background: #fff;
  height: 15px;
  width: 15px;
  padding: 13px;
  margin: 0 10px;
  border-radius: 50px;
  border: 2px solid #fff;
  transition: all 200ms ease;
  text-decoration: none;
  position: relative;
}

.icons i:hover,
.icons i:active {
  color: #fff;
  background: none;
  cursor: pointer !important;
  transform: scale(1.2);
  -webkit-transform: scale(1.2);
  text-decoration: none;
}
</style>
