#!/bin/bash

# Weekly App - Quick Start Script
# This script starts a local web server to run the Weekly app

echo "🚀 Starting Weekly App..."
echo ""

# Check if port 8000 is already in use
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Port 8000 is already in use."
    echo "   Stop the other process or use a different port."
    exit 1
fi

# Determine which server to use
if command -v python3 &> /dev/null; then
    echo "✅ Using Python 3 HTTP server"
    echo "📂 Serving from: $(pwd)"
    echo "🌐 Open your browser to: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "================================================"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✅ Using Python HTTP server"
    echo "📂 Serving from: $(pwd)"
    echo "🌐 Open your browser to: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "================================================"
    echo ""
    python -m http.server 8000
elif command -v php &> /dev/null; then
    echo "✅ Using PHP built-in server"
    echo "📂 Serving from: $(pwd)"
    echo "🌐 Open your browser to: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "================================================"
    echo ""
    php -S localhost:8000
else
    echo "❌ No suitable web server found!"
    echo ""
    echo "Please install one of the following:"
    echo "  • Python 3: sudo apt install python3"
    echo "  • PHP: sudo apt install php"
    echo "  • Node.js: sudo apt install nodejs npm"
    echo ""
    echo "Or simply open index.html directly in your browser."
    exit 1
fi
