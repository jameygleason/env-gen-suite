#!/usr/bin/env sh

echo ""
echo Installing Root Deps
echo ""
npm i

echo ""
echo Installing Package Deps
echo ""
cd package
npm i

echo ""
echo Building Package
echo ""
npm run build
cd ..

echo ""
echo Installing Kit Example Deps
echo ""
cd ./examples/kit
npm i
cd ..

echo ""
echo Installing Test Example Deps
echo ""
cd ./examples/test
npm i
cd ..
