#!/bin/bash
# Start local development server for FDSL website
PORT=${1:-8000}
echo "🚀 Starter FDSL lokal server på http://localhost:$PORT ..."
echo "Tryk Ctrl+C for at stoppe serveren."
ruby -run -e httpd -- --port=$PORT .
