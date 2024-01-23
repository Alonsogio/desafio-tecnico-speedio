import "@/components/modal/modal.css";
import { TrashIcon, XIcon } from "@heroicons/vue/outline";

export default {
  props: ["isOpen", "noteId"],
  data() {
    return {};
  },
  components: {
    TrashIcon,
    XIcon,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },

    deleteNote() {
      const request = indexedDB.open("annotationsDB", 3);

      request.onsuccess = (event) => {
        const db = event.target.result;

        const transaction = db.transaction(["annotations"], "readwrite");
        const objectStore = transaction.objectStore("annotations");

        const deleteRequest = objectStore.delete(this.noteId);

        deleteRequest.onsuccess = (event) => {
          console.log("Nota excluída com sucesso!");
          this.$emit("note-deleted", this.noteId);
          this.isDeleteModalOpen = false;

          location.reload();
        };

        deleteRequest.onerror = (event) => {
          console.error("Erro ao excluir nota: " + event.target.errorCode);
        };
      };
      request.onerror = (event) => {
        console.error(
          "Erro ao abrir o banco de dados: " + event.target.errorCode
        );
      };
    },
  },
};
