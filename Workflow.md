# Как работать над проектом

## Окружение

Для удобства работы над проектом используются инструменты из **Node.js** , **npm** и **nx**. Все необходимые настройки произведены. Убедитесь, что на рабочем компьютере установлена **Node.js**, соответсвтующая актуальной версии. Актуальная версия **Node.js** указана в файле `package.json` в поле `node`. После, в терминале, перейти в директорию `project` с проектом и _единожды_ запустите команду:

```bash
npm install
```

Данная команда запустит процесс установки зависимостей проекта из **npm**.

Для нормальной работы приложения необходимо создать файл `<service_name>.env` в каждом проекте-микросервисе к примеру в директории `project\apps\user` создать файл `user.env` и заполнить переменные из файла `.env-sample`.

### Сценарии

После создания проекта вам доступны следующие сценарии.
Откройте терминал в директории `project`. Чтобы запустить проект вам необходимо запустить сервис к примеру `npx run user:serve` где `user` это приложение в директории `project\apps`

#### Запуск проекта

```bash
npx nx run user:serve
```

В процессе запуска проекта будет выполнен процесс «Сборки проекта» и запуска результирующего кода.

#### Линтинг Prisma

```bash
npx nx run blog:db:lint
```

#### Создание миграций Prisma

```bash
npx nx run blog:db:migrate
```

#### Принудительный сброс базы данных до начального состояния

```bash
npx nx run blog:db:reset
```

#### Запуск генерации клиента для Prisma

```bash
npx nx run blog:db:generate
```

#### Наполнение базы данных данными

```bash
npx nx run blog:db:seed
```

#### Создание микросервиса

```bash
npx nx g @nx/nest:application user
```

#### Создание модуля библиотеки

```bash
npx nx generate @nx/node:library constant --directory libs/shared/constant
```

В процессе создание библиотеки будет выполнен процесс создание модуля по пути `project\libs\shared` где `constant` название библиотеки, a `--directory libs/shared/constant` путь до нужного места.

#### Инициализации Prisma

Для инициализации Prisma не обходимо перейти в рабочую дерикторию `project\libs\blog\models` и выполнить команду.

```bash
npx prisma init --datasource-provider postgresql
```

#### Линтинг prisma model

Для линтинга prisma model не обходимо перейти в рабочую дерикторию `project\libs\blog\models` и выполнить команду.

```bash
npx prisma format ./prisma/schema.prisma
```

#### migration prisma model

Для migration prisma model не обходимо перейти в рабочую дерикторию `project\libs\blog\models` и выполнить команду.

```bash
npx prisma migrate dev --name "Added model for Post" --schema prisma/schema.prisma --skip-generate
```

- `--name` — название миграции
- `--schema` — путь к схеме
- `--skip-generate` — пропустить формирование клиента.

#### Локальный запуск базы данных MongoDB для `user`

Для запуска база данных у вас на машине должен быть установлен docker и заполненный файл `user.env`

```bash
docker compose --file ./apps/user/docker-compose.dev.yml --env-file ./apps/user/user.env --project-name "readme-user" up -d
```

#### Локальный запуск базы данных PostgreSql для `blog`

Для запуска база данных у вас на машине должен быть установлен docker и заполненный файл `blog.env`

```bash
docker compose --file ./apps/blog/docker-compose.dev.yml --env-file ./apps/blog/blog.env --project-name "readme-blog" up -d
```

#### Локальный запуск базы данных MongoDB для `file`

Для запуска база данных у вас на машине должен быть установлен docker и заполненный файл `user.env`

```bash
docker compose --file ./apps/file/docker-compose.dev.yml --env-file ./apps/file/file.env --project-name "readme-file" up -d
```

## Структура проекта

### Директория `src`

В директории размещаются исходный код проекта: компоненты, модули и так далее. Структура директории `src` может быть произвольной.

### Файл `Readme.md`

Файл, содержащий инструкции по работе с учебным репозиторием.

### Файл `Contributing.md`

Файл, содержащий советы и инструкции по внесению изменений в учебный репозиторий.

### Список всех переменных окружения

#### Переменных окружения проекта `user`

```bash
DB_MONGO_HOST=value - IP-адрес сервера базы данных (MongoDB)
DB_MONGO_USER=value - Имя пользователя в базе данных (MongoDB)
DB_MONGO_PASSWORD=value - Пароль пользователя в базе данных (MongoDB)
DB_MONGO_PORT=value - Порт пользователя в базе данных (MongoDB)
DB_MONGO_NAME=value - Название базы данных (MongoDB)
DB_MONGO_AUTH_BASE=value - Название базы данных для аутентификация (MongoDB)

JWT_ACCESS_TOKEN_SECRET=value - секрет для доступа токена
JWT_ACCESS_TOKEN_EXPIRES_IN=value - время жизни доступа токена
JWT_REFRESH_TOKEN_SECRET=value - секрет для доступа рефреш токена
JWT_REFRESH_TOKEN_EXPIRES_IN=value - время жизни доступа рефреш токена

PORT=value - Порт для входящих подключений
```

#### Переменных окружения проекта `blog`

```bash
DB_POSTGRES_USER=value - Имя пользователя в базе данных (PostgreSql)
DB_POSTGRES_PASSWORD=value - Пароль пользователя в базе данных (PostgreSql)
DB_POSTGRES_NAME=value - Имя базы данных (PostgreSql)
DB_POSTGRES_PORT=value - Порт пользователя в базе данных (PostgreSql)

PGADMIN_DEFAULT_EMAIL=value - Email пользователя в (PgAdmin)
PGADMIN_DEFAULT_PASSWORD=value - Пароль пользователя в для аутентификация (PgAdmin)

PORT=value - Порт для входящих подключений
```

#### Переменных окружения проекта `file`

```bash
FILE_MONGO_HOST=value - IP-адрес сервера базы данных (MongoDB)
FILE_MONGO_USER=value - Имя пользователя в базе данных (MongoDB)
FILE_MONGO_PASSWORD=value - Пароль пользователя в базе данных (MongoDB)
FILE_MONGO_PORT=value - Порт пользователя в базе данных (MongoDB)
FILE_MONGO_DB_NAME=value - Название базы данных (MongoDB)
FILE_MONGO_AUTH_BASE=value - Название базы данных для аутентификация (MongoDB)

UPLOAD_DIRECTORY_PATH=value - путь для загрузки файлов
SERVE_ROOT=value - место хранения статических файлов

PORT=value - Порт для входящих подключений
```

#### Переменных окружения prisma

```bash
DATABASE_URL=value - Строка соединения к postgresql через prisma (PostgreSql)
```

### Остальное

Все остальные файлы в проекте являются служебными. Пожалуйста, не удаляйте и не изменяйте их самовольно. Только если того требует задание или наставник.
