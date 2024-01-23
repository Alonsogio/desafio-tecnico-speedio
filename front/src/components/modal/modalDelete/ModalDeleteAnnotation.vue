<template>
  <div class="modal" v-if="isOpen">
    <div class="topModal">
      <h1 class="h1Modal">Deseja excluir essa anotação</h1>
      <div class="closeTop" @click="closeModal"><XIcon class="xIcon" /></div>
    </div>

    <div class="bodyModal">
      <p class="pModal">
        Você está prestes a deletar uma anotação e esta ação não poderá ser
        desfeita. Tem certeza que deseja excluí-la?
      </p>
      <div class="btnGroup">
        <button class="btnModalCancel" @click="closeModal">Cancelar</button>
        <button @click="deleteNote" type="button" class="btnModalExcluir">
          <span>Excluir</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script src="../modalDelete/modalDelete.js"></script>
