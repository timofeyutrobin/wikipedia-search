# Wikipedia Search

Данное приложение позволяет искать текстовую информацию в русскоязычной [Википедии](https://ru.wikipedia.org).

## [Ссылка на приложение](https://wikipedia-search-naumen-2019.herokuapp.com/)
## [Ссылка на исходный код](https://github.com/timofeyutrobin/wikipedia-search/)

## Возможности

Для того, чтобы найти статьи, содержащие интересующую вас информацию, просто введите поисковый запрос в поле поиска и нажмите кнопку **Найти**.
Вы так же можете нажать на клавишу **Enter** для осуществления поиска

### Настройки

Вы можете изменить настройки поиска, например:

#### Количество статей

С помощью этого ползунка можно задать количество статей, которое будет отображаться на странице, вы можете выбирать в диапазоне от 5 до 20 статей.

#### Сортировать по

Вы можете выбрать, в каком порядке хотите видеть результаты поиска:

- Релевантности
- Дате последнего обновления
  - :grey_exclamation: Обратите внимание, что поиск осуществится заново.

### Результаты поиска

Каждый результат поиска состоит из заголовка и первых 4х предложений из текста оригинальной статьи.
По нажатию на заголовок, соответствующая статья откроется в новом окне.

Также внизу у каждого результата можно увидеть дополнительную информацию:

- Длина
- Дата последнего изменения

## Архитектура приложения

Приложение было написано на React + typescript с использованием `create-react-app` для автоматической конфигурации.

Приложение было размещено на heroku по адресу https://wikipedia-search-naumen-2019.herokuapp.com/

### Сборка и запуск

Для начала склонируйте репозиторий и введите команду `npm install` для установки необходимых зависимостей

Для запуска приложения в режиме разработки введите в командной строке `npm run start`

Для создания оптимизированной сборки используйте команду `npm run build`

### Компоненты

Рассмотрим некоторые компоненты приложения

#### `App`

В компоненте `App` содержится все состояние приложения:

- Текст поиска
- Количество загружаемых статей
- Порядок сортировки

Эти параметры используются для создания запроса к Wikipedia API.
По нажатию на кнопку происходит запрос с текущими параметрами.

В случае возниковения ошибки во время запроса, например, отсутствия ответа или отсутствия результатов для введенного запроса, приложение отобразит эту ошибку с соответствующим текстом.

Во время запроса приложение отображает анимацию загрузки.

Состояние приложения меняется с помощью обработчиков событий в самом компоненте `App`.
Обработчики передаются дочерним компонентам через `props`.

#### `SearchForm`

Данный компонент отображает `<input>` для ввода текста поиска и `<button>` для вызова самого поиска.

#### `Articles`

Отображает список найденных статей, в качестве атрибута `key` каждая статья принимает `pageid` из результатов запроса.

#### `Settings`

Отображает настройки поиска.

- Количество статей управляется с помощью `<input type=range>`
- Порядок сортировки управляется с помощью `<select>`

### Плюсы архитектуры

- Проста в реализации
- Использование create-react-app избавляет от конфигурации
- Легко деплоить

### Минусы архитектуры

- Большой размер главного компонента
- Необходимость передавать props вглубь при добавлений новых дочерних компонентов
- Компонент `Settings` можно разбить на подкомпоненты, но я не стал этого делать из-за пункта 2

При добавлении новых функций размер компонента `App` будет увеличиваться, управлять состоянием будет все сложнее и сложнее.
Решить эту проблему можно с помощью библиотек для управления состоянием, например Redux. Также проблема решается с помощью React Context.

