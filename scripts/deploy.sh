#!/bin/bash

# 确保脚本抛出遇到的错误
set -e

# 将 URL 渲染为带颜色的可点击终端超链接
# OSC 8 携带可点击行为，ANSI 颜色提供视觉样式
# 支持：iTerm2 / WezTerm / Kitty / Windows Terminal / VS Code 集成的终端
# 不支持的终端：OSC 8 降级为纯文本，ANSI 颜色仍生效
link() {
  printf '\033[1;34m\033]8;;%s\033\\%s\033]8;;\033\\\033[0m' "$1" "$1"
}

commitDesc=$1

# 打包生成静态文件
pnpm docs:build

# 进入待发布的 dist/ 目录
cd docs/.vitepress/dist

# 提交打包静态网站到 github-pages 分支
git init
git add .
git commit -m 'deploy'

# 部署到 https://<username>.github.io/<repo>
git push -f git@github.com:themusecatcher/front-end-notes.git master:github-pages

# 提交所有代码到github
cd ../../../
git add .

if [ -z "$commitDesc" ]; then
  git commit -m 'update'
else
  git commit -m "$commitDesc"
fi

git push

printf '✅ 部署完成：%s\n' "$(link 'https://themusecatcher.github.io/front-end-notes/')"
echo "⏰ $(date '+%Y-%m-%d %H:%M:%S')"
