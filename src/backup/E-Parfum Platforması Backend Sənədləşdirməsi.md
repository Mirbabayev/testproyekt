# E-Parfum Platforması Backend Sənədləşdirməsi

## 1. Mikroservis Strukturu və Entitilər

### 1.1. Authentication Service
_İstifadəçi qeydiyyatı, giriş və çıxış əməliyyatlarını idarə edir_

**Entitilər:**
- **User**
  - id (UUID)
  - email (String)
  - password (String, şifrələnmiş)
  - fullName (String)
  - role (Enum: USER, SELLER, ADMIN)
  - createdAt (LocalDateTime)
  - updatedAt (LocalDateTime)
  - lastLogin (LocalDateTime)
  - isActive (Boolean)
  - address (String)
  - phone (String)

- **UserRole**
  - id (UUID)
  - userId (UUID, User referansı)
  - role (String)

- **RefreshToken**
  - id (UUID)
  - userId (UUID, User referansı)
  - token (String)
  - expiryDate (LocalDateTime)

### 1.2. Product Service
_Bütün məhsul əməliyyatları və məhsul məlumatlarının idarəçiliyi_

**Entitilər:**
- **Product**
  - id (UUID)
  - name (String)
  - brand (String)
  - description (String)
  - price (BigDecimal)
  - stock (Integer)
  - gender (Enum: MALE, FEMALE, UNISEX)
  - category (String)
  - concentration (String)
  - size (String)
  - imageUrl (String)
  - isActive (Boolean)
  - featured (Boolean)
  - createdAt (LocalDateTime)
  - updatedAt (LocalDateTime)
  - createdBy (UUID, User referansı)

- **FragranceNote**
  - id (UUID)
  - productId (UUID, Product referansı)
  - noteType (Enum: TOP, MIDDLE, BASE)
  - note (String)

- **ProductReview**
  - id (UUID)
  - productId (UUID, Product referansı)
  - userId (UUID, User referansı)
  - rating (Integer)
  - comment (String)
  - createdAt (LocalDateTime)

### 1.3. Collection Service
_İstifadəçi kolleksiyalarının idarəçiliyi_

**Entitilər:**
- **Collection**
  - id (UUID)
  - userId (UUID, User referansı)
  - name (String)
  - description (String)
  - imageUrl (String)
  - isPublic (Boolean)
  - createdAt (LocalDateTime)
  - updatedAt (LocalDateTime)
  - likes (Integer)

- **CollectionItem**
  - id (UUID)
  - collectionId (UUID, Collection referansı)
  - productId (UUID, Product referansı)
  - notes (String)
  - addedAt (LocalDateTime)

- **CollectionLike**
  - id (UUID)
  - collectionId (UUID, Collection referansı)
  - userId (UUID, User referansı)
  - likedAt (LocalDateTime)

### 1.4. Cart Service
_Səbət əməliyyatları_

**Entitilər:**
- **Cart**
  - id (UUID)
  - userId (UUID, User referansı)
  - createdAt (LocalDateTime)
  - updatedAt (LocalDateTime)

- **CartItem**
  - id (UUID)
  - cartId (UUID, Cart referansı)
  - productId (UUID, Product referansı)
  - quantity (Integer)
  - addedAt (LocalDateTime)

### 1.5. Order Service
_Sifarişlərin yaradılması və idarəçiliyi_

**Entitilər:**
- **Order**
  - id (UUID)
  - userId (UUID, User referansı)
  - status (Enum: PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
  - totalAmount (BigDecimal)
  - shippingAddress (String)
  - paymentMethod (String)
  - createdAt (LocalDateTime)
  - updatedAt (LocalDateTime)
  - trackingNumber (String)
  - notes (String)

- **OrderItem**
  - id (UUID)
  - orderId (UUID, Order referansı)
  - productId (UUID, Product referansı)
  - quantity (Integer)
  - price (BigDecimal)

- **OrderTracking**
  - id (UUID)
  - orderId (UUID, Order referansı)
  - status (String)
  - location (String)
  - timestamp (LocalDateTime)
  - description (String)

### 1.6. Catalog Service
_Ətir kataloqu və statik məlumatların idarəçiliyi_

**Entitilər:**
- **CatalogItem**
  - id (UUID)
  - type (Enum: BRAND, CATEGORY, CONCENTRATION, FRAGRANCE_GROUP)
  - name (String)
  - description (String)

- **Brand**
  - id (UUID)
  - name (String)
  - description (String)
  - logoUrl (String)
  - website (String)

- **Category**
  - id (UUID)
  - name (String)
  - description (String)

- **FragranceGroup**
  - id (UUID)
  - name (String)
  - description (String)
  - notes (String)

### 1.7. Recommendation Service
_Ətir tövsiyələrinin yaradılması_

**Entitilər:**
- **UserPreference**
  - id (UUID)
  - userId (UUID, User referansı)
  - preferenceType (String)
  - preferenceValue (String)

- **RecommendationHistory**
  - id (UUID)
  - userId (UUID, User referansı)
  - productId (UUID, Product referansı)
  - recommendedAt (LocalDateTime)
  - clicked (Boolean)
  - purchased (Boolean)

- **FragranceCombination**
  - id (UUID)
  - primaryProductId (UUID, Product referansı)
  - combinedProductId (UUID, Product referansı)
  - compatibilityScore (Integer)
  - notes (String)

### 1.8. File Storage Service
_Şəkil və digər media fayllarının idarəçiliyi_

**Entitilər:**
- **FileResource**
  - id (UUID)
  - fileName (String)
  - fileType (String)
  - filePath (String)
  - fileSize (Long)
  - uploadedBy (UUID, User referansı)
  - uploadedAt (LocalDateTime)
  - entityType (String)
  - entityId (UUID)

## 2. REST API Endpointlər

### 2.1. Authentication API

- `POST /api/auth/register` - İstifadəçi qeydiyyatı
- `POST /api/auth/login` - İstifadəçi girişi
- `POST /api/auth/logout` - İstifadəçi çıxışı
- `GET /api/auth/user` - Cari istifadəçi məlumatları
- `PUT /api/auth/user` - İstifadəçi məlumatlarını yeniləmə
- `DELETE /api/auth/user` - İstifadəçini silmə
- `POST /api/auth/password/reset` - Şifrə sıfırlama

### 2.2. Product API

- `GET /api/products` - Bütün məhsulları əldə etmək (filtrləmə parametrləri ilə)
- `GET /api/products/{id}` - Məhsul haqqında ətraflı məlumat əldə etmək
- `POST /api/products` - Yeni məhsul əlavə etmək (ADMIN və SELLER)
- `PUT /api/products/{id}` - Mövcud məhsulu yeniləmək (ADMIN və SELLER)
- `DELETE /api/products/{id}` - Məhsulu silmək (ADMIN və SELLER)
- `GET /api/products/featured` - Seçilmiş məhsulları əldə etmək
- `GET /api/products/search` - Məhsulları axtarmaq
- `GET /api/products/{id}/notes` - Məhsulun notlarını əldə etmək
- `POST /api/products/{id}/reviews` - Məhsula rəy əlavə etmək

### 2.3. Collection API

- `GET /api/collections` - İctimai kolleksiyaları əldə etmək
- `GET /api/collections/my` - İstifadəçinin kolleksiyalarını əldə etmək
- `GET /api/collections/{id}` - Kolleksiya haqqında ətraflı məlumat
- `POST /api/collections` - Yeni kolleksiya yaratmaq
- `PUT /api/collections/{id}` - Kolleksiyanı yeniləmək
- `DELETE /api/collections/{id}` - Kolleksiyanı silmək
- `POST /api/collections/{id}/items` - Kolleksiyaya məhsul əlavə etmək
- `DELETE /api/collections/{id}/items/{itemId}` - Kolleksiyadan məhsulu silmək
- `PUT /api/collections/{id}/visibility` - Kolleksiyanın görünürlüyünü dəyişmək
- `POST /api/collections/{id}/like` - Kolleksiyanı bəyənmək
- `DELETE /api/collections/{id}/like` - Kolleksiyadan bəyənini silmək

### 2.4. Cart API

- `GET /api/cart` - Cari istifadəçinin səbətini əldə etmək
- `POST /api/cart/items` - Səbətə məhsul əlavə etmək
- `PUT /api/cart/items/{id}` - Səbətdəki məhsulun sayını yeniləmək
- `DELETE /api/cart/items/{id}` - Səbətdən məhsulu silmək
- `DELETE /api/cart/clear` - Səbəti təmizləmək

### 2.5. Order API

- `POST /api/orders` - Yeni sifariş yaratmaq
- `GET /api/orders` - İstifadəçinin sifarişlərini əldə etmək
- `GET /api/orders/{id}` - Sifariş haqqında ətraflı məlumat
- `PUT /api/orders/{id}/status` - Sifarişin statusunu yeniləmək (ADMIN və SELLER)
- `GET /api/orders/{id}/tracking` - Sifariş izləmə məlumatları
- `POST /api/orders/{id}/tracking` - Yeni izləmə məlumatı əlavə etmək (ADMIN və SELLER)

### 2.6. Catalog API

- `GET /api/catalog/brands` - Bütün brendləri əldə etmək
- `GET /api/catalog/categories` - Bütün kateqoriyaları əldə etmək
- `GET /api/catalog/notes` - Bütün notları əldə etmək
- `GET /api/catalog/concentrations` - Bütün konsentrasiyaları əldə etmək
- `GET /api/catalog/sizes` - Bütün ölçüləri əldə etmək
- `GET /api/catalog/fragrance-groups` - Bütün ətir qruplarını əldə etmək
- `POST /api/catalog/{type}` - Kataloqa yeni element əlavə etmək (ADMIN)
- `DELETE /api/catalog/{type}/{id}` - Kataloqdan elementi silmək (ADMIN)

### 2.7. Recommendation API

- `POST /api/recommendations/by-profile` - İstifadəçi profilinə görə tövsiyələr almaq
- `GET /api/recommendations/popular` - Ən populyar məhsulları əldə etmək
- `GET /api/recommendations/similar/{productId}` - Oxşar məhsulları əldə etmək
- `POST /api/recommendations/combination` - Ətir kombinasiyası tövsiyələri
- `POST /api/recommendations/preferences` - İstifadəçi preferencelərini yadda saxlamaq

### 2.8. Admin API

- `GET /api/admin/users` - Bütün istifadəçiləri əldə etmək
- `PUT /api/admin/users/{id}/role` - İstifadəçinin rolunu dəyişmək
- `GET /api/admin/stats` - Ümumi statistika məlumatları
- `GET /api/admin/orders` - Bütün sifarişləri əldə etmək
- `PUT /api/admin/products/{id}/featured` - Məhsulun seçilmiş statusunu dəyişmək

### 2.9. File API

- `POST /api/files/upload` - Fayl yükləmək
- `GET /api/files/{id}` - Fayl haqqında məlumat əldə etmək
- `DELETE /api/files/{id}` - Faylı silmək
- `GET /api/files/entity/{entityType}/{entityId}` - Entitiyə aid faylları əldə etmək

## 3. Xarici İnteqrasiyalar

1. **Payment Gateway**
   - Stripe/PayPal/Braintree inteqrasiyası
   - Təhlükəsiz ödəniş əməliyyatları

2. **CDN Service**
   - Şəkil və media fayllarının saxlanması və çatdırılması

3. **Email Service**
   - İstifadəçi qeydiyyatı, sifariş təsdiqləri və şifrə sıfırlama emailləri

4. **SMS Gateway**
   - Sifariş statusu bildirişləri
   - İki faktorlu identifikasiya

## 4. Təhlükəsizlik Tələbləri

1. JWT Authentication
2. Role-Based Access Control (RBAC)
3. Şifrələrin hash edilməsi (BCrypt)
4. API Rate Limiting
5. CSRF qorunması
6. HTTPS yalnız kommunikasiya
7. Sensitive data encryption (PCI DSS uyğunluq)

## 5. Servislərarası Kommunikasiya

1. **Synchronous Communication**
   - REST API calls
   - gRPC (performans kritik əməliyyatlar üçün)

2. **Asynchronous Communication**
   - Message Queue (RabbitMQ/Kafka)
   - Event-driven mikroservis arxitektura

## 6. Verilənlər Bazası Seçimləri

Hər mikroservis öz verilənlər bazasına sahib ola bilər:

1. **Authentication Service** - PostgreSQL
2. **Product Service** - PostgreSQL
3. **Collection Service** - PostgreSQL
4. **Cart Service** - Redis + PostgreSQL
5. **Order Service** - PostgreSQL
6. **Catalog Service** - PostgreSQL/MongoDB
7. **Recommendation Service** - PostgreSQL + Redis
8. **File Storage Service** - MongoDB GridFS/S3 + PostgreSQL metadata

---

Bu sənədləşdirmə, mikroservis arxitekturası üzərində qurulan E-Parfum platformasının backend tərəfinin dizayn və tələbləri üçün yol xəritəsidir. Hər bir servis və entiti arasındakı əlaqələr, həmçinin API endpoint-lər müvafiq qaydada təsvir edilmişdir.
