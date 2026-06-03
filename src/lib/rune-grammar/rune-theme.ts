export const runeTheme = {
  name: 'rune-theme',
  type: 'dark',
  colors: {
    'editor.background': 'transparent',
    'editor.foreground': 'var(--rune-fg-base)',
  },
  tokenColors: [
    {
      scope: [
        'comment',
        'comment.line.number-sign.rune',
      ],
      settings: {
        foreground: 'var(--rune-syn-comment)',
        fontStyle: 'italic',
      },
    },
    {
      scope: [
        'keyword',
        'keyword.control.rune',
        'keyword.operator.logical.rune',
      ],
      settings: {
        foreground: 'var(--rune-syn-keyword)',
      },
    },
    {
      scope: [
        'string',
        'string.quoted.double.rune',
      ],
      settings: {
        foreground: 'var(--rune-syn-string)',
      },
    },
    {
      scope: [
        'constant.character.escape',
        'constant.character.escape.rune',
      ],
      settings: {
        foreground: 'var(--rune-syn-operator)',
      },
    },
    {
      scope: [
        'constant.numeric',
        'constant.numeric.rune',
        'constant.language.boolean',
        'constant.language.boolean.rune',
      ],
      settings: {
        foreground: 'var(--rune-syn-number)',
      },
    },
    {
      scope: [
        'keyword.operator',
        'keyword.operator.arithmetic.rune',
        'keyword.operator.comparison.rune',
        'keyword.operator.assignment.rune',
      ],
      settings: {
        foreground: 'var(--rune-syn-operator)',
      },
    },
    {
      scope: [
        'entity.name.function',
        'entity.name.function.rune',
      ],
      settings: {
        foreground: 'var(--rune-syn-fn)',
      },
    },
    {
      scope: [
        'variable',
        'variable.other.rune',
        'variable.parameter',
      ],
      settings: {
        foreground: 'var(--rune-syn-variable)',
      },
    },
  ],
};
