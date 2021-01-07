#dev-test 提交流程和方法

##提交流程

1.在dev-test分支上开发
2.git stash (这是将本地代码回滚值至上一次提交的时候,就是没有你新改的代码)
3.git pull origin dev-test (将远程的拉下来)
4.gt stash pop (将上一步回滚对的代码放出来,相等于将你修改的代码下拉的代码合并),然后解决冲突,你本地的代码回事最新的代码
5.git add .
6.解决完冲突,新拉一个分支提交
7.git commit -m"",列如 git commit -m"fix:修改表格" 
8.git push --set-upstream origin dev-test-zyl
9.在merge request 后,删除分支

## git的merage quest conficts 解决办法

提交代码时,出现commit conficts,这时需要提交冲突的人,去解决冲突,具体步骤如下

 1.暂存本地代码,git stash
 2.重新拉代码,git pull origin dev-test
 3.回滚代码,git stash
 4.此时处于rebase的状态,在本地合并好代码,git add .,添加到暂存区 git rebase --continue完成rebase
 5.获取删减后的远程分支 git fetch -p
 6.新建一个分支并切换过去,git branch -b dev-test-zyl
 7.关联远程分支并推入 git push --set-upstream origin dev-test-zyl

 ## git的常用方法

 指令|描述
 ---|--|
 git stash | 将当前未提交的工作存入Git工作栈中,时机成熟时候应用回来
 git remote -v | 查看远程仓库
 git remote add origin --url   | 推到远程上添加源
 git pull [remoteName] [locaBranchName] | 拉取远程仓库 remoteName远程仓库一般是origin,
 git push [remoteName] [locaBranchName] | 推送远程仓库
 git branch | 查看本地分支
 git branch -r | 查看远程分支
 git branch [name] | 创建本地分支
 git checkout [name] | 切换分支
 git checkout -b name | 创建分支并立即切换新分支
 git branch -d [name] | 删除分支
 git help | 显示command的help
 git show | 显示某次提交的内容 git show $id
 git add . | 将所有修改过的文件提交到暂存区
 git reset --hard | 恢复最近一次提交过的状态,即放弃上次提交后的所有本次修改
 git status | 查询repo的状态
 git log | 查看提交记录,按q退出
 git revert |反转撤销提交
 git fetch | 取某一个远程repo列子:git fetch -p 获取删减后的远程分支
 git rebase | --rebase不会产生合并的提交,它会将本地的所有提交临时保存为补丁(patch),放在".git/rebase"目录中
 git pull origin master  | 拉取master代码

 
#将dev合并到master并推向远程 
 ---|--|
 1.git checkout dev |检出到dev分支
 2.git pull | 拉取dev最新代码到当前文件夹
 3.git checkout master | 检出到master分支
 4.git merge dev | 将dev分支合并到master
 5.git push -u origin master | 将本地的master分支推送到origin主机
 
