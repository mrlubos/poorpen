/**
 * Adds to the document body a style that will center
 * the content both horizontally and vertically. This
 * is also used to remove any remaining styles from the
 * body that wouldn't get removed by clearBody(), such
 * as the background image.
 */
const addDefaultStyleToBody = () => {
  const { bodyClassName } = getSettings()
  const rule = `
align-items: center !important;
background: #fafafa !important;
color: #333 !important;
display: flex !important;
flex-direction: column !important;
font: 1em "Open Sans", sans-serif !important;
height: 100vh !important;
justify-content: center !important;
overflow-x: hidden !important;
`
  const ruleAfter = 'display: none !important;'
  const ruleBefore = ruleAfter
  addStyleSheet(`.${bodyClassName}`, rule, ruleBefore, ruleAfter)
  document.body.className = bodyClassName
}

/**
 * A shorthand for creating stylesheet rules.
 *
 * @param {string} selector Classic selector we would use in querySelector.
 * @param {string} [content=''] The body of the selector rule.
 * @param {string} [contentBefore=''] The body of the selector::before rule.
 * @param {string} [contentAfter=''] The body of the selector::after rule.
 */
const addStyleSheet = (selector, content = '', contentBefore = '', contentAfter = '') => {
  if (!selector) return

  const style = document.createElement('style')
  style.type = 'text/css'

  style.innerHTML = `${selector} {${content}} ${selector}::before {${contentBefore}} ${selector}::after {${contentAfter}}`
  document.head.appendChild(style)
}

/**
 * Removes all of the content from the body.
 */
const clearBody = () => {
  while (document.body.firstChild) {
    document.body.lastChild.remove()
  }
}

/**
 * Add to the body the message for the viewer.
 *
 * @param {string} message
 */
const displayMessage = message => {
  if (!message) {
    ({ message } = getSettings())
  }
  const title = document.createElement('h1')
  title.innerText = message
  document.body.appendChild(title)
}

/**
 * Module settings.
 *
 * @returns {object}
 */
const getSettings = () => ({
  bodyClassName: 'PoorPen--disabled',
  message: 'Sorry, this Pen is currently under construction.',
})

/**
 * Hide the Pen.
 *
 * @param {string} message
 */
const hide = message => {
  clearBody()
  addDefaultStyleToBody()
  displayMessage(message)
}

export default {
  hide,
}
