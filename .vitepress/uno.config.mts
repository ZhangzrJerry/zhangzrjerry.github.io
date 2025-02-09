import { defineConfig } from "unocss/vite";
import { presetAttributify } from "unocss";

export default defineConfig({
    presets: [presetAttributify()],
});