<template>
  <section class="loadingPage">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.loadingPage {
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-content: center;
  z-index: 1000;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 128px;
  height: 128px;
  align-self: center;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 128px;
  height: 128px;
  margin: 6px;
  border: 12px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: blue transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>