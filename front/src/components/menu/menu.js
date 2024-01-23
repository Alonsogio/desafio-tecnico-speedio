import "@/components/menu/menu.css";
import { PaperClipIcon, PencilAltIcon, HomeIcon } from "@heroicons/vue/outline";

export default {
  data() {
    return {
      isMenuClose: true,
    };
  },
  components: {
    PaperClipIcon,
    PencilAltIcon,
    HomeIcon,
  },
  methods: {
    toggleMenu() {
      this.isMenuClose = !this.isMenuClose;
    },
  },
};
