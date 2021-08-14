#!/usr/bin/env sh

git remote set-url origin git@github.com:jameygleason/env-gen-suite.git && \
git push origin && \
git remote set-url origin git@gitlab.com:jameygleason/env-gen-suite.git && \
git push origin