#!/usr/bin/env bash

echo "" && \
echo Installing Root Deps && \
echo "" && \
rm -rf node_modules package-lock.json && \
npm i && \

echo "" && \
echo Installing ENV Gen Deps && \
echo "" && \
cd package && \
rm -rf node_modules package-lock.json && \
npm i && \
echo "" && \

echo Building ENV Gen && \
echo "" && \
npm run build && \

echo "" && \
echo Installing Sapper Example Deps && \
echo "" && \
cd ../examples/sapper && \
rm -rf node_modules package-lock.json && \
npm i && \

echo "" && \
echo Installing Kit Example Deps && \
echo "" && \
cd ../kit && \
rm -rf node_modules package-lock.json && \
npm i && \

cd ../.. && \

exit