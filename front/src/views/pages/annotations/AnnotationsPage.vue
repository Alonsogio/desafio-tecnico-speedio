<template>
  <TopPage />
  <div class="background">
    <MenuNav />

    <ul class="bodyPageAnnotations" v-if="annotations.length > 0">
      <li class="liAnnotations" v-for="note in annotations" :key="note.id">
        <div>
          <PaperClipIcon class="clipIconLi" />
        </div>
        <div>
          <div>
            <h3>{{ note.text }}</h3>
          </div>

          <p class="liP">{{ note.lembrete }}</p>
        </div>
        <div>
          <TrashIcon
            class="trashIconLi"
            @click="
              openDeleteModal(note.id);
              selectedNoteId = note.id;
            "
          />
        </div>
      </li>
    </ul>
    <div v-else class="divSemAnotacao">
      <img src="../../../../public/img/clip.png" alt="Imagem Sem Anotações" />
      <div>
        <p>Você ainda não possui anotações</p>
      </div>
    </div>

    <router-link to="/create" class="btnCreate">
      <span><PlusIcon class="plusIcon" /></span> Criar Anotações
    </router-link>
  </div>

  <ModalDelete
    :isOpen="isDeleteModalOpen"
    @close="isDeleteModalOpen = false"
    @note-deleted="deleteNote"
    :noteId="selectedNoteId"
  />
</template>

<script src="../annotations/annotations.js"></script>
