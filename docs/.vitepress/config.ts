import { defineConfig } from 'vitepress'

export default defineConfig({
  title: `Front-end Notes`,
  description: '前端笔记文档',
  base: '/front-end-notes/',

  head: [ // 网站图标
    ['link', { rel: 'icon', type: 'image/svg+xml', href: 'logo.svg' }],
    // ['link', { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }],
  ],
  appearance: true, // 默认 true，设为 false 则无法切换dark/light主题，可选 'dark' true false
  markdown: {
    lineNumbers: false // 是否显示行数，默认false
  },
  themeConfig: {
    logo: '/logo.svg',

    editLink: {
      pattern: 'https://github.com/themusecatcher/front-end-notes/tree/master/docs/:path',
      text: 'Suggest changes to this page',
    },
    // 默认支持icon包括：'discord'|'facebook'|'github'|'instagram'|'linkedin'|'mastodon'|'slack'|'twitter'|'youtube'
    socialLinks: [
      { icon: 'github', link: 'https://github.com/themusecatcher/front-end-notes' },
      // 自定义icon
      // {
      //   icon: {
      //     svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Dribbble</title><path d="M12...6.38z"/></svg>'
      //   },
      //   link: 'https://www.npmjs.com/package/front-end-notes'
      // }
    ],

    // search: { // vitepress 内置 search
    //   provider: 'local'
    // },

    algolia: { // algolia 搜索服务 与 内置 search 可二选一
      appId: 'LPTNA0E8HM',
      apiKey: '8f1b68dfab6b0320adef728a1c3a77cc',
      indexName: 'themusecatcher_front-end'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present The Muse Catcher',
    },

    nav: [
      { text: 'Vue2 Notes', link: '/vue2/note-1', activeMatch: '/vue2/' },
      { text: 'Vue3 Notes', link: '/vue3/note-1', activeMatch: '/vue3/' },
      {
        text: 'links',
        items: [
          { text: 'My Github', link: 'https://github.com/themusecatcher' },
          { text: 'My CSDN', link: 'https://blog.csdn.net/Dandrose?type=blog' },
          {
            items: [
              {
                text: 'Vue 2 Docs',
                link: 'https://v2.cn.vuejs.org/v2/guide/',
              },
              {
                text: 'Vue 3 Docs',
                link: 'https://cn.vuejs.org/guide/introduction.html',
              },
              {
                text: 'TypeScript Docs',
                link: 'https://www.tslang.cn/docs/home.html',
              },
              {
                text: 'MDN Web Docs',
                link: 'https://developer.mozilla.org/zh-CN/',
              }
            ]
          },
          {
            items: [
              {
                text: 'npm',
                link: 'https://www.npmjs.com/',
              },
              {
                text: 'vite',
                link: 'https://cn.vitejs.dev/',
              },
              {
                text: 'markdown',
                link: 'https://markdown.com.cn/',
              },
              {
                text: 'vitepress',
                link: 'https://vitepress.dev/',
              }
            ]
          }
        ]
      }
    ],

    sidebar: {
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
              text: 'note-1',
              link: '/vue2/note-1'
            },
            {
              text: 'note-2',
              link: '/vue2/note-2'
            },
            {
              text: 'note-3',
              link: '/vue2/note-3'
            },
            {
              text: 'note-4',
              link: '/vue2/note-4'
            },
            {
              text: 'note-5',
              link: '/vue2/note-5'
            },
            {
              text: 'note-6',
              link: '/vue2/note-6'
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
              text: 'note-1',
              link: '/vue3/note-1'
            },
            {
              text: 'note-2',
              link: '/vue3/note-2'
            },
            {
              text: 'note-3',
              link: '/vue3/note-3'
            },
            {
              text: 'note-4',
              link: '/vue3/note-4'
            },
            {
              text: 'note-5',
              link: '/vue3/note-5'
            },
            {
              text: 'note-6',
              link: '/vue3/note-6'
            }
          ]
        }
      ]
    }
  }
})
