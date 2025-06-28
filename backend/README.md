# ToDoList Backend

## Kurulum

1. Bağımlılıkları yükleyin:
   ```sh
   npm install
   ```
2. .env dosyasını doldurun:
   ```env
   PORT=5000
   DATABASE_URL=postgresql://username:password@localhost:5432/todolist_db
   NODE_ENV=development
   ```
3. Veritabanı şemasını oluşturun:
   ```sh
   node scripts/setup-db.js
   ```
4. Geliştirme sunucusunu başlatın:
   ```sh
   npm run dev
   ```

## API Endpointleri

- `GET    /api/todos`           : Tüm todoları getirir (filtreleme destekler)
- `GET    /api/todos/:id`       : Tek bir todo getirir
- `POST   /api/todos`           : Yeni todo oluşturur
- `PUT    /api/todos/:id`       : Todo günceller
- `PATCH  /api/todos/:id/toggle`: Tamamlanma durumunu değiştirir
- `DELETE /api/todos/:id`       : Todo siler
- `GET    /api/todos/stats`     : İstatistikleri getirir

## Ekstra
- Gelişmiş hata yönetimi ve input doğrulama
- CORS, Helmet, Morgan ile güvenlik ve loglama 