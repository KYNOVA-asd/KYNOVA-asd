export const select = (selector, scope = document) => scope.querySelector(selector);

export const selectAll = (selector, scope = document) => [...scope.querySelectorAll(selector)];

export const createElement = (tag, className, text) => {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text) {
    element.textContent = text;
  }

  return element;
};
