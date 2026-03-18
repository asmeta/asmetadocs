hljs.registerLanguage('asmeta', function(hljs) {
  return {
    name: 'Asmeta',
    aliases: ['asmeta'],
    keywords: {
      keyword:
        'asyncr asm if then else let in when return module import export signature',
      literal: 'true false null',
      built_in: 'print assert assert_eq'
    },
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        // numbers
        className: 'number',
        begin: '\\b(0x[0-9A-Fa-f]+|\\d+(\\.\\d+)?)\\b'
      },
      {
        // operators
        className: 'operator',
        begin: '->|=>|=|\\+|-|\\*|\\/|\\^|:|\\.'
      }
    ]
  };
});
