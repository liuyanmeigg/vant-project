import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath, URL } from 'node:url'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // 配置elementPlus采用sass样式配色系统
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    })],
  // 全部配置路径别名（这里是让vite认识到）
  resolve: {
    alias: {
      // 实际的路径转换 @ => src
      // "@": path.join(__dirname, 'src'),
      // "#": path.join(__dirname, 'types'),
      "@": fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      // 自动导入定制样式覆盖
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as * ;`
      }
    }
  }
})
