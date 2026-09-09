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

# 强制要求传入语义化的提交描述，避免产生无信息量的 commit
if [ -z "$commitDesc" ]; then
  echo "❌ 缺少提交描述。用法: pnpm docs:deploy \"<type>: <描述>\"（如 pnpm docs:deploy \"docs: update guide\"）"
  exit 1
fi

# 打包生成静态文件
pnpm docs:build

# 进入待发布的 dist/ 目录
cd docs/.vitepress/dist

# GitHub Pages 默认走 Jekyll，加 .nojekyll 跳过（保留下划线开头的资源目录，如 VitePress 的 _assets）
touch .nojekyll

# 提交打包静态网站到 github-pages 分支
git init
git branch -M main
git add .
git commit -m 'docs: deploy site'

# 部署到 https://themusecatcher.github.io/front-end-notes/
git push -f git@github.com:themusecatcher/front-end-notes.git main:github-pages

# 回到仓库根，清理临时 git 仓库，避免嵌套 .git 干扰主仓库（否则会被当作 gitlink 导致主仓库提交异常）
rm -rf .git
cd ../../..

# 提交所有源码到 github
git add .
if [ -n "$(git status --porcelain)" ]; then
  git commit -m "$commitDesc"
else
  echo "No changes to commit. Skipping git commit."
fi
git push

printf '✅ 部署完成：%s\n' "$(link 'https://themusecatcher.github.io/front-end-notes/')"
echo "⏰ $(date '+%Y-%m-%d %H:%M:%S')"
