#!/bin/bash
# Start local development server for FDSL website (Next.js)
PORT=${1:-3000}
echo "🚀 Starter FDSL lokal server på http://localhost:$PORT ..."
echo "Tryk Ctrl+C for at stoppe serveren."
npx next dev -p $PORT
