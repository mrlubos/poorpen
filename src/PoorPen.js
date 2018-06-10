!(function () {
    var appName = 'PoorPen',
        API     = {};
    
    /**
     * Adds to the document body a style that will center
     * the content both horizontally and vertically. This
     * is also used to remove any remaining styles from the
     * body that wouldn't get removed by clearBody(), such
     * as the background image.
     */
    function addDefaultStyleToBody () {
        var className = getSettings().bodyClassName;
        var rule = 'align-items: center !important;' +
            'background: #fafafa !important;' +
            'color: #333 !important;' +
            'display: flex !important;' +
            'flex-direction: column !important;' +
            'font: 1em "Open Sans", sans-serif !important;' +
            'height: 100vh !important;' +
            'justify-content: center !important;' +
            'overflow-x: hidden !important;';
        var ruleAfter = 'display: none !important;';
        var ruleBefore = ruleAfter;
        addStyleSheet('.' + className, rule, ruleBefore, ruleAfter);
        document.body.className = className;
    }

    /**
     * A shorthand for creating stylesheet rules.
     *
     * @param {String} selector Classic selector we would use in querySelector.
     * @param {String}* content The body of the selector rule.
     * @param {String}* contentBefore The body of the selector::before rule.
     * @param {String}* contentAfter The body of the selector::after rule.
     */
    function addStyleSheet (selector, content, contentBefore, contentAfter) {
        if (!selector) return;

        var style  = document.createElement('style');
        style.type = 'text/css';

        content       = content       || '';
        contentBefore = contentBefore || '';
        contentAfter  = contentAfter  || '';

        style.innerHTML = selector + ' {' + content + '}' +
        selector + '::before {' + contentBefore + '}' +
        selector + '::after  {' + contentAfter  + '}';
        document.head.appendChild(style);
    }

    /**
     * Removes all of the content from the body.
     */
    function clearBody () {
        while (document.body.firstChild) document.body.lastChild.remove();
    }

    /**
     * Add to the body the message for the viewer.
     */
    function displayMessage (string) {
        string = string || getSettings().message;

        var message = document.createElement('h1');
        message.innerText = string;
        document.body.appendChild(message);
    }

    /**
     * Module settings.
     */
    function getSettings () {
        return {
            bodyClassName: appName + '--disabled',
            message: 'Sorry, this Pen is currently under construction.',
        };
    }
    
    /**
     * Returns the requested warning.
     */
    function getWarning (type) {
        var messages = {
            generic: 'An unexpected error occurred.',
            NSTaken: 'Cannot initialise ' + appName + '! The namespace is already taken.',
        };
        
        return messages[type] || messages.generic;
    }
    
    /**
     * Hide the Pen.
     */
    API.hide = function (message) {
        clearBody();
        addDefaultStyleToBody();
        displayMessage(message);
    };
    
    // Expose the API.
    if (!window[appName]) {
        window[appName] = API;
    }
    else {
        console.warn(getWarning('NSTaken'));
    }
})();