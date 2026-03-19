document.addEventListener('DOMContentLoaded', function () {
  if (typeof hljs !== 'undefined') {
    try {
      document.querySelectorAll('pre code.language-asmeta').forEach((block) => {
        const raw = block.textContent;
        block.removeAttribute('data-highlighted');
        block.textContent = raw;
        hljs.highlightElement(block);
      });
    } catch (e) {
      console.warn('Highlighting failed', e);
    }
  }
});
