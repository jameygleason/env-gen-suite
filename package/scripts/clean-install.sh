#!/bin/bash

echo "" && \
echo Installing Root Deps && \
echo "" && \
rm -rf node_modules package-lock.json && \
npm i && \

exit