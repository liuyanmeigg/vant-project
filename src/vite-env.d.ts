/// <reference types="vite/client" />
// 这段话一写就解决vue识别不了vue文件问题
declare module '*vue' {
    import { ComponentOptions } from "vue";
    const ComponentOptions: ComponentOptions
    export default ComponentOptions
}
