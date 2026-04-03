/*
 * Highlight.js language definition for ASMETA (Abstract State Machines)
 * Author: Copilot
 */

hljs.registerLanguage('asmeta', function (hljs) {

  const KEYWORDS = [
    // ASMETA structure
    'asm', 'signature', 'domains', 'domain', 'functions', 'function',
    'controlled', 'monitored', 'derived', 'static', 'shared', 'local',

    // Rules
    'rule', 'if', 'then', 'else', 'endif',
    'forall', 'exists', 'choose', 'seq', 'par', 'let', 'in',

    // Types / domain constructors
    'enum', 'abstract', 'record', 'case', 'of',

    // Other reserved words
    'import', 'default', 'init', 'upd', 'with'
  ].join(' ');

  return {
    name: 'ASMETA',
    keywords: KEYWORDS,

    contains: [

      // Commenti
      hljs.COMMENT('//', '$'),

      // Stringhe
      {
        className: 'string',
        begin: '"',
        end: '"',
        contains: [{ begin: '\\\\.' }]   // escape sequences
      },

      // Numeri
      hljs.NUMBER_MODE,

      // Identificatori
      {
        className: 'symbol',
        begin: /[A-Za-z_][A-Za-z0-9_]*/
      }
    ]
  };
});
