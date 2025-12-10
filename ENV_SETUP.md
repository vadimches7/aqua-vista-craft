# Настройка переменных окружения для AmoCRM

## Шаг 1: Создайте файл .env в корне проекта

Создайте файл `.env` в корне проекта (рядом с `package.json`)

## Шаг 2: Добавьте следующие переменные:

```env
# AmoCRM настройки
VITE_AMOCRM_DOMAIN=amocrm.ru
VITE_AMOCRM_API_DOMAIN=api-b.amocrm.ru
VITE_AMOCRM_ACCESS_TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjUxOTMzZGRhZWFlMTQxMGYxZWEzYTM0MjVmMTU5N2NkYTNmYTVlODQwM2U1NGU4Y2FhZDkzMzM2NmQxMWJiNDY1ODFmOTQ3NGFiYjU2ZDI4In0.eyJhdWQiOiIyMDA5NmQ2ZC0zNzQ3LTRlZDUtYTI2NS0xMzdmNzFkYjEzNjQiLCJqdGkiOiI1MTkzM2RkYWVhZTE0MTBmMWVhM2EzNDI1ZjE1OTdjZGEzZmE1ZTg0MDNlNTRlOGNhYWQ5MzMzNjZkMTFiYjQ2NTgxZjk0NzRhYmI1NmQyOCIsImlhdCI6MTc2NTMyOTMyMCwibmJmIjoxNzY1MzI5MzIwLCJleHAiOjE4NDk0Nzg0MDAsInN1YiI6IjEzMTg3NzAyIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMyNzUyODU0LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiMDczNjI3NzEtNzY3My00OWJmLTgyNzQtNzNjZTY5NTNhMjYzIiwidXNlcl9mbGFncyI6MCwiYXBpX2RvbWFpbiI6ImFwaS1iLmFtb2NybS5ydSJ9.ojUPaFi81TRVilY6ukZ3w2T_Tuh_btYH7Qctn_dnfS9gaorvQPzn1kyJtGfTzcagv51uxthn32qRxRYjY3z9m2R_y0x-OS023Kz7GTqy4gMiKwtfbjR6kTQHs6z3knIsDqvQ5syvDY3MA6_YIctqUUiOIY3Gm208HTc_r4ato2u2JWWSKXFYy4YBHcV5309rR1MzesNF5jWHGiRdDH5K-L1lAheFJhR5wUBh8lJhfL3bUA76P84AX_yfHGuKkTze37JQLlKDCVwGW5PK4R1Mj_gj2VABnD582j2S1CfOF30QP3FyR0eeGq3ff4h08u0Wubj6fuhfBKmIFswItBBY3g

# Секретный ключ (для справки, не используется напрямую в коде)
# VITE_AMOCRM_CLIENT_SECRET=g7kSRQW2H4VtA1e0sy4qCnNyymfGMcbarGZVUaRUTss3wEpPdOScZ7mMc3Oj3u7C
```

## Шаг 3: Перезапустите dev-сервер

После создания файла `.env` перезапустите dev-сервер:

```bash
npm run dev
```

## Важно:

⚠️ **НЕ КОММИТЬТЕ файл `.env` в Git!**

Файл `.env` уже добавлен в `.gitignore`, поэтому он не попадёт в репозиторий.

## Проверка работы:

1. Заполните форму калькулятора на сайте
2. Нажмите "Обсудить проект в WhatsApp"
3. Проверьте в AmoCRM, что создалась новая сделка и контакт

## Если что-то не работает:

1. Проверьте консоль браузера на ошибки
2. Убедитесь, что токен не истёк (срок действия до 2028 года)
3. Проверьте, что переменные окружения загружаются (можно добавить `console.log(import.meta.env.VITE_AMOCRM_ACCESS_TOKEN)` для проверки)

