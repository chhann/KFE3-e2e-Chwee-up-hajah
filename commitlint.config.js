module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'settings',
        'refactor',
        'test',
        'chore',
        'design',
        'comment',
        'rename',
        'remove',
      ],
    ],
  },
};
