# Деплой и выпуск версий

Публикация автоматизирована workflow `.github/workflows/release.yml` и запускается тегом `v*`.

## Выпуск новой версии

1. Проверьте, что `npm run lint` и `npm run build` проходят.
2. Поднимите версию в **обоих** файлах: `package.json` и `public/manifest.json`.
3. Закоммитьте (`Bump version to X.Y.Z`).
4. Создайте и отправьте тег:
   ```bash
   git tag vX.Y.Z
   git push origin main vX.Y.Z
   ```

## Что делает workflow

1. `npm ci`;
2. проверяет, что тег совпадает с версией в `public/manifest.json` (иначе падает);
3. `npm run package` → `new-tab-extension.zip`;
4. создаёт GitHub Release с архивом и автоматическими заметками;
5. загружает архив в Chrome Web Store и публикует (`--auto-publish`).

## Секреты репозитория

Для шага публикации в Chrome Web Store нужны secrets в настройках GitHub-репозитория:

| Secret              | Назначение                      |
|---------------------|---------------------------------|
| `CWS_EXTENSION_ID`  | ID расширения в Web Store       |
| `CWS_CLIENT_ID`     | OAuth client ID                 |
| `CWS_CLIENT_SECRET` | OAuth client secret             |
| `CWS_REFRESH_TOKEN` | OAuth refresh token             |

Как их получить: документация [chrome-webstore-upload-cli](https://github.com/fregante/chrome-webstore-upload-cli).

## Ручная публикация

```bash
npm run package
```

Загрузите `new-tab-extension.zip` в [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole). Материалы для карточки магазина (иконка, скриншот) лежат в `store/`, политика конфиденциальности — в [PRIVACY.md](../PRIVACY.md).

## Чек-лист перед релизом

- `npm run lint` без ошибок;
- `npm run build` проходит;
- расширение из `dist/` загружено в Chrome: новая вкладка открывается, папки открываются и закрываются, логотипы видны в светлой и тёмной темах;
- версии в `package.json` и `public/manifest.json` совпадают.

## Частые проблемы

| Симптом | Причина и решение |
|---------|-------------------|
| Workflow упал на проверке тега | Версия в `public/manifest.json` не совпадает с тегом |
| Падает шаг публикации в Web Store | Не заданы или устарели secrets `CWS_*`, либо в магазине уже есть версия с таким номером |
| Тег отправлен, а workflow не запустился | Тег не начинается с `v` |
