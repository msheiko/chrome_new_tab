# Техническая документация

## Архитектура

Одностраничное Vue 3 приложение, которое Chrome открывает вместо новой вкладки (`chrome_url_overrides.newtab` → `newtab.html`). Бэкенда, фоновых скриптов и `content_scripts` нет. Манифест — Manifest V3 без `permissions`.

```
newtab.html → src/main.js → App.vue
                              ├─ SiteCard.vue      (сайт без группы)
                              └─ FolderCard.vue    (папка)
                                   └─ FolderDialog.vue
                                        └─ SiteCard.vue × N
SiteCard и FolderCard построены на BaseCard.vue
```

### src/lib/layout.js

Чистые функции без Vue, покрыты тестами (`layout.test.js`):

- `buildLayout(sites)` — плоский список элементов сетки: сайт без `group` → `{ type: 'site', key: 'site:<url>', site }`; сайты с одинаковым `group` → одна запись `{ type: 'folder', key: 'folder:<имя>', name, sites }` на месте первого сайта группы.
- `folderPreview(sites, limit = 4)` — до `limit` сайтов с уникальным `image` для превью папки.

### App.vue

Вызывает `buildLayout` один раз: данные статичны, поэтому `computed` и `TransitionGroup` не нужны. Выводит `FolderCard` или `SiteCard` в зависимости от `type`.

### BaseCard.vue

Общая оболочка карточки: размеры (`size="site" | "folder"`), фон, тень, фокус, подпись `label`. Тег задаётся через `tag` (`a` по умолчанию, `button` для папки); остальные атрибуты и обработчики (`href`, `@click`) пробрасываются на корневой элемент. Содержимое — в слоте.

### SiteCard.vue

Ссылка с логотипом. При ошибке загрузки изображения (`@error`) показывается заглушка: первая буква `title` на градиентном круге. На экранах до 480px карточка занимает всю ширину.

### FolderCard.vue и FolderDialog.vue

`FolderCard` — кнопка с превью и подписью `Название · N`, по клику вызывает `open()` у `FolderDialog`.

`FolderDialog` — нативный `<dialog>`, открывается через `showModal()`. Браузер сам выводит его в верхний слой, закрывает по `Esc`, переносит фокус внутрь и делает фон неактивным, поэтому `Teleport`, `z-index` и ручные слушатели `keydown` не нужны. Клик по фону закрывает окно через `@click.self`: клики по `::backdrop` приходят на сам `<dialog>`, а всё его содержимое занимает `.panel`. Анимация открытия и закрытия — на CSS (`@starting-style`, `transition-behavior: allow-discrete`), при `prefers-reduced-motion` отключается.

## Данные

`src/data/sites.json` — единственный источник данных, импортируется статически и попадает в бандл. Формат полей описан в [README](../README.md#инструкция-как-добавить-изменить-или-удалить-сайт). Тест `src/data/sites.test.js` проверяет каждую запись: корректный `url`, непустые `title` и `group`, существование файла логотипа в `public/`, отсутствие дублей `url`.

## Сборка

`vite.config.js`:

- плагины `@vitejs/plugin-vue` и `extensionManifest` (генерирует `dist/manifest.json` из корневого `manifest.json`, подставляя `version` из `package.json`);
- вход — `newtab.html`;
- выходные файлы раскладываются в `js/`, `css/`, `assets/` с хешами;
- `cssCodeSplit: false` — один CSS-файл;
- dev-сервер на порту 3000;
- секция `test` для Vitest (`src/**/*.test.js`).

Содержимое `public/` копируется в `dist/` как есть, поэтому `public/icons/` попадают в корень расширения. Пути вида `/img/...` в `sites.json` разрешаются относительно корня `dist/`.

## Тема и стили

Цвета, шрифт, радиус и тени карточек — CSS-переменные в `src/styles/theme.css`. Чтобы изменить оформление, правьте `:root` и блок `@media (prefers-color-scheme: dark)`. Стили компонентов `scoped`; глобальные стили есть только в `theme.css`.

## Выпуск версии

Деплой, секреты и чек-лист релиза описаны в [DEPLOY.md](DEPLOY.md).

## Частые проблемы

| Симптом | Причина и решение |
|---------|-------------------|
| Новая вкладка не изменилась | Загружена не папка `dist/`, либо расширение не обновлено после сборки |
| Вместо логотипа буква | Неверный путь в `image` или файл не лежит в `public/img/` (это ловит `npm test`) |
| Сайт не попал в папку | Разное написание `group` (регистр, пробелы) |
