function encodeString(inputString)
{
  return inputString.replace(/[A-Za-z]/g, function (char) {
          var code = char.charCodeAt(0);
          if (char >= 'A' && char <= 'Z') {
            return String.fromCharCode(((code - 65 + 13) % 26) + 65);
          } else if (char >= 'a' && char <= 'z') {
            return String.fromCharCode(((code - 97 + 13) % 26) + 97);
          }
        });
}
function decodeString(encodedString) {
    var decodedString = encodedString.replace(/[A-Za-z]/g, function (char) {
      var code = char.charCodeAt(0);
      if (char >= 'A' && char <= 'Z') {
        return String.fromCharCode(((code - 65 + 13) % 26) + 65);
      } else if (char >= 'a' && char <= 'z') {
        return String.fromCharCode(((code - 97 + 13) % 26) + 97);
      }
    });
  
    return decodedString;
  }

export const Security={
    decodeString,
    encodeString
}