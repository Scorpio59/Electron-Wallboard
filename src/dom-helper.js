var DomHelper = {
  getElementString(selector) {
    var code = '';
    if (selector.startsWith('/')) {
      code += `var element = document.evaluate('` + selector + `', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;`;
    } else {
      code += `var element = document.getElementById("` + selector + `");`;
    }
    code += `
    var rect = element.getBoundingClientRect();
      JSON.stringify({
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        height: rect.height,
        width: rect.width
      });
      `;
    return code;
  }
};
export default DomHelper;
