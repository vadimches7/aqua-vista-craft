# Настройка интеграции amoCRM с visitor_uid

## Описание

Интеграция позволяет связывать сделки в amoCRM с конкретными посетителями сайта через `visitor_uid`, который отслеживается через GTM и AMOPIXEL_IDENTIFIER.

## Архитектура

1. **Фронтенд (React)**:
   - Получает `visitor_uid` из `localStorage` (ключ: `amo_visitor_uid`)
   - Отправляет данные формы вместе с `visitor_uid` на API endpoint

2. **Backend (Vercel Serverless Function)**:
   - Принимает данные формы и `visitor_uid`
   - Ищет существующий контакт по телефону/email или создаёт новый
   - Создаёт сделку в amoCRM с передачей `visitor_uid`

3. **amoCRM**:
   - Связывает сделку с посетителем сайта через `visitor_uid`
   - Позволяет отслеживать поведение посетителя до создания сделки

## Настройка

### 1. Переменные окружения в Vercel

В настройках проекта Vercel добавьте следующие переменные окружения:

```
AMOCRM_DOMAIN=amocrm.ru
AMOCRM_ACCESS_TOKEN=your_long_lived_token_here
AMOCRM_API_DOMAIN=api-b.amocrm.ru
```

**Важно**: 
- `AMOCRM_ACCESS_TOKEN` должен быть long-lived токеном (JWT токен)
- Токен можно получить в amoCRM: Настройки → Интеграции → API

### 2. GTM и AMOPIXEL_IDENTIFIER

Убедитесь, что на сайте подключён amoCRM visitor tracking через GTM:
- `AMOPIXEL_IDENTIFIER` должен быть настроен
- `visitor_uid` должен сохраняться в `localStorage` под ключом `amo_visitor_uid`

### 3. Локальная разработка

Для локальной разработки API endpoint:

1. Установите Vercel CLI:
```bash
npm i -g vercel
```

2. Запустите локальный dev server:
```bash
vercel dev
```

3. Или используйте переменные окружения в `.env.local`:
```
VITE_AMOCRM_DOMAIN=amocrm.ru
VITE_AMOCRM_ACCESS_TOKEN=your_token
VITE_AMOCRM_API_DOMAIN=api-b.amocrm.ru
```

## Использование

### На фронтенде

Все формы автоматически отправляют `visitor_uid`:

```typescript
import { createAmoCRMLead } from '@/lib/amocrm';

const result = await createAmoCRMLead({
  name: 'Иван Иванов',
  phone: '+79991234567',
  email: 'ivan@example.com',
  message: 'Хочу заказать аквариум',
  source: 'contact',
});
```

Функция `createAmoCRMLead` автоматически:
1. Получает `visitor_uid` из `localStorage`
2. Отправляет данные на `/api/lead`
3. Обрабатывает ответ

### API Endpoint

**POST** `/api/lead`

**Request Body**:
```json
{
  "name": "Иван Иванов",
  "phone": "+79991234567",
  "email": "ivan@example.com",
  "visitor_uid": "abc123...",
  "message": "Хочу заказать аквариум",
  "source": "contact"
}
```

**Response**:
```json
{
  "success": true,
  "leadId": 12345,
  "contactId": 67890,
  "visitorUid": "abc123..."
}
```

## Как работает связка visitor → сделка

### Ключевые моменты:

1. **На фронтенде** (`src/lib/amocrm.ts`):
   ```typescript
   const visitorUid = getVisitorUid(); // Из localStorage
   // ...
   body: JSON.stringify({
     ...data,
     visitor_uid: visitorUid, // <-- Передаём на сервер
   })
   ```

2. **На сервере** (`api/lead.ts`):
   ```typescript
   const visitorUid = body.visitor_uid; // Из тела запроса
   // ...
   const lead = await createLead(
     leadName,
     contact.id,
     visitorUid, // <-- КЛЮЧЕВОЙ ПАРАМЕТР
     // ...
   );
   ```

3. **В amoCRM API** (`api/lead.ts`, функция `createLead`):
   ```typescript
   if (visitorUid) {
     leadPayload.visitor_uid = visitorUid; // <-- Связывает сделку с посетителем
   }
   ```

### Результат:

- Сделка в amoCRM связана с конкретным посетителем сайта
- Можно отследить историю посещений до создания сделки
- В amoCRM видно, какие страницы посетил пользователь перед отправкой формы

## Поиск существующего контакта

API автоматически ищет существующий контакт по телефону или email:

1. Сначала ищет по телефону
2. Если не найден, ищет по email
3. Если не найден, создаёт новый контакт

Это предотвращает дублирование контактов в amoCRM.

## Обработка ошибок

- Если `visitor_uid` отсутствует, сделка всё равно создаётся, но без привязки к посетителю
- Если контакт не найден, создаётся новый
- Все ошибки логируются в консоль сервера

## Тестирование

1. Откройте сайт в браузере
2. Убедитесь, что `visitor_uid` сохранён в `localStorage`:
   ```javascript
   localStorage.getItem('amo_visitor_uid')
   ```
3. Отправьте форму
4. Проверьте в amoCRM:
   - Создана сделка
   - Сделка связана с контактом
   - В сделке указан `visitor_uid` (если был передан)

## Troubleshooting

### visitor_uid не передаётся

1. Проверьте, что GTM настроен правильно
2. Проверьте `localStorage`: `localStorage.getItem('amo_visitor_uid')`
3. Проверьте консоль браузера на наличие ошибок

### API endpoint не работает

1. Проверьте переменные окружения в Vercel
2. Проверьте логи в Vercel Dashboard
3. Убедитесь, что токен действителен

### Контакт не находится

1. Проверьте формат телефона (должен совпадать с форматом в amoCRM)
2. Проверьте формат email (регистронезависимый поиск)
