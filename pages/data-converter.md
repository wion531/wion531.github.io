# William's Very Nifty Multi-Purpose Data Converter (WVNMPDC)

Input:
<textarea id="converter-input" name="converter-input" rows="8" cols="80"></textarea>

<div id="converter-options">
  <select name="converter-input-type" id="converter-input-type">
    <option value="binary">Binary</option>
    <option value="octal">Octal</option>
    <option value="hexadecimal">Hexadecimal</option>
    <option value="ascii">ASCII</option>
    <option value="utf8">UTF-8</option>
  </select>
  <p style="display: inline-block">to</p>
  <!-- make sure you copy/paste this over! -->
  <select name="converter-output-type" id="converter-output-type">
    <option value="binary">Binary</option>
    <option value="octal">Octal</option>
    <option value="hexadecimal">Hexadecimal</option>
    <option value="ascii">ASCII</option>
    <option value="utf8">UTF-8</option>
  </select>
  <input id="converter-button" type="button" onclick="data_converter()" value="Convert!"></input>
</div>

Output:
<textarea id="converter-output" name="converter-output" rows="8" cols="80"></textarea>