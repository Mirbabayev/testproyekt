# E-Parfum Platforması Backend Sənədləşdirməsi - Optimal Servis Strukturu

## 1. Servis Strukturu və Entitilər

### 1.1. User Service
_İstifadəçi idarəçiliyi, avtorizasiya və şəxsi məlumatlar_

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

- **RefreshToken**
  - id (UUID)
  - userId (UUID, User referansı)
  - token (String)
  - expiryDate (LocalDateTime)

- **Notification**
  - id (UUID)
  - userId (UUID, User referansı)
  - title (String)
  - message (String)
  - type (Enum: INFO, SUCCESS, ERROR, WARNING)
  - read (Boolean)
  - createdAt (LocalDateTime)
  - link (String)

- **OfflineOperation**
  - id (UUID)
  - userId (UUID, User referansı)
  - type (Enum: CREATE, UPDATE, DELETE)
  - entity (String)
  - entityId (String)
  - data (JSON)
  - timestamp (LocalDateTime)
  - syncStatus (Enum: PENDING, SYNCING, SYNCED, FAILED)
  - syncAttempts (Integer)
  - syncError (String)

### 1.2. Product Service
_Məhsul kataloqu, kolleksiyalar və filtrləmə_

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

- **Wishlist**
  - id (UUID)
  - userId (UUID, User referansı)
  - createdAt (LocalDateTime)

- **WishlistItem**
  - id (UUID)
  - wishlistId (UUID, Wishlist referansı)
  - productId (UUID, Product referansı)
  - addedAt (LocalDateTime)

### 1.3. Order Service
_Səbət, sifariş və ödəniş prosesləri_

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

- **PaymentTransaction**
  - id (UUID)
  - orderId (UUID, Order referansı)
  - amount (BigDecimal)
  - status (String)
  - paymentMethod (String)
  - transactionId (String)
  - timestamp (LocalDateTime)
  - errorMessage (String)

### 1.4. Content Service
_Media faylları və şəkillər_

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

- **ContentBlock**
  - id (UUID)
  - title (String)
  - content (Text)
  - type (String)
  - slug (String)
  - createdAt (LocalDateTime)
  - updatedAt (LocalDateTime)
  - publishedAt (LocalDateTime)
  - status (String)

### 1.5. Analytics Service
_Tövsiyə sistemi və məlumat analizi_

**Entitilər:**
- **UserPreference**
  - id (UUID)
  - userId (UUID, User referansı)
  - preferenceType (String)
  - preferenceValue (String)

- **UserActivity**
  - id (UUID)
  - userId (UUID, User referansı)
  - activityType (String)
  - activityData (JSON)
  - timestamp (LocalDateTime)
  - ipAddress (String)
  - deviceInfo (String)

- **FragranceCombination**
  - id (UUID)
  - primaryProductId (UUID, Product referansı)
  - combinedProductId (UUID, Product referansı)
  - compatibilityScore (Integer)
  - notes (String)

- **SalesMetric**
  - id (UUID)
  - metricType (String)
  - metricValue (Double)
  - period (String)
  - timestamp (LocalDateTime)

- **ProductMetric**
  - id (UUID)
  - productId (UUID, Product referansı)
  - metricType (String)
  - metricValue (Double)
  - period (String)
  - timestamp (LocalDateTime)

## 2. REST API Endpointlər

### 2.1. User Service API

#### Authentication
- `POST /api/auth/register` - İstifadəçi qeydiyyatı
- `POST /api/auth/login` - İstifadəçi girişi
- `POST /api/auth/logout` - İstifadəçi çıxışı
- `POST /api/auth/refresh-token` - Token yeniləmə
- `POST /api/auth/password/reset` - Şifrə sıfırlama

#### User Management
- `GET /api/users/me` - Cari istifadəçi məlumatları
- `PUT /api/users/me` - İstifadəçi məlumatlarını yeniləmə
- `DELETE /api/users/me` - İstifadəçini silmə
- `GET /api/users/{id}` - İstifadəçi məlumatını əldə etmək (ADMIN)
- `PUT /api/users/{id}` - İstifadəçi məlumatını yeniləmək (ADMIN)
- `PUT /api/users/{id}/role` - İstifadəçinin rolunu dəyişmək (ADMIN)

#### Notifications
- `GET /api/notifications` - İstifadəçinin bildirişlərini əldə etmək
- `PUT /api/notifications/{id}/read` - Bildirişi oxunmuş kimi işarələmək
- `PUT /api/notifications/read-all` - Bütün bildirişləri oxunmuş kimi işarələmək
- `DELETE /api/notifications/{id}` - Bildirişi silmək
- `DELETE /api/notifications/clear` - Bütün bildirişləri silmək

#### Offline Operations
- `POST /api/offline/operations` - Offline əməliyyat saxlamaq
- `GET /api/offline/operations` - Offline əməliyyatları əldə etmək
- `POST /api/offline/sync` - Offline əməliyyatları sinxronizasiya etmək
- `PUT /api/offline/mode` - Offline rejimi aktivləşdirmək/deaktivləşdirmək
- `GET /api/offline/mode` - Offline rejim statusunu əldə etmək

#### Admin
- `GET /api/admin/users` - Bütün istifadəçiləri əldə etmək (ADMIN)
- `GET /api/admin/stats/users` - İstifadəçi statistikalarını əldə etmək (ADMIN)

### 2.2. Product Service API

#### Products
- `GET /api/products` - Bütün məhsulları əldə etmək (filtrləmə parametrləri ilə)
- `GET /api/products/{id}` - Məhsul haqqında ətraflı məlumat
- `POST /api/products` - Yeni məhsul əlavə etmək (ADMIN və SELLER)
- `PUT /api/products/{id}` - Mövcud məhsulu yeniləmək (ADMIN və SELLER)
- `DELETE /api/products/{id}` - Məhsulu silmək (ADMIN və SELLER)
- `GET /api/products/featured` - Seçilmiş məhsulları əldə etmək
- `GET /api/products/search` - Məhsulları axtarmaq
- `PUT /api/products/{id}/featured` - Məhsulun seçilmiş statusunu dəyişmək (ADMIN)

#### Product Notes & Reviews
- `GET /api/products/{id}/notes` - Məhsulun notlarını əldə etmək
- `POST /api/products/{id}/notes` - Məhsula not əlavə etmək (ADMIN və SELLER)
- `GET /api/products/{id}/reviews` - Məhsulun rəylərini əldə etmək
- `POST /api/products/{id}/reviews` - Məhsula rəy əlavə etmək
- `DELETE /api/products/{id}/reviews/{reviewId}` - Məhsul rəyini silmək (ADMIN və rəy sahibi)

#### Catalog
- `GET /api/catalog/brands` - Bütün brendləri əldə etmək
- `GET /api/catalog/categories` - Bütün kateqoriyaları əldə etmək
- `GET /api/catalog/notes` - Bütün notları əldə etmək
- `GET /api/catalog/concentrations` - Bütün konsentrasiyaları əldə etmək
- `GET /api/catalog/sizes` - Bütün ölçüləri əldə etmək
- `GET /api/catalog/fragrance-groups` - Bütün ətir qruplarını əldə etmək
- `POST /api/catalog/{type}` - Kataloqa yeni element əlavə etmək (ADMIN)
- `DELETE /api/catalog/{type}/{id}` - Kataloqdan elementi silmək (ADMIN)

#### Collections
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

#### Wishlist
- `GET /api/wishlist` - İstifadəçinin seçilmişlərini əldə etmək
- `POST /api/wishlist/items` - Seçilmişlərə məhsul əlavə etmək
- `DELETE /api/wishlist/items/{productId}` - Seçilmişlərdən məhsulu silmək
- `DELETE /api/wishlist/clear` - Seçilmişləri təmizləmək
- `GET /api/wishlist/check/{productId}` - Məhsulun seçilmişlərdə olub-olmadığını yoxlamaq

#### Admin Product Management
- `GET /api/admin/products` - Bütün məhsulları əldə etmək (ADMIN)
- `GET /api/admin/stats/products` - Məhsul statistikalarını əldə etmək (ADMIN)
- `POST /api/admin/products/bulk` - Toplu məhsul əlavə etmək (ADMIN)

### 2.3. Order Service API

#### Cart
- `GET /api/cart` - Cari istifadəçinin səbətini əldə etmək
- `POST /api/cart/items` - Səbətə məhsul əlavə etmək
- `PUT /api/cart/items/{id}` - Səbətdəki məhsulun sayını yeniləmək
- `DELETE /api/cart/items/{id}` - Səbətdən məhsulu silmək
- `DELETE /api/cart/clear` - Səbəti təmizləmək

#### Orders
- `POST /api/orders` - Yeni sifariş yaratmaq
- `GET /api/orders` - İstifadəçinin sifarişlərini əldə etmək
- `GET /api/orders/{id}` - Sifariş haqqında ətraflı məlumat
- `PUT /api/orders/{id}/status` - Sifarişin statusunu yeniləmək (ADMIN və SELLER)
- `GET /api/orders/{id}/tracking` - Sifariş izləmə məlumatları
- `POST /api/orders/{id}/tracking` - Yeni izləmə məlumatı əlavə etmək (ADMIN və SELLER)
- `POST /api/orders/{id}/cancel` - Sifarişi ləğv etmək

#### Payments
- `POST /api/payments/process` - Ödəniş prosesini başlatmaq
- `GET /api/payments/{id}` - Ödəniş haqqında məlumat əldə etmək
- `POST /api/payments/webhook` - Ödəniş şlüzü webhook handler

#### Admin Order Management
- `GET /api/admin/orders` - Bütün sifarişləri əldə etmək (ADMIN və SELLER)
- `GET /api/admin/stats/orders` - Sifariş statistikalarını əldə etmək (ADMIN)
- `PUT /api/admin/orders/{id}` - Sifarişi yeniləmək (ADMIN)

### 2.4. Content Service API

#### File Management
- `POST /api/files/upload` - Fayl yükləmək
- `GET /api/files/{id}` - Fayl haqqında məlumat əldə etmək
- `DELETE /api/files/{id}` - Faylı silmək
- `GET /api/files/entity/{entityType}/{entityId}` - Entitiyə aid faylları əldə etmək

#### Content Blocks
- `GET /api/content/blocks` - Kontent bloklarını əldə etmək
- `GET /api/content/blocks/{id}` - Kontent bloku haqqında məlumat
- `POST /api/content/blocks` - Yeni kontent bloku əlavə etmək (ADMIN)
- `PUT /api/content/blocks/{id}` - Kontent blokunu yeniləmək (ADMIN)
- `DELETE /api/content/blocks/{id}` - Kontent blokunu silmək (ADMIN)

### 2.5. Analytics Service API

#### Recommendations
- `POST /api/recommendations/by-profile` - İstifadəçi profilinə görə tövsiyələr almaq
- `GET /api/recommendations/popular` - Ən populyar məhsulları əldə etmək
- `GET /api/recommendations/similar/{productId}` - Oxşar məhsulları əldə etmək
- `POST /api/recommendations/combination` - Ətir kombinasiyası tövsiyələri
- `POST /api/recommendations/preferences` - İstifadəçi preferencelərini yadda saxlamaq

#### Analytics
- `GET /api/analytics/dashboard` - Admin dashboard üçün ümumiləşdirilmiş analitika
- `GET /api/analytics/sales` - Satış analitikası (ADMIN)
- `GET /api/analytics/users` - İstifadəçi analitikası (ADMIN)
- `GET /api/analytics/products/top` - Ən çox satılan məhsullar
- `POST /api/analytics/event` - İstifadəçi aktivliyini qeyd etmək

## 3. Verilənlər Bazası Strukturu

Servis strukturu əsasında PostgreSQL istifadə etməklə:

### Database: e_parfum_user
- users
- refresh_tokens
- notifications
- offline_operations
- roles

### Database: e_parfum_product
- products
- fragrance_notes
- product_reviews
- brands
- categories
- fragrance_groups
- collections
- collection_items
- collection_likes
- wishlist
- wishlist_items

### Database: e_parfum_order
- carts
- cart_items
- orders
- order_items
- order_tracking
- payment_transactions

### Database: e_parfum_content
- file_resources
- content_blocks

### Database: e_parfum_analytics
- user_preferences
- user_activities
- fragrance_combinations
- sales_metrics
- product_metrics

## 4. Xarici İnteqrasiyalar

1. **Payment Gateway** - Stripe/PayPal/Braintree
2. **Storage Service** - AWS S3/Google Cloud Storage
3. **Email Service** - SendGrid/Mailchimp
4. **SMS Gateway** - Twilio
5. **CDN** - Cloudflare/AWS CloudFront

## 5. Təhlükəsizlik Tələbləri

1. JWT Authentication
2. Role-Based Access Control (RBAC)
3. BCrypt şifrə hashləmə
4. API Rate Limiting
5. CSRF qorunması
6. HTTPS kommunikasiya
7. Sensitive data encryption
8. Input validation
9. SQL injection qorunması

## 6. CI/CD və Deployment

1. **Continuous Integration** - GitHub Actions/Jenkins
2. **Continuous Deployment** - Docker ilə containerization
3. **Container Orchestration** - Kubernetes (böyük miqyas üçün) və ya Docker Compose (kiçik miqyas üçün)
4. **Environment Separation**
   - Development
   - Staging
   - Production

## 7. Monitoring və Logging

1. **Application Monitoring** - Prometheus + Grafana
2. **Log Aggregation** - ELK Stack (Elasticsearch, Logstash, Kibana)
3. **Error Tracking** - Sentry
4. **API Analytics** - Custom middleware və ya 3rd party

## 8. Böyümə və Miqyaslanma Planı

1. **İlkin Versiya**
   - Monolitik struktur (sadə 4-5 servis)
   - Əsas funksionallıqlar

2. **Genişlənmə Fazası**
   - Xidmətləri daha kiçik mikroservislərə parçalama
   - Load balancer əlavə etmə
   - Cache layer implementasiyası (Redis)

3. **Müştəri Artımı Fazası**
   - Horizontal scaling
   - Read replicas və sharding
   - Global CDN inteqrasiyası

---

Bu sənədləşdirmə, e-parfum platformasının optimal servis strukturu əsasında yaradılmışdır və həm davamlı inkişaf, həm də effektiv idarəetmə baxımından balanslaşdırılmışdır.
