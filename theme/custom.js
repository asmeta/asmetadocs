// custom.js
document.addEventListener('DOMContentLoaded', function() {
  if (typeof hljs !== 'undefined') {
    try {
      // re-run highlighting to pick up the new language
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
      });
    } catch (e) {
      console.warn('Highlighting failed', e);
    }
  }
});
