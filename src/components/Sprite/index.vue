<template lang="pug">
.sprite
  nav
    .icon.icon-a
    .icon.icon-b
  a(href="#/") home
</template>

<style lang="stylus" scoped>
.sprite
  .icon
    display inline-block
    width 128px
    height 128px
    background-size cover
    background-repeat no-repeat

    &.icon-a
      background-image url('./home.png')

    &.icon-b
      background-image url('./about.png')
</style>
