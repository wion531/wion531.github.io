@echo off
python src/gen.py pages/home.md -o index.html -n Home
python src/gen.py pages/base64.md -o pages/base64.html -n "Base64 encoder/decoder"
python src/gen.py pages/data-converter.md -o pages/data-converter.html -n "Data Converter"
