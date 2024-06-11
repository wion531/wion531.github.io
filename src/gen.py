import markdown
import argparse

parser = argparse.ArgumentParser(
  prog="gen",
  description="Generate a wion531.github.io page from a markdown file."
)

parser.add_argument("filename")
parser.add_argument("-o", "--output", dest="output")
parser.add_argument("-n", "--name", dest="name")

args = parser.parse_args()

with open(args.filename, "r", encoding="utf-8") as input_file:
  text = input_file.read()
html = markdown.markdown(text)

base = """
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{} | William O'Neill</title>
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>
    <main>
      <div class="tab-list">
        <a href="/index.html">Home</a>
        <a href="/pages/base64.html">Base64 encoder/decoder</a>
      </div>
      {}
    </main>
    <script src="/script.js"></script>
  </body>
</html>
""".format(args.name, html)

with open(args.output, "w", encoding="utf-8") as output_file:
  output_file.write(base)
