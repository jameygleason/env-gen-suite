#!/usr/bin/env bash

echo "" && \
echo Installing Root Deps && \
echo "" && \
npm i && \

echo "" && \
echo Installing ENV Gen Deps && \
echo "" && \
cd package && \
npm i && \
echo "" && \

echo Building ENV Gen && \
echo "" && \
npm run build && \

echo "" && \
echo Installing Sapper Example Deps && \
echo "" && \
cd ../examples/sapper && \
npm i && \

echo "" && \
echo Installing Kit Example Deps && \
echo "" && \
cd ../kit && \
npm i && \

cd ../.. && \

exit