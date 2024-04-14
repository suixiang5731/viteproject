import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    // root: "/", // index.html 目录，默认是根目录 "/", 如果没改可以用写
    // base: "www.xxx.com", // 类似webpack的 publicPath

    /**
     * 指定静态资源目录，默认值为 "./public"
     * 所谓 静态资源 ，即想要在项目运行起来之后才需要
     * 读到的内容
     */
    // publicDir: "./static",
    resolve: {
        // 去后缀
        extensions: [".js", ".ts", ".css"],
        // 别名
        alias: {
            "@": __dirname+"/src"
        }
    },
    // jsx相关配置，基本上所有使用jsx相关的项目都要这样配置，可以记录一下
    esbuild: {
        jsxFactory: "h",
        jsxFragment: "Fragment",
        jsxInject: "import {h} from 'vue'"
    },

    /**
     * build 和 server 是两种模式下的配置，单一生效
     * build只在打包生产时生效
     * server只在开发运行时生效
     */
    // 打包配置(只对打包时有用) -- 与 rollup 配置一样
    build: {
        // 设置图片转base64的尺寸阈值，小于此阈值会转base64放入js中
        assetsInlineLimit: 5000,

        /*rollupOptions 内配置可以用于调控 入口 出口
        ，代码分割等工作*/
        // 有些配置和rollup的配置一毛一样，就放在这边，上面的assetsInlineLimit虽然rollup也有
        // 但是 vite把他改写过了提到外面了
        rollupOptions: {
            /*// 指定入口文件
            input: "./index.build.html",*/
            output :{
                /*// 指定打包输出路径
                dir: "./dist2",
                // 指定打包之后的入口名
                entryFileNames: "bundle.js",
                // 指定打包之后的chunk名
                chunkFileNames: "[name].chunk.js",*/
                // vite 中通过 manualChunks 进行代码分割
                /* 指定特定的一个或者多个第三方库的写法
                manualChunks: {
                    // 指定某一个或者多个第三方库单独打包
                    vendor: ["vue", "lodash"] // ["vue"]
                }*/
                /* 指定所有在node_modules 中的第三方库拆分的写法
                * */
                manualChunks: (path) => {
                    // path 为 库的路径，此处判断若包含 node_modules 则拆分出来打包在一起
                    if (path.includes('node_modules')) {
                        return "vendor"
                    }
                }
            }
        }
    },
    // 开发配置
    server: {
        port: 2000,
        // 写法与 webpack 基本一致
        proxy: {
            "/api": {
                target: "www.xxx.com",
                // 路径重写写法不太一样，vite写法参照下面所示
                rewrite: (path) => {
                    return path.replace(/^\/api/,"XXX")
                }
            }
        },
        headers: {}/*,
        https: false*/
    },

    plugins: [vue()],
})



/*import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
})*/
