#!/bin/bash

rm -rf ./../.cert
mkdir -p ./../.cert && mkcert -key-file ./../.cert/key.pem -cert-file ./../.cert/cert.pem 'localhost'
(source .env && ls && npm run dev &)
