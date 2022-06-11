#!/bin/bash

function ng_new {
  echo Recreate $2
  npm i -g @angular/cli@$1
  rm -rf $2
  ng new angular-lts --directory $2 -S -g --skip-install --routing false --style scss
}

let latest=14
let lts=latest-1

for v in `seq 6 $lts`;
do
  ng_new v$v-lts v$v-lts
done

ng_new latest v$latest-lts
