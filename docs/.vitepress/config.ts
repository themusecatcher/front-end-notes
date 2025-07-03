import { defineConfig } from 'vitepress'

export default defineConfig({
  title: `Front-end Notes`,
  description: '前端笔记文档',
  base: '/front-end-notes/',

  head: [ // 网站图标
    ['link', { rel: 'icon', type: 'image/svg+xml', href: 'https://cn.vitejs.dev/viteconf.svg' }],
    // ['link', { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }],
  ],
  appearance: true, // 默认 true，设为 false 则无法切换 dark/light 主题，可选 'dark' true false
  markdown: {
    lineNumbers: false // 是否显示行数，默认 false
  },
  themeConfig: {
    logo: '/amazing-icon.svg',

    editLink: {
      pattern: 'https://github.com/themusecatcher/front-end-notes/tree/master/docs/:path',
      text: '在 GitHub 上编辑此页面' // Edit this page on GitHub
    },

    // lastUpdated: true, // 最后更新时间戳
    lastUpdated: {
      text: '最后更新于', // Last updated
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
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
      copyright: 'Copyright © 2023-present the Muse Catcher'
    },

    nav: [
      { text: 'JavaScript', link: '/javascript/started', activeMatch: '/javascript/' },
      { text: 'TypeScript', link: '/typescript/started', activeMatch: '/typescript/' },
      { text: 'HTML', link: '/html/started', activeMatch: '/html/' },
      { text: 'CSS', link: '/css/started', activeMatch: '/css/' },
      { text: 'Vue2', link: '/vue2/started', activeMatch: '/vue2/' },
      { text: 'Vue3', link: '/vue3/started', activeMatch: '/vue3/' },
      { text: 'Mobile', link: '/mobile/started', activeMatch: '/mobile/' },
      { text: 'Engineering', link: '/engineering/started', activeMatch: '/engineering/' },
      { text: 'Http', link: '/http/started', activeMatch: '/http/' },
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
                text: 'Vue',
                link: 'https://cn.vuejs.org/'
              },
              {
                text: 'TypeScript',
                link: 'https://ts.nodejs.cn/docs/'
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
                text: 'Less',
                link: 'https://less.bootcss.com/'
              },
              {
                text: 'VitePress',
                link: 'https://vitepress.dev/'
              },
              {
                text: 'Markdown',
                link: 'https://markdown.com.cn/'
              },
              {
                text: 'npm',
                link: 'https://www.npmjs.com/'
              },
              {
                text: 'pnpm',
                link: 'https://www.pnpm.cn/'
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
              link: '/javascript/notes/No.1'
            },
            {
              text: 'No.2',
              link: '/javascript/notes/No.2'
            },
            {
              text: 'No.3',
              link: '/javascript/notes/No.3'
            },
            {
              text: 'No.4',
              link: '/javascript/notes/No.4'
            },
            {
              text: 'No.5',
              link: '/javascript/notes/No.5'
            },
            {
              text: 'No.6',
              link: '/javascript/notes/No.6'
            },
            {
              text: 'No.7',
              link: '/javascript/notes/No.7'
            },
            {
              text: 'No.8',
              link: '/javascript/notes/No.8'
            },
            {
              text: 'No.9',
              link: '/javascript/notes/No.9'
            },
            {
              text: 'No.10',
              link: '/javascript/notes/No.10'
            },
            {
              text: 'No.11',
              link: '/javascript/notes/No.11'
            },
            {
              text: 'No.12',
              link: '/javascript/notes/No.12'
            },
            {
              text: 'No.13',
              link: '/javascript/notes/No.13'
            },
            {
              text: 'No.14',
              link: '/javascript/notes/No.14'
            },
            {
              text: 'No.15',
              link: '/javascript/notes/No.15'
            },
            {
              text: 'No.16',
              link: '/javascript/notes/No.16'
            },
            {
              text: 'No.17',
              link: '/javascript/notes/No.17'
            },
            {
              text: 'No.18',
              link: '/javascript/notes/No.18'
            }
          ]
        }
      ],
      '/typescript/': [
        {
          text: '指引',
          items: [
            {
              text: '开始',
              link: '/typescript/started'
            }
          ]
        },
        {
          text: 'TypeScript Notes',
          items: [
            {
              text: 'No.1',
              link: '/typescript/notes/No.1'
            },
            {
              text: 'No.2',
              link: '/typescript/notes/No.2'
            },
            {
              text: 'No.3',
              link: '/typescript/notes/No.3'
            },
            {
              text: 'No.4',
              link: '/typescript/notes/No.4'
            },
            {
              text: 'No.5',
              link: '/typescript/notes/No.5'
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
              link: '/html/notes/No.1'
            },
            {
              text: 'No.2',
              link: '/html/notes/No.2'
            },
            {
              text: 'No.3',
              link: '/html/notes/No.3'
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
              link: '/css/notes/No.1'
            },
            {
              text: 'No.2',
              link: '/css/notes/No.2'
            },
            {
              text: 'No.3',
              link: '/css/notes/No.3'
            },
            {
              text: 'No.4',
              link: '/css/notes/No.4'
            },
            {
              text: 'No.5',
              link: '/css/notes/No.5'
            },
            {
              text: 'No.6',
              link: '/css/notes/No.6'
            },
            {
              text: 'No.7',
              link: '/css/notes/No.7'
            },
            {
              text: 'No.8',
              link: '/css/notes/No.8'
            },
            {
              text: 'No.9',
              link: '/css/notes/No.9'
            }
          ]
        },
        {
          text: 'SASS Notes',
          items: [
            {
              text: 'No.1',
              link: '/css/sass/No.1'
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
              link: '/vue2/notes/No.1'
            },
            {
              text: 'No.2',
              link: '/vue2/notes/No.2'
            },
            {
              text: 'No.3',
              link: '/vue2/notes/No.3'
            },
            {
              text: 'No.4',
              link: '/vue2/notes/No.4'
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
              link: '/vue3/notes/No.1'
            },
            {
              text: 'No.2',
              link: '/vue3/notes/No.2'
            },
            {
              text: 'No.3',
              link: '/vue3/notes/No.3'
            },
            {
              text: 'No.4',
              link: '/vue3/notes/No.4'
            }
          ]
        }
      ],
      '/mobile/': [
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
          text: 'MiniProgram',
          items: [
            {
              text: 'No.1',
              link: '/mobile/notes/miniprogram/No.1'
            },
            {
              text: 'No.2',
              link: '/mobile/notes/miniprogram/No.2'
            },
            {
              text: 'No.3',
              link: '/mobile/notes/miniprogram/No.3'
            },
            {
              text: 'No.4',
              link: '/mobile/notes/miniprogram/No.4'
            },
            {
              text: 'No.5',
              link: '/mobile/notes/miniprogram/No.5'
            }
          ]
        },
        {
          text: 'H5',
          items: [
            {
              text: 'No.1',
              link: '/mobile/notes/h5/No.1'
            }
          ]
        }
      ],
      '/engineering/': [
        {
          text: '指引',
          items: [
            {
              text: '开始',
              link: '/engineering/started'
            }
          ]
        },
        {
          text: 'Engineering Notes',
          items: [
            {
              text: 'No.1',
              link: '/engineering/notes/No.1'
            },
            {
              text: 'No.2',
              link: '/engineering/notes/No.2'
            },
            {
              text: 'No.3',
              link: '/engineering/notes/No.3'
            },
            {
              text: 'No.4',
              link: '/engineering/notes/No.4'
            },
            {
              text: 'No.5',
              link: '/engineering/notes/No.5'
            }
          ]
        }
      ],
      '/http/': [
        {
          text: '指引',
          items: [
            {
              text: '开始',
              link: '/http/started'
            }
          ]
        },
        {
          text: 'Http Notes',
          items: [
            {
              text: 'No.1',
              link: '/http/notes/No.1'
            },
            {
              text: 'No.2',
              link: '/http/notes/No.2'
            },
            {
              text: 'No.3',
              link: '/http/notes/No.3'
            },
            {
              text: 'No.4',
              link: '/http/notes/No.4'
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
              link: '/plugins/plugin/draggable'
            },
            {
              text: '引擎图 GaugeChart',
              link: '/plugins/plugin/gaugechart'
            },
            {
              text: '懒加载 Lazyload',
              link: '/plugins/plugin/lazyload'
            },
            {
              text: '树图 TreeChart',
              link: '/plugins/plugin/treechart'
            }
          ]
        }
      ]
    }
  }
})
