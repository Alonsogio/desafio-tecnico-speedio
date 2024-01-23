import { XIcon, TrashIcon } from "@heroicons/vue/outline";
import "@/views/pages/create/create.css";
import { ElSelect, ElOption, ElDatePicker } from "element-plus";
import "element-plus/theme-chalk/index.css";
import MenuNav from "@/components/menu/MenuNav.vue";
import TopPage from "@/components/topPage/topPage.vue";

export default {
  data() {
    return {
      formattedValue: "",
      selectedOption: null,
      selectedDate: null,
      options: [
        { label: "Urgente", value: "Urgente" },
        { label: "Importante", value: "Importante" },
        { label: "Normal", value: "Normal" },
        { label: "Baixa", value: "Baixa" },
      ],
      noteCounter: 1,
    };
  },
  components: {
    XIcon,
    TrashIcon,
    ElSelect,
    ElOption,
    ElDatePicker,
    MenuNav,
    TopPage,
  },
  methods: {
    formatInput() {
      if (this.formattedValue.trim() !== "") {
        var atual =
          parseFloat(
            this.formattedValue.replace(/[^\d,]/g, "").replace(",", ".")
          ) || 0;
        this.formattedValue = atual.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        });
      }
    },

    getNextId() {
      return this.noteCounter++;
    },

    async saveNote() {
      const textAreaValue = document.querySelector("textarea").value;
      const formattedValue = this.formattedValue;
      const selectedOption = this.selectedOption;

      if (!textAreaValue.trim()) {
        alert("O campo de texto não pode estar vazio");
        return;
      }

      if (!this.selectedDate) {
        alert("Por favor, selecione uma data");
        return;
      }

      const categorization = Array.isArray(selectedOption)
        ? selectedOption[0]
        : null;

      const note = {
        text: textAreaValue,
        potencial: formattedValue,
        categorizacao: categorization,
        lembrete: this.selectedDate,
      };

      await this.saveNoteToIndexedDB(note);

      document.querySelector("textarea").value = "";
      this.formattedValue = "";
      this.selectedOption = null;
      this.selectedDate = null;
    },

    async saveNoteToIndexedDB(note) {
      const request = indexedDB.open("annotationsDB", 3);
      const self = this;

      return new Promise((resolve, reject) => {
        request.onupgradeneeded = function (event) {
          const db = event.target.result;
          const annotations = db.createObjectStore("annotations", {
            keyPath: "id",
            autoIncrement: true,
          });
        };

        request.onsuccess = function (event) {
          const db = event.target.result;
          const transaction = db.transaction(["annotations"], "readwrite");
          const objectStore = transaction.objectStore("annotations");

          var noteid = self.getNextId();

          const addRequest = objectStore.add({
            id: noteid,
            text: note.text,
            potencial: note.potencial,
            categorizacao: note.categorizacao,
            lembrete: note.lembrete,
          });

          addRequest.onsuccess = function (event) {
            resolve("Nota adicionada com sucesso.");
            window.location.href = "/annotations";
          };

          addRequest.onerror = function (event) {
            console.error("Erro ao adicionar nota: " + event.target.errorCode);
            reject("Erro ao adicionar nota: " + event.target.errorCode);
          };
        };

        request.onerror = function (event) {
          console.error(
            "Erro ao abrir o banco de dados: " + event.target.errorCode
          );
          reject("Erro ao abrir o banco de dados: " + event.target.errorCode);
        };
      });
    },
  },
};
