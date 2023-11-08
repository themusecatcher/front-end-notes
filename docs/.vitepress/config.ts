import { defineConfig } from 'vitepress'

export default defineConfig({
  title: `Front-end Notes`,
  description: '前端笔记文档',
  base: '/front-end-notes/',

  head: [ // 网站图标
    ['link', { rel: 'icon', type: 'image/svg+xml', href: 'https://cn.vitejs.dev/viteconf.svg' }],
    // ['link', { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }],
  ],
  appearance: true, // 默认 true，设为 false 则无法切换dark/light主题，可选 'dark' true false
  markdown: {
    lineNumbers: false // 是否显示行数，默认false
  },
  themeConfig: {
    logo: '/amazing-icon.svg',

    editLink: {
      pattern: 'https://github.com/themusecatcher/front-end-notes/tree/master/docs/:path',
      text: 'Suggest changes to this page'
    },
    // 默认支持icon包括：'discord'|'facebook'|'github'|'instagram'|'linkedin'|'mastodon'|'slack'|'twitter'|'youtube'
    socialLinks: [
      { icon: 'github', link: 'https://github.com/themusecatcher/front-end-notes' }
      // 自定义icon
      // {
      //   icon: {
      //     svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Dribbble</title><path d="M12...6.38z"/></svg>'
      //   },
      //   link: 'https://www.npmjs.com/package/front-end-notes'
      // }
    ],

    search: { // vitepress 内置 search
      provider: 'local'
    },

    // algolia: { // algolia 搜索服务 与 内置 search 可二选一
    //   appId: 'LPTNA0E8HM',
    //   apiKey: '8f1b68dfab6b0320adef728a1c3a77cc',
    //   indexName: 'themusecatcher_front-end'
    // },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present The Muse Catcher'
    },

    nav: [
      { text: 'JavaScript', link: '/javascript/No.1', activeMatch: '/javascript/' },
      { text: 'CSS', link: '/css/No.1', activeMatch: '/css/' },
      { text: 'HTML', link: '/html/No.1', activeMatch: '/html/' },
      { text: 'Vue2', link: '/vue2/No.1', activeMatch: '/vue2/' },
      { text: 'Vue3', link: '/vue3/No.1', activeMatch: '/vue3/' },
      { text: 'Plugins', link: '/plugins/started', activeMatch: '/plugins/' },
      {
        text: 'Links',
        items: [
          { text: 'My Github', link: 'https://github.com/themusecatcher' },
          { text: 'My CSDN', link: 'https://blog.csdn.net/Dandrose?type=blog' },
          { text: 'Amazing UI', link: 'https://themusecatcher.github.io/vue-amazing-ui/' },
          { text: 'Naive UI', link: 'https://www.naiveui.com/zh-CN/dark' },
          { text: 'Naive Admin', link: 'https://www.naiveadmin.com/' },
          { text: 'Naive Ui Admin', link: 'https://docs.naiveadmin.com/' },
          { text: 'Ant Design Vue', link: 'https://www.antdv.com/docs/vue/introduce-cn' },
          { text: 'Element Plus', link: 'https://element-plus.org/zh-CN/' },
          { text: 'Arco Design Vue', link: 'https://arco.design/vue/docs/start' },
          {
            items: [
              {
                text: 'npm',
                link: 'https://www.npmjs.com/'
              },
              {
                text: 'pnpm',
                link: 'https://www.pnpm.cn/'
              },
              {
                text: 'Vite',
                link: 'https://cn.vitejs.dev/'
              },
              {
                text: 'Rollup',
                link: 'https://cn.rollupjs.org/'
              },
              {
                text: 'VitePress',
                link: 'https://vitepress.dev/'
              },
              {
                text: 'Markdown',
                link: 'https://markdown.com.cn/'
              }
            ]
          }
        ]
      },
      {
        text: 'Docs',
        items: [
          {
            text: 'Vue 2 Docs',
            link: 'https://v2.cn.vuejs.org/v2/guide/'
          },
          {
            text: 'Vue 3 Docs',
            link: 'https://cn.vuejs.org/guide/introduction.html'
          },
          {
            text: 'VueUse',
            link: 'https://vueuse.org/'
          },
          {
            text: 'TypeScript Docs',
            link: 'https://www.tslang.cn/docs/home.html'
          },
          {
            text: 'MDN Web Docs',
            link: 'https://developer.mozilla.org/zh-CN/'
          },
          {
            text: 'Less Docs',
            link: 'https://less.bootcss.com/'
          },
          {
            text: 'Lodash Docs',
            link: 'https://www.lodashjs.com/'
          }
        ]
      }
    ],

    sidebar: {
      '/javascript/': [
        {
          text: '指引',
          items: [
            {
              text: '开始',
              link: '/javascript/started'
            }
          ]
        },
        {
          text: 'JavaScript Notes',
          items: [
            {
              text: 'No.1',
              link: '/javascript/No.1'
            },
            {
              text: 'No.2',
              link: '/javascript/No.2'
            },
            {
              text: 'No.3',
              link: '/javascript/No.3'
            },
            {
              text: 'No.4',
              link: '/javascript/No.4'
            },
            {
              text: 'No.5',
              link: '/javascript/No.5'
            },
            {
              text: 'No.6',
              link: '/javascript/No.6'
            },
            {
              text: 'No.7',
              link: '/javascript/No.7'
            },
            {
              text: 'No.8',
              link: '/javascript/No.8'
            }
          ]
        }
      ],
      '/css/': [
        {
          text: '指引',
          items: [
            {
              text: '开始',
              link: '/css/started'
            }
          ]
        },
        {
          text: 'CSS Notes',
          items: [
            {
              text: 'No.1',
              link: '/css/No.1'
            },
            {
              text: 'No.2',
              link: '/css/No.2'
            },
            {
              text: 'No.3',
              link: '/css/No.3'
            },
            {
              text: 'No.4',
              link: '/css/No.4'
            },
            {
              text: 'No.5',
              link: '/css/No.5'
            },
            {
              text: 'No.6',
              link: '/css/No.6'
            },
            {
              text: 'No.7',
              link: '/css/No.7'
            }
          ]
        }
      ],
      '/html/': [
        {
          text: '指引',
          items: [
            {
              text: '开始',
              link: '/html/started'
            }
          ]
        },
        {
          text: 'HTML Notes',
          items: [
            {
              text: 'No.1',
              link: '/html/No.1'
            },
            {
              text: 'No.2',
              link: '/html/No.2'
            }
          ]
        }
      ],
      '/vue2/': [
        {
          text: '指引',
          items: [
            {
              text: '开始',
              link: '/vue2/started'
            }
          ]
        },
        {
          text: 'Vue2 Notes',
          items: [
            {
              text: 'No.1',
              link: '/vue2/No.1'
            },
            {
              text: 'No.2',
              link: '/vue2/No.2'
            },
            {
              text: 'No.3',
              link: '/vue2/No.3'
            },
            {
              text: 'No.4',
              link: '/vue2/No.4'
            }
          ]
        }
      ],
      '/vue3/': [
        {
          text: '指引',
          items: [
            {
              text: '开始',
              link: '/vue3/started'
            }
          ]
        },
        {
          text: 'Vue3 Notes',
          items: [
            {
              text: 'No.1',
              link: '/vue3/No.1'
            }
          ]
        }
      ],
      '/plugins/': [
        {
          text: '指引',
          items: [
            {
              text: '开始',
              link: '/plugins/started'
            }
          ]
        },
        {
          text: 'Plugins Use',
          items: [
            {
              text: '拖拽 Draggable',
              link: '/plugins/draggable'
            },
            {
              text: '引擎图 GaugeChart',
              link: '/plugins/gaugechart'
            },
            {
              text: '懒加载 Lazyload',
              link: '/plugins/lazyload'
            },
            {
              text: '树图 TreeChart',
              link: '/plugins/treechart'
            }
          ]
        }
      ]
    }
  }
})
