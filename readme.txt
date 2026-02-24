1. getElementById vs getElementsByClassName vs querySelector/querySelectorAll
getElementById selects a single element by its ID and returns the element or null. getElementsByClassName returns a live HTMLCollection of all elements with that class — live meaning it auto-updates if the DOM changes. querySelector accepts any CSS selector and returns the first matching element. querySelectorAll returns a static NodeList of all matches. The query selector methods are the most flexible since they support complex CSS selectors.


2. Creating and inserting a new element
You use document.createElement('tag') to create it, set its properties (textContent, className, etc.), then insert it using methods like appendChild, prepend, insertBefore, or after. For HTML strings, insertAdjacentHTML is a cleaner alternative. Avoid innerHTML += as it destroys existing event listeners.

3. Event Bubbling
When an event fires on an element, it first triggers on that element, then bubbles up through each ancestor all the way to the document root. So clicking a <button> inside a <div> will also trigger click listeners on that <div> and everything above it. You can stop this with stopPropagation().

4. Event Delegation
Instead of attaching listeners to every child element, you attach one listener to a parent and use event.target to figure out what was actually clicked. It works because of bubbling. It's useful because it uses less memory, avoids re-attaching listeners when new elements are added dynamically, and keeps your code cleaner.

5. preventDefault() vs stopPropagation()
preventDefault() stops the browser's default behavior (e.g. a link navigating, a form submitting) but the event still bubbles normally. stopPropagation() stops the event from bubbling up the DOM but the browser's default action still happens. They're independent — you can call one, both, or neither depending on what you need.