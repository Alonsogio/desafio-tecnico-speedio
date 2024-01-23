<template>
  <TopPage />
  <div class="background">
    <MenuNav />

    <div class="bodyPageHome">
      <div>
        <img src="../../../../public/img/paper.png" alt="" />
      </div>
      <div class="divBody">
        <h2>Anotações</h2>
        <p>by Speedio</p>
      </div>
      <router-link :to="{ path: '/create' }" class="btnCreate">
        <span><PlusIcon class="plusIcon" /></span> Criar Anotações
      </router-link>
    </div>
  </div>
</template>

<script src="../home/home.js"></script>
