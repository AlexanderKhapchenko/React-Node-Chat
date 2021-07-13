#!/bin/bash
cd client 
yarn install
yarn start
cd ..
cd server
npm install
npm start
cd ..