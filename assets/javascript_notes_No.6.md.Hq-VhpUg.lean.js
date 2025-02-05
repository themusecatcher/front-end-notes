import{_ as e,C as h,c as r,o as E,j as i,G as n,aa as k,a,w as t}from"./chunks/framework.BZRAcjjw.js";const B=JSON.parse('{"title":"Note 6","description":"","frontmatter":{},"headers":[],"relativePath":"javascript/notes/No.6.md","filePath":"javascript/notes/No.6.md","lastUpdated":1727337514000}'),d={name:"javascript/notes/No.6.md"};function o(g,s,y,F,c,u){const p=h("BackTop"),l=h("Tag");return E(),r("div",null,[s[109]||(s[109]=i("h1",{id:"note-6",tabindex:"-1"},[a("Note 6 "),i("a",{class:"header-anchor",href:"#note-6","aria-label":'Permalink to "Note 6"'},"​")],-1)),n(p),s[110]||(s[110]=k("",7)),i("ul",null,[i("li",null,[s[32]||(s[32]=i("p",null,[i("code",null,"Blob.slice()"),a(" 用于创建一个包含源 Blob的指定字节范围内的数据的新 Blob 对象")],-1)),s[33]||(s[33]=i("p",null,[a("语法："),i("code",null,"var blob = instanceOfBlob.slice([start [, end [, contentType]]]};")],-1)),s[34]||(s[34]=i("p",null,"参数：",-1)),i("ul",null,[i("li",null,[s[1]||(s[1]=i("code",null,"start",-1)),s[2]||(s[2]=a()),n(l,{bordered:!1,color:"cyan"},{default:t(()=>s[0]||(s[0]=[a("可选")])),_:1}),s[3]||(s[3]=a(" 代表 Blob 里的下标，表示第一个会被会被拷贝进新的 ")),s[4]||(s[4]=i("code",null,"Blob",-1)),s[5]||(s[5]=a(" 的字节的起始位置。如果你传入的是一个负数，那么这个偏移量将会从数据的末尾从后到前开始计算。举例来说，-10 将会是 ")),s[6]||(s[6]=i("code",null,"Blob",-1)),s[7]||(s[7]=a(" 的倒数第十个字节。它的默认值是 0，如果你传入的 start 的长度大于源 ")),s[8]||(s[8]=i("code",null,"Blob",-1)),s[9]||(s[9]=a(" 的长度，那么返回的将会是一个长度为 0 并且不包含任何数据的一个 ")),s[10]||(s[10]=i("code",null,"Blob",-1)),s[11]||(s[11]=a(" 对象。"))]),i("li",null,[s[13]||(s[13]=i("code",null,"end",-1)),s[14]||(s[14]=a()),n(l,{bordered:!1,color:"cyan"},{default:t(()=>s[12]||(s[12]=[a("可选")])),_:1}),s[15]||(s[15]=a(" 代表的是 ")),s[16]||(s[16]=i("code",null,"Blob",-1)),s[17]||(s[17]=a(" 的一个下标，这个下标 -1 的对应的字节将会是被拷贝进新的")),s[18]||(s[18]=i("code",null,"Blob",-1)),s[19]||(s[19]=a(" 的最后一个字节。如果你传入了一个负数，那么这个偏移量将会从数据的末尾从后到前开始计算。举例来说， -10 将会是 ")),s[20]||(s[20]=i("code",null,"Blob",-1)),s[21]||(s[21]=a(" 的倒数第十个字节。它的默认值就是它的原始长度 (size)."))]),i("li",null,[s[23]||(s[23]=i("code",null,"contentType",-1)),s[24]||(s[24]=a()),n(l,{bordered:!1,color:"cyan"},{default:t(()=>s[22]||(s[22]=[a("可选")])),_:1}),s[25]||(s[25]=a(" 给新的 ")),s[26]||(s[26]=i("code",null,"Blob",-1)),s[27]||(s[27]=a(" 赋予一个新的文档类型。这将会把它的 type 属性设为被传入的值。它的默认值是一个空的字符串。 返回值：一个新的 ")),s[28]||(s[28]=i("code",null,"Blob",-1)),s[29]||(s[29]=a(" 对象，它包含了原始 ")),s[30]||(s[30]=i("code",null,"Blob",-1)),s[31]||(s[31]=a(" 对象的某一个段的数据。"))])])])]),s[111]||(s[111]=k("",24)),i("ul",null,[s[69]||(s[69]=i("li",null,[i("p",null,[i("a",{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/disconnect",target:"_blank",rel:"noreferrer"},[i("code",null,"disconnect()")]),a(": 阻止 MutationObserver 实例继续接收的通知，直到再次调用其 "),i("code",null,"observe()"),a(" 方法，该观察者对象包含的回调函数都不会再被调用。")])],-1)),i("li",null,[s[68]||(s[68]=i("p",null,[i("a",{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/observe",target:"_blank",rel:"noreferrer"},[i("code",null,"observe()")]),a(": 配置 "),i("code",null,"MutationObserver"),a(" 在 "),i("code",null,"DOM"),a(" 更改匹配给定选项时，通过其回调函数开始接收通知。")],-1)),i("ul",null,[s[66]||(s[66]=k("",1)),i("li",null,[s[65]||(s[65]=i("p",null,"参数：",-1)),i("ul",null,[s[64]||(s[64]=i("li",null,[i("code",null,"target"),a(": "),i("code",null,"DOM"),a(" 树中的一个要观察变化的 "),i("code",null,"DOM Node"),a(" (可能是一个 "),i("code",null,"Element"),a(")，或者是被观察的子节点树的根节点。")],-1)),i("li",null,[s[63]||(s[63]=k("",22)),i("ul",null,[i("li",null,[i("p",null,[s[36]||(s[36]=i("code",null,"subtree",-1)),s[37]||(s[37]=a()),n(l,{bordered:!1,color:"cyan"},{default:t(()=>s[35]||(s[35]=[a("可选")])),_:1})]),s[38]||(s[38]=i("p",null,[a("当为 "),i("code",null,"true"),a(" 时，将会监听以 "),i("code",null,"target"),a(" 为根节点的整个子树。包括子树中所有节点的属性，而不仅仅是针对 "),i("code",null,"target"),a("。默认值为 "),i("code",null,"false"),a("。")],-1))]),i("li",null,[i("p",null,[s[40]||(s[40]=i("code",null,"childList",-1)),s[41]||(s[41]=a()),n(l,{bordered:!1,color:"cyan"},{default:t(()=>s[39]||(s[39]=[a("可选")])),_:1})]),s[42]||(s[42]=i("p",null,[a("当为 "),i("code",null,"true"),a(" 时，监听 "),i("code",null,"target"),a(" 节点中发生的节点的新增与删除（同时，如果 "),i("code",null,"subtree"),a(" 为 "),i("code",null,"true"),a("，会针对整个子树生效）。默认值为 "),i("code",null,"false"),a("。")],-1))]),i("li",null,[i("p",null,[s[44]||(s[44]=i("code",null,"attributes",-1)),s[45]||(s[45]=a()),n(l,{bordered:!1,color:"cyan"},{default:t(()=>s[43]||(s[43]=[a("可选")])),_:1})]),s[46]||(s[46]=i("p",null,[a("当为 "),i("code",null,"true"),a(" 时观察所有监听的节点属性值的变化。默认值为 "),i("code",null,"true"),a("，当声明了 "),i("code",null,"attributeFilter"),a(" 或 "),i("code",null,"attributeOldValue"),a("，默认值则为 "),i("code",null,"false"),a("。")],-1))]),i("li",null,[i("p",null,[s[48]||(s[48]=i("code",null,"attributeFilter",-1)),s[49]||(s[49]=a()),n(l,{bordered:!1,color:"cyan"},{default:t(()=>s[47]||(s[47]=[a("可选")])),_:1})]),s[50]||(s[50]=i("p",null,"一个用于声明哪些属性名会被监听的数组。如果不声明该属性，所有属性的变化都将触发通知。",-1))]),i("li",null,[i("p",null,[s[52]||(s[52]=i("code",null,"attributeOldValue",-1)),s[53]||(s[53]=a()),n(l,{bordered:!1,color:"cyan"},{default:t(()=>s[51]||(s[51]=[a("可选")])),_:1})]),s[54]||(s[54]=i("p",null,[a("当为 "),i("code",null,"true"),a(" 时，记录上一次被监听的节点的属性变化；可查阅监听属性值了解关于观察属性变化和属性值记录的详情。默认值为 "),i("code",null,"false"),a("。")],-1))]),i("li",null,[i("p",null,[s[56]||(s[56]=i("code",null,"characterData",-1)),s[57]||(s[57]=a()),n(l,{bordered:!1,color:"cyan"},{default:t(()=>s[55]||(s[55]=[a("可选")])),_:1})]),s[58]||(s[58]=i("p",null,[a("当为 "),i("code",null,"true"),a(" 时，监听声明的 "),i("code",null,"target"),a(" 节点上所有字符的变化。默认值为 "),i("code",null,"true"),a("，如果声明了 "),i("code",null,"characterDataOldValue"),a("，默认值则为 "),i("code",null,"false")],-1))]),i("li",null,[i("p",null,[s[60]||(s[60]=i("code",null,"characterDataOldValue",-1)),s[61]||(s[61]=a()),n(l,{bordered:!1,color:"cyan"},{default:t(()=>s[59]||(s[59]=[a("可选")])),_:1})]),s[62]||(s[62]=i("p",null,[a("当为 "),i("code",null,"true"),a(" 时，记录前一个被监听的节点中发生的文本变化。默认值为 "),i("code",null,"false")],-1))])])])])]),s[67]||(s[67]=i("li",null,[i("p",null,"返回值"),i("p",null,[i("code",null,"undefined"),a("。")])],-1))])]),s[70]||(s[70]=i("li",null,[i("p",null,[i("a",{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/takeRecords",target:"_blank",rel:"noreferrer"},[i("code",null,"takeRecords()")]),a(": 从 "),i("code",null,"MutationObserver"),a(" 的通知队列中删除所有待处理的通知，并将它们返回到 "),i("code",null,"MutationRecord"),a(" 对象的新 "),i("code",null,"Array"),a(" 中。")])],-1))]),s[112]||(s[112]=k("",7)),i("ul",null,[s[77]||(s[77]=k("",1)),i("li",null,[s[76]||(s[76]=i("p",null,"参数",-1)),i("ul",null,[s[75]||(s[75]=i("li",null,[i("code",null,"callback"),a(": 当元素可见比例超过指定阈值后，会调用一个回调函数，此回调函数接受两个参数： "),i("ul",null,[i("li",null,[i("code",null,"entries"),a(": 一个 "),i("code",null,"IntersectionObserverEntry"),a(" 对象的数组，每个被触发的阈值，都或多或少与指定阈值有偏差。")]),i("li",null,[i("code",null,"observer"),a(": 被调用的 "),i("code",null,"IntersectionObserver"),a(" 实例。")])])],-1)),i("li",null,[s[72]||(s[72]=i("code",null,"options",-1)),s[73]||(s[73]=a()),n(l,{bordered:!1,color:"cyan"},{default:t(()=>s[71]||(s[71]=[a("可选")])),_:1}),s[74]||(s[74]=k("",14))])])]),s[78]||(s[78]=i("li",null,[i("p",null,[a("返回值 一个可以使用规定阈值监听目标元素可见部分与 "),i("code",null,"root"),a(" 交叉状况的新的 "),i("code",null,"IntersectionObserver"),a(" 实例。调用自身的 "),i("code",null,"observe()"),a(" 方法开始使用规定的阈值监听指定目标。")])],-1))]),s[113]||(s[113]=i("h3",{id:"实例属性",tabindex:"-1"},[a("实例属性 "),i("a",{class:"header-anchor",href:"#实例属性","aria-label":'Permalink to "实例属性"'},"​")],-1)),i("ul",null,[i("li",null,[i("p",null,[s[80]||(s[80]=i("code",null,"IntersectionObserver.root",-1)),s[81]||(s[81]=a()),n(l,{bordered:!1,color:"cyan"},{default:t(()=>s[79]||(s[79]=[a("只读")])),_:1}),s[82]||(s[82]=a(" 测试交叉时，用作边界盒的元素或文档。如果构造函数未传入 ")),s[83]||(s[83]=i("code",null,"root",-1)),s[84]||(s[84]=a(" 或其值为 ")),s[85]||(s[85]=i("code",null,"null",-1)),s[86]||(s[86]=a("，则")),s[87]||(s[87]=i("strong",null,"默认使用顶级文档的视口",-1)),s[88]||(s[88]=a("。"))])]),i("li",null,[i("p",null,[s[90]||(s[90]=i("code",null,"IntersectionObserver.rootMargin",-1)),s[91]||(s[91]=a()),n(l,{bordered:!1,color:"cyan"},{default:t(()=>s[89]||(s[89]=[a("只读")])),_:1}),s[92]||(s[92]=a(" 计算交叉时添加到根边界盒的矩形偏移量，可以有效的缩小或扩大根的判定范围从而满足计算需要。此属性返回的值可能与调用构造函数时指定的值不同，因此可能需要更改该值，以匹配内部要求。所有的偏移量均可用像素（")),s[93]||(s[93]=i("strong",null,"px",-1)),s[94]||(s[94]=a("）或百分比（")),s[95]||(s[95]=i("strong",null,"%",-1)),s[96]||(s[96]=a("）来表达，默认值为“")),s[97]||(s[97]=i("code",null,"0px 0px 0px 0px",-1)),s[98]||(s[98]=a("”。"))])]),i("li",null,[i("p",null,[s[100]||(s[100]=i("code",null,"IntersectionObserver.thresholds",-1)),s[101]||(s[101]=a()),n(l,{bordered:!1,color:"cyan"},{default:t(()=>s[99]||(s[99]=[a("只读")])),_:1}),s[102]||(s[102]=a(" 一个包含阈值的列表，按升序排列，列表中的每个阈值都是监听对象的交叉区域与边界区域的比率。")),s[103]||(s[103]=i("strong",null,"当监听对象的任何阈值被越过时，都会生成一个通知",-1)),s[104]||(s[104]=a("（")),s[105]||(s[105]=i("code",null,"Notification",-1)),s[106]||(s[106]=a("）。如果构造器未传入值，则默认值为 ")),s[107]||(s[107]=i("code",null,"0",-1)),s[108]||(s[108]=a("。"))])])]),s[114]||(s[114]=k("",5))])}const D=e(d,[["render",o]]);export{B as __pageData,D as default};
