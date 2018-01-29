#!/bin/bash  

DATE=`date '+%Y-%m-%d %H:%M:%S'`

read -p "Commit message:" msg

git add app/dist 
git commit -m "auto commit: $DATE $msg"
git push origin master
git subtree push --prefix app/dist origin gh-pages
echo "Deploy finished"