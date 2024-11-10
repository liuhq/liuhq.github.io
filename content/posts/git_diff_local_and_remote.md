---
title: 'Git 查询本地库与远程库的 commit 差异'
date: 2024-11-08
# update:
tags:
  - git
pin: false
uuid: a55f987e-a9b9-4ac0-8263-029c06d79a15
# related:
#   -
---

要查看本地 Git 仓库与远程仓库之间的 commit 差异，可以使用以下命令：

1. **查看本地和远程仓库的差异**：
   ```bash
   git fetch
   ```

   这个命令会从远程仓库拉取最新的更新，但不会合并到本地分支。

2. **查看本地与远程分支的差距**：
   ```bash
   git log --oneline --left-right --graph HEAD...origin/main
   ```

   这将展示本地 `HEAD` 和远程 `origin/main` 之间的 commit 差异：
   - 左侧的 `<` 表示本地有的 commit。
   - 右侧的 `>` 表示远程有的 commit。

   你可以根据需要替换 `origin/main` 为其他远程分支名。

3. **查看差异的数量**：
   如果只想知道本地和远程分支有多少个不同的 commit，可以使用：
   ```bash
   git rev-list --count HEAD...origin/main
   ```

   这个命令会显示本地和远程分支之间的 commit 数量差异。

这些方法可以帮助你了解本地仓库与远程仓库之间的提交差异。
