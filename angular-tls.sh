#!/bin/bash

function ng_new {
  echo npm i -g @angular/cli@$1
  echo ng new angular-lts --directory $1 -S -g --skip-install --routing false --style scss
}

for v in `seq 6 11`;
do
  ng_new v$v-lts
done

ng_new latest
