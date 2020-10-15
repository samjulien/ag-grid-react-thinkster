export const KEY_BACKSPACE = 8;
export const KEY_DELETE = 46;

const getCharCodeFromEvent = (event) => {
  event = event || window.event;
  return typeof event.which === "undefined" ? event.keyCode : event.which;
};

const isCharNumeric = (charStr) => {
  return !!/\d/.test(charStr);
};

export const isLeftOrRight = (event) => {
  return [37, 39].indexOf(event.keyCode) > -1;
};

export const deleteOrBackspace = (event) => {
  return [KEY_DELETE, KEY_BACKSPACE].indexOf(event.keyCode) > -1;
};

export const isKeyPressedNumeric = (event) => {
  const charCode = getCharCodeFromEvent(event);
  const charStr = event.key ? event.key : String.fromCharCode(charCode);
  return isCharNumeric(charStr);
};
