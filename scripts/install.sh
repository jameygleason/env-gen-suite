#!/usr/bin/env sh

echo "" && \
echo Installing Root Deps && \
echo "" && \
rm -rf node_modules package-lock.json && \
npm i && \

echo "" && \
echo Installing ENV Gen Deps && \
echo "" && \
cd theme-engine && \
rm -rf node_modules package-lock.json && \
npm i && \
echo "" && \
echo Building ENV Gen && \
echo "" && \
npm run build && \

echo "" && \
echo Installing Example Deps && \
echo "" && \
cd ../example && \
rm -rf node_modules package-lock.json && \
npm i && \

cd .. && \

exit