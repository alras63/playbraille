<template>
  <router-view/>
</template>

<style>
  ::-webkit-scrollbar-corner {
    display: none;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-track-piece {
    background: transparent;
  }
  ::-webkit-scrollbar-button {
    display: none;
  }
  ::-webkit-scrollbar-thumb {
    background: #198754;
    border-radius: .25rem;
  }
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  #app {
    width: 100vw;
    height: 100vh;
    overflow-x: auto;
  }
  @keyframes FadeIn {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  .fadeIn {
    animation: FadeIn 2s;
  }
</style>
