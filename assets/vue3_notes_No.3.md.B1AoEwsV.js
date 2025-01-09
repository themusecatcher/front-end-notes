import{_ as n,c as e,j as i,a as t,G as l,ac as p,B as h,o as k}from"./chunks/framework.GmajO-LI.js";const m=JSON.parse('{"title":"Note 3","description":"","frontmatter":{},"headers":[],"relativePath":"vue3/notes/No.3.md","filePath":"vue3/notes/No.3.md","lastUpdated":1727337514000}'),r={name:"vue3/notes/No.3.md"};function E(d,s,o,c,g,y){const a=h("BackTop");return k(),e("div",null,[s[0]||(s[0]=i("h1",{id:"note-3",tabindex:"-1"},[t("Note 3 "),i("a",{class:"header-anchor",href:"#note-3","aria-label":'Permalink to "Note 3"'},"​")],-1)),l(a),s[1]||(s[1]=p(`<h2 id="vue3-typescript-vite-less-开发-h5-项目-amfe-flexible-postcss-pxtorem" tabindex="-1">Vue3+TypeScript+Vite+Less 开发 H5 项目（amfe-flexible + postcss-pxtorem） <a class="header-anchor" href="#vue3-typescript-vite-less-开发-h5-项目-amfe-flexible-postcss-pxtorem" aria-label="Permalink to &quot;Vue3+TypeScript+Vite+Less 开发 H5 项目（amfe-flexible + postcss-pxtorem）&quot;">​</a></h2><h3 id="参考文档" tabindex="-1">参考文档 <a class="header-anchor" href="#参考文档" aria-label="Permalink to &quot;参考文档&quot;">​</a></h3><ul><li><p><a href="https://www.npmjs.com/package/amfe-flexible" target="_blank" rel="noreferrer">amfe-flexible</a>：将根元素 <code>html</code> 的字体大小 <code>fontSize（1rem）</code> 设为 <code>viewWidth / 10</code>，以适配不同终端</p></li><li><p><a href="https://www.npmjs.com/package/postcss-pxtorem" target="_blank" rel="noreferrer">postcss-pxtorem</a>：将 <code>px</code> 单位转换为 <code>rem</code> 单位</p></li></ul><h3 id="安装依赖" tabindex="-1">安装依赖 <a class="header-anchor" href="#安装依赖" aria-label="Permalink to &quot;安装依赖&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> amfe-flexible</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> postcss-pxtorem</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -D</span></span></code></pre></div><h3 id="引入插件" tabindex="-1">引入插件 <a class="header-anchor" href="#引入插件" aria-label="Permalink to &quot;引入插件&quot;">​</a></h3><br><p>在 <code>mian.ts</code> 中引入</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;amfe-flexible&#39;</span></span></code></pre></div><h3 id="配置插件" tabindex="-1">配置插件 <a class="header-anchor" href="#配置插件" aria-label="Permalink to &quot;配置插件&quot;">​</a></h3><br><p>在 <code>vite.config.ts</code> 中添加相关配置</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { ConfigEnv, UserConfig } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vite&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pxtorem </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;postcss-pxtorem&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(({ </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">command</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">mode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ConfigEnv</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> UserConfig</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(command, mode)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    css: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      preprocessorOptions: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        less: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          modifyVars: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            themeColor: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;#1677ff&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          javascriptEnabled: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      postcss: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        plugins: [</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">          pxtorem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            rootValue: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">75</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 类型：Number | Function；根元素字体大小，默认 16，一般设置为设计稿尺寸 viewWidth 的 1/10（750 =&gt; 75 / 375 =&gt; 37.5）</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            unitPrecision: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 类型：Number；rem 单位允许的小数位数，默认 5</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            propList: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;*&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 类型：Array，需要将 px 单位转换为 rem 单位的属性列表，默认 [&#39;font&#39;, &#39;font-size&#39;, &#39;line-height&#39;, &#39;letter-spacing&#39;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            selectorBlackList: [] </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 类型：Array，需要忽略的选择器列表，不会转换 px 单位，默认 []</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            replace: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 类型：Boolean，默认 true</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            exclude</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">file</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> any</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 类型：String | Regexp | Function，要忽略并保持 px 单位的文件路径，默认 /node_modules/i</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">              if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (file.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">includes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;h5&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                // 将所有包含 h5 目录中的文件 px 单位转换为 rem 单位</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">                return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">              }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">              return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div>`,13))])}const u=n(r,[["render",E]]);export{m as __pageData,u as default};
