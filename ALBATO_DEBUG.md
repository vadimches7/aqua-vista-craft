# Диагностика Albato Webhook

## Быстрая проверка

### 1. Откройте консоль браузера (F12)

При отправке формы вы должны увидеть логи:
- `[Albato] Sending request to webhook:` - запрос отправляется
- `[Albato] Response status: 200` - успешный ответ
- `[Albato] Success! Response: OK` - всё работает

### 2. Проверьте вкладку Network (F12 → Network)

1. Откройте вкладку **Network**
2. Отправьте форму
3. Найдите запрос к `h.albato.ru`
4. Проверьте:
   - **Status**: должен быть `200` или `204`
   - **Request Payload**: должен содержать `name`, `phone`, `source`, `page_url`, `form`
   - **Response**: может быть пустым (это нормально для webhook)

### 3. Настройка Albato Webhook

**ВАЖНО:** Перед тестированием нужно настроить webhook в Albato:

1. Откройте страницу настройки webhook в Albato
2. Нажмите кнопку **"Ожидать вебхук"** (Wait for webhook)
3. Отправьте тестовую заявку с сайта
4. Вернитесь на страницу Albato - вы должны увидеть полученные данные

### 4. Возможные проблемы

#### Проблема: "Network error" или CORS error
**Решение:** 
- Проверьте интернет-соединение
- Убедитесь, что webhook URL правильный
- Попробуйте отправить запрос напрямую через curl:
  ```bash
  curl -X POST https://h.albato.ru/wh/38/1lf8be4/ti_3pZCXqU8mG5NOYYwpbW4v4AwRdMxnMo5c4HNIbCQ/ \
    -H "Content-Type: application/json" \
    -d '{"name":"Тест","phone":"+79991234567","source":"bio-cube.ru","page_url":"http://localhost:5173","form":"calculator"}'
  ```

#### Проблема: Запрос отправляется, но ничего не приходит в amoCRM
**Решение:**
- Проверьте настройки связки в Albato (должна быть настроена связка Albato → amoCRM)
- Убедитесь, что в Albato правильно настроены поля (name → имя, phone → телефон)
- Проверьте логи в Albato - там должно быть видно, что данные получены

#### Проблема: "Albato webhook error: 404"
**Решение:**
- Проверьте, что webhook URL правильный
- Убедитесь, что webhook активен в Albato

#### Проблема: Запрос не отправляется (нет в Network)
**Решение:**
- Проверьте консоль на ошибки JavaScript
- Убедитесь, что форма валидна (заполнены обязательные поля)
- Проверьте, что функция `sendToAlbato` вызывается

### 5. Локальный vs Production

**Локальный dev-сервер (localhost):**
- ✅ Должен работать без проблем
- ✅ Webhook получает `page_url: "http://localhost:5173/..."`

**Production (Vercel):**
- ✅ Работает так же
- ✅ Webhook получает `page_url: "https://bio-cube.ru/..."`

**НЕ нужно публиковать проект для тестирования** - локальный dev-сервер работает отлично!

### 6. Тестовый запрос через curl

Если хотите проверить webhook напрямую:

```bash
curl -X POST https://h.albato.ru/wh/38/1lf8be4/ti_3pZCXqU8mG5NOYYwpbW4v4AwRdMxnMo5c4HNIbCQ/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Тестовый клиент",
    "phone": "+79991234567",
    "source": "bio-cube.ru",
    "page_url": "https://bio-cube.ru/test",
    "form": "calculator"
  }'
```

Ожидаемый ответ: `200 OK` или пустой ответ (это нормально для webhook).

