<template>
  <div class="menu" :class="{ menu: isMenuClose, openMenu: !isMenuClose }">
    <button class="btnNav">
      <router-link to="/"><HomeIcon class="navIcons" /></router-link>
    </button>

    <button class="btnAbrir" @click="toggleMenu">Menu</button>

    <button class="btnNav">
      <router-link to="/annotations"
        ><PaperClipIcon class="navIcons"
      /></router-link>
    </button>
    <button class="btnNav">
      <router-link to="/create"><PencilAltIcon class="navIcons" /></router-link>
    </button>
  </div>
</template>

<script src="../menu/menu.js"></script>
