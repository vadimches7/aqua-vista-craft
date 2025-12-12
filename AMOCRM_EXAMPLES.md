# Примеры использования интеграции amoCRM с visitor_uid

## Пример 1: Отправка формы контакта

```typescript
// src/components/Contact.tsx
import { createAmoCRMLead } from '@/lib/amocrm';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // visitor_uid автоматически берётся из localStorage
  const result = await createAmoCRMLead({
    name: formData.name,
    phone: formData.phone,
    message: formData.message,
    source: 'contact',
  });
  
  if (result.success) {
    // Успешно отправлено
  }
};
```

## Пример 2: Отправка заявки с калькулятора

```typescript
// src/components/Calculator.tsx
import { createAmoCRMLead } from '@/lib/amocrm';

const handleContact = async () => {
  // visitor_uid автоматически добавляется
  const result = await createAmoCRMLead({
    name: phone ? `Клиент ${phone}` : 'Клиент',
    phone: phone,
    projectType: projectType,
    volume: volume,
    calculatedPrice: calculatedPrice,
    address: address,
    source: 'calculator',
  });
};
```

## Пример 3: Прямое использование visitor_uid

```typescript
import { getVisitorUid } from '@/lib/visitor';

// Получить visitor_uid
const visitorUid = getVisitorUid();

if (visitorUid) {
  console.log('Visitor UID:', visitorUid);
} else {
  console.log('Visitor UID не найден');
}
```

## Пример 4: Прямой вызов API endpoint

```typescript
import { getVisitorUid } from '@/lib/visitor';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
if (!API_BASE) throw new Error('NEXT_PUBLIC_API_BASE is not defined');

const response = await fetch(`${API_BASE}/api/lead`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Иван Иванов',
    phone: '+79991234567',
    email: 'ivan@example.com',
    visitor_uid: getVisitorUid(), // Вручную передаём visitor_uid
    message: 'Хочу заказать аквариум',
    source: 'custom',
  }),
});

const result = await response.json();
```

## Пример 5: Обработка ответа от API

```typescript
const result = await createAmoCRMLead({
  name: 'Иван Иванов',
  phone: '+79991234567',
  source: 'contact',
});

if (result.success) {
  console.log('Заявка успешно создана в amoCRM');
  // Сделка создана, visitor_uid передан
} else {
  console.error('Ошибка:', result.error);
  // Обработка ошибки
}
```

## Структура данных LeadData

```typescript
interface LeadData {
  // Обязательные поля
  name: string;
  phone: string;
  
  // Опциональные поля
  email?: string;
  projectType?: string;
  volume?: string;
  style?: string;
  calculatedPrice?: number;
  address?: string;
  convenientTime?: string;
  source?: string; // "calculator" | "tariff" | "contact" | "messenger"
  tariffName?: string;
  message?: string;
  
  // visitor_uid добавляется автоматически, не нужно передавать вручную
}
```

## Проверка работы интеграции

### В браузере (консоль):

```javascript
// Проверить наличие visitor_uid
localStorage.getItem('amo_visitor_uid')

// Отправить тестовую заявку
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
if (!API_BASE) throw new Error('NEXT_PUBLIC_API_BASE is not defined');

fetch(`${API_BASE}/api/lead`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    phone: '+79991234567',
    visitor_uid: localStorage.getItem('amo_visitor_uid') || undefined,
    source: 'test'
  })
})
  .then(r => r.json())
  .then(console.log)
```

### В amoCRM:

1. Откройте созданную сделку
2. Проверьте, что контакт связан
3. Проверьте, что сделка связана с посетителем (через visitor_uid)

## Отладка

### Логи на фронтенде:

```typescript
// В src/lib/amocrm.ts уже есть логирование
console.log("AmoCRM: Starting lead creation", { 
  name: data.name,
  phone: data.phone,
  visitorUid: visitorUid || 'not provided',
  source: data.source 
});
```

### Логи на сервере:

```typescript
// В api/lead.ts уже есть логирование
console.log('Creating lead with visitor_uid:', visitorUid || 'not provided');
console.log('Lead created successfully:', {
  leadId: lead.id,
  contactId: contact.id,
  visitorUid: visitorUid || 'not provided',
});
```

### Проверка в Vercel:

1. Откройте Vercel Dashboard
2. Перейдите в Functions → /api/lead
3. Просмотрите логи выполнения


