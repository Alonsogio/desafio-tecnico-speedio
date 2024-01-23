import {
  XIcon,
  PaperClipIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/vue/outline";
import "@/views/pages/annotations/annotations.css";
import MenuNav from "@/components/menu/MenuNav.vue";
import TopPage from "@/components/topPage/topPage.vue";
import ModalDelete from "@/components/modal/modalDelete/ModalDeleteAnnotation.vue";

export default {
  data() {
    return {
      isDeleteModalOpen: false,
      selectedNoteId: null,
      annotations: [],
    };
  },
  components: {
    XIcon,
    PaperClipIcon,
    TrashIcon,
    PlusIcon,
    ModalDelete,
    MenuNav,
    TopPage,
  },
  methods: {
    loadAnnotations() {
      const request = indexedDB.open("annotationsDB", 3);

      return new Promise((resolve, reject) => {
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          const annotations = db.createObjectStore("annotations", {
            autoIncrement: true,
          });
        };

        request.onsuccess = (event) => {
          const db = event.target.result;

          const transaction = db.transaction(["annotations"], "readonly");
          const objectStore = transaction.objectStore("annotations");

          const cursor = objectStore.openCursor();

          this.annotations = [];

          cursor.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
              this.annotations.push(cursor.value);
              cursor.continue();
            }
          };

          transaction.oncomplete = () => {
            console.log("Anotações carregadas:", this.annotations);
            resolve();
          };
        };
      });
    },
    openDeleteModal(id) {
      this.isDeleteModalOpen = true;
      this.selectedNoteId = id;
    },
  },
  mounted() {
    this.loadAnnotations().then(() => {
      console.log("Annotations carregadas com sucesso!");
    });
  },
};
