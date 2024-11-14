# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


# Rules

Не въехал в архитекуру? - Ошибка
Нарушил архтектуру? - Фатальная ошибка

В проекте присутсвуют alias - @ для упрощения импортов и избежания этой мутной темки - ../../../public/..,
Правильное использовование @pablic/..., @shared/... и тд.

Проект имеет структуру:
app - само приложение, рендер, пути, глобальные стили.
pages - самые независимые компоненты приложения которые рендерятся пользователям.
widgets - настолько независимые компоненты насколько это возможно, использование бизнес логики, сущностей и всех нижележащих слоев.
features - фичи, менее независимые, могут использовать бизнес логику и сущности, например: формы, пустые модальные окна и тд.
entities - бизнес сущности, содержат запросы к серверу.
shared - самые низкоуровневые комопненты и функции напрмер: input, button и тд, не имеют бизнес логики и сущностей.
public - содержат картинки. Использование картинок исключительно в формате svg, если не возможно использование svg стоит подумать возможно ли испольование svg формата и если точно никак не возможно, то разрешается использование других форматов

Чем выше слой тем больше слоев ниже он может исползовать.
Пример: Widgets может использовать и features и shared и entities. shared не может использовать features и все что выше.

Выносить отдельные компоненты в соответсвующие слои возможно только если планируется многократное переиспользвоание компонента. 
Исключением является компоненты имеющие большое количество строк для избежание путаниц и сложного чтения кода.
Хороший пример выноса в слой - layout т.к переиспользуется в каждой странице. Плохой пример - Button без сложной бизнес логики или если является одноразовым, например: Кнопка входа в лк, так как используется в одном месте и не имеет внушительной сложности. Исключение - Header используется только в одном файле, но имеет нагромажденный код.

Избегаем использования css файлов, это нагромаждает проект, используем css-in-js - styled-components

Название компонентов страниц заканчивается на Page - LoginPage