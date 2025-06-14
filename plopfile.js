module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'React 컴포넌트 생성 (TypeScript, Tailwind, props interface 포함)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '컴포넌트 이름을 입력하세요 (PascalCase):',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/Component.tsx.hbs',
      },
    ],
  });
}; 