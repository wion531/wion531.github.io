window.base64_encode = function()
{
  let input = document.getElementById("base64-input");
  let output = document.getElementById("base64-output");

  output.value = btoa(input.value);
}

window.base64_decode = function()
{
  let input = document.getElementById("base64-input");
  let output = document.getElementById("base64-output");

  output.value = atob(input.value);
}

class ConversionFormat
{
  constructor(name, toBytesFunc, fromBytesFunc)
  {
    this.name = name;
    this.toBytesFunc = toBytesFunc;
    this.fromBytesFunc = fromBytesFunc;
  }

  toBytes(str)
  {
    return this.toBytesFunc(str);
  }

  fromBytes(bytes)
  {
    return this.fromBytesFunc(bytes);
  }
};

window.data_converter = function()
{
  let formats = [];
  formats.push(new ConversionFormat("binary",
    function(str)
    {
      let bytes = [];
      let words = str
        .split(' ')
        .map(word => [...word].filter((char) => "01".includes(char)).join(''));
      for (let i = 0; i < words.length; i += 1)
      {
        if (words[i] == "")
          continue;
        let num = parseInt(words[i], 2);
        if (num != NaN)
          bytes.push(num);
      }
      return bytes;
    },
    function(bytes)
    {
      let str = "";
      for (let i = 0; i < bytes.length; ++i)
        str += bytes[i].toString(2) + ' ';
      return str;
    }
  ));

  formats.push(new ConversionFormat("octal",
    function(str)
    {
      let bytes = [];
      let words = str
        .split(' ')
        .map(word => [...word].filter((char) => "01234567".includes(char)).join(''));
      for (let i = 0; i < words.length; i += 1)
      {
        if (words[i] == "")
          continue;
        let num = parseInt(words[i], 8);
        if (num != NaN)
          bytes.push(num);
      }
      return bytes;
    },
    function(bytes)
    {
      let str = "";
      for (let i = 0; i < bytes.length; ++i)
        str += bytes[i].toString(8) + ' ';
      return str;
    }
  ));

  formats.push(new ConversionFormat("hexadecimal",
    function(str)
    {
      let bytes = [];
      str = [...str]
        .filter((char) => "1234567890abcdefABCDEF".includes(char))
        .join('');
      for (let i = 0; i < str.length; i += 2)
        bytes.push(parseInt(str.substring(i, i + 2), 16));
      return bytes;
    },
    function(bytes)
    {
      let str = "";
      for (let i = 0; i < bytes.length; ++i)
        str += bytes[i].toString(16) + ' ';
      return str;
    }
  ));

  formats.push(new ConversionFormat("ascii",
    function(str)
    {
      let bytes = [];
      for (let i = 0; i < str.length; ++i)
        bytes.push(str.charCodeAt(i));
      return bytes;
    },
    function(bytes)
    {
      let str = "";
      for (let i = 0; i < bytes.length; ++i)
        str += String.fromCharCode(bytes[i]);
      return str;
    }
  ));

  formats.push(new ConversionFormat("utf8",
    function(str)
    {
      let bytes = [];
      let encoder = new TextEncoder();
      bytes = encoder.encode(str);
      console.log(bytes)
      return bytes;
    },
    function(bytes)
    {
      let str = "";
      let decoder = new TextDecoder();
      str = decoder.decode(new Uint8Array(bytes));
      return str;
    }
  ));

  // page elements
  let input = document.getElementById("converter-input");
  let output = document.getElementById("converter-output");
  let input_type = document.getElementById("converter-input-type");
  let output_type = document.getElementById("converter-output-type");
  let supported_input = false, supported_output = false;

  // parse input data
  let input_data = [];
  for (let i = 0; i < formats.length; ++i)
  {
    if (formats[i].name == input_type.value)
    {
      input_data = formats[i].toBytes(input.value);
      supported_input = true;
      break;
    }
  }

  console.log(input_data);

  // return output data
  for (let i = 0; i < formats.length; ++i)
  {
    if (formats[i].name == output_type.value)
    {
      output.value = formats[i].fromBytes(input_data);
      supported_output = true;
      break;
    }
  }

  if (!supported_input || !supported_output)
    output.value = "Not supported yet. Sorry! :(";
}
