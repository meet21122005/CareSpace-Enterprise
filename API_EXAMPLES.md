# CareSpace API - Common Request Examples

## Base URL
```
http://127.0.0.1:8000
```

---

## Categories API

### 1. Create Category
```http
POST /api/categories HTTP/1.1
Content-Type: application/json

{
    "name": "Hospital Beds",
    "slug": "hospital-beds",
    "description": "Professional medical-grade beds"
}
```

**Expected Response (201 Created)**:
```json
{
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Hospital Beds",
    "slug": "hospital-beds",
    "description": "Professional medical-grade beds"
}
```

---

### 2. Get All Categories
```http
GET /api/categories HTTP/1.1
```

**Expected Response (200 OK)**:
```json
[
    {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "name": "Hospital Beds",
        "slug": "hospital-beds",
        "description": "Professional medical-grade beds"
    },
    {
        "id": "223e4567-e89b-12d3-a456-426614174001",
        "name": "Wheelchairs",
        "slug": "wheelchairs",
        "description": "Manual and electric wheelchairs"
    }
]
```

---

### 3. Get Category by Slug
```http
GET /api/categories/hospital-beds HTTP/1.1
```

**Expected Response (200 OK)**:
```json
{
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Hospital Beds",
    "slug": "hospital-beds",
    "description": "Professional medical-grade beds"
}
```

**Error Response (404 Not Found)**:
```json
{
    "detail": "Category not found"
}
```

---

## Products API

### 1. Create Product
```http
POST /api/products HTTP/1.1
Content-Type: application/json

{
    "name": "ICU Hospital Bed",
    "slug": "icu-hospital-bed",
    "category_id": "123e4567-e89b-12d3-a456-426614174000",
    "daily_price": 500,
    "weekly_price": 3000,
    "monthly_price": 12000
}
```

**Expected Response (201 Created)**:
```json
{
    "id": "323e4567-e89b-12d3-a456-426614174002",
    "name": "ICU Hospital Bed",
    "slug": "icu-hospital-bed",
    "category_id": "123e4567-e89b-12d3-a456-426614174000",
    "daily_price": 500,
    "weekly_price": 3000,
    "monthly_price": 12000
}
```

---

### 2. Create Product Without Pricing (Minimal)
```http
POST /api/products HTTP/1.1
Content-Type: application/json

{
    "name": "Standard Hospital Bed",
    "slug": "standard-hospital-bed"
}
```

**Expected Response (201 Created)**:
```json
{
    "id": "423e4567-e89b-12d3-a456-426614174003",
    "name": "Standard Hospital Bed",
    "slug": "standard-hospital-bed",
    "category_id": null,
    "daily_price": null,
    "weekly_price": null,
    "monthly_price": null
}
```

---

### 3. Get All Products (Rent Page)
```http
GET /api/products HTTP/1.1
```

**Expected Response (200 OK)**:
```json
[
    {
        "id": "323e4567-e89b-12d3-a456-426614174002",
        "name": "ICU Hospital Bed",
        "slug": "icu-hospital-bed",
        "category_id": "123e4567-e89b-12d3-a456-426614174000",
        "daily_price": 500,
        "weekly_price": 3000,
        "monthly_price": 12000
    },
    {
        "id": "423e4567-e89b-12d3-a456-426614174003",
        "name": "Standard Hospital Bed",
        "slug": "standard-hospital-bed",
        "category_id": null,
        "daily_price": null,
        "weekly_price": null,
        "monthly_price": null
    }
]
```

---

### 4. Get Product by Slug (Product Details Page)
```http
GET /api/products/icu-hospital-bed HTTP/1.1
```

**Expected Response (200 OK)**:
```json
{
    "id": "323e4567-e89b-12d3-a456-426614174002",
    "name": "ICU Hospital Bed",
    "slug": "icu-hospital-bed",
    "category_id": "123e4567-e89b-12d3-a456-426614174000",
    "daily_price": 500,
    "weekly_price": 3000,
    "monthly_price": 12000
}
```

---

### 5. Get Products by Category (Category Page)
```http
GET /api/products/category/hospital-beds HTTP/1.1
```

**Expected Response (200 OK)**:
```json
[
    {
        "id": "323e4567-e89b-12d3-a456-426614174002",
        "name": "ICU Hospital Bed",
        "slug": "icu-hospital-bed",
        "category_id": "123e4567-e89b-12d3-a456-426614174000",
        "daily_price": 500,
        "weekly_price": 3000,
        "monthly_price": 12000
    },
    {
        "id": "523e4567-e89b-12d3-a456-426614174004",
        "name": "Standard Hospital Bed",
        "slug": "standard-hospital-bed",
        "category_id": "123e4567-e89b-12d3-a456-426614174000",
        "daily_price": 300,
        "weekly_price": 1800,
        "monthly_price": 7200
    }
]
```

---

## Leads API

### 1. Create Lead (WhatsApp Inquiry)
```http
POST /api/leads HTTP/1.1
Content-Type: application/json

{
    "name": "Rajesh Kumar",
    "phone": "+919876543210",
    "source": "whatsapp",
    "product": "ICU Hospital Bed",
    "page_url": "https://example.com/products/icu-hospital-bed",
    "message": "Interested in renting an ICU bed for 2 months"
}
```

**Expected Response (201 Created)**:
```json
{
    "id": "623e4567-e89b-12d3-a456-426614174005",
    "name": "Rajesh Kumar",
    "phone": "+919876543210",
    "source": "whatsapp",
    "product": "ICU Hospital Bed",
    "page_url": "https://example.com/products/icu-hospital-bed",
    "message": "Interested in renting an ICU bed for 2 months",
    "created_at": "2026-01-27T15:56:43"
}
```

---

### 2. Create Lead (Popup Form)
```http
POST /api/leads HTTP/1.1
Content-Type: application/json

{
    "name": "Priya Sharma",
    "phone": "+919123456789",
    "source": "popup",
    "message": "Please call me with pricing details"
}
```

**Expected Response (201 Created)**:
```json
{
    "id": "723e4567-e89b-12d3-a456-426614174006",
    "name": "Priya Sharma",
    "phone": "+919123456789",
    "source": "popup",
    "product": null,
    "page_url": null,
    "message": "Please call me with pricing details",
    "created_at": "2026-01-27T15:57:00"
}
```

---

### 3. Create Lead (Phone Call)
```http
POST /api/leads HTTP/1.1
Content-Type: application/json

{
    "name": "Amit Patel",
    "phone": "+919999888777",
    "source": "call",
    "product": "Wheelchair",
    "message": "Called to inquire about wheelchair rental"
}
```

---

### 4. Get All Leads
```http
GET /api/leads HTTP/1.1
```

**Expected Response (200 OK)**:
```json
[
    {
        "id": "623e4567-e89b-12d3-a456-426614174005",
        "name": "Rajesh Kumar",
        "phone": "+919876543210",
        "source": "whatsapp",
        "product": "ICU Hospital Bed",
        "page_url": "https://example.com/products/icu-hospital-bed",
        "message": "Interested in renting an ICU bed for 2 months",
        "created_at": "2026-01-27T15:56:43"
    },
    {
        "id": "723e4567-e89b-12d3-a456-426614174006",
        "name": "Priya Sharma",
        "phone": "+919123456789",
        "source": "popup",
        "product": null,
        "page_url": null,
        "message": "Please call me with pricing details",
        "created_at": "2026-01-27T15:57:00"
    }
]
```

---

### 5. Get Specific Lead
```http
GET /api/leads/623e4567-e89b-12d3-a456-426614174005 HTTP/1.1
```

**Expected Response (200 OK)**:
```json
{
    "id": "623e4567-e89b-12d3-a456-426614174005",
    "name": "Rajesh Kumar",
    "phone": "+919876543210",
    "source": "whatsapp",
    "product": "ICU Hospital Bed",
    "page_url": "https://example.com/products/icu-hospital-bed",
    "message": "Interested in renting an ICU bed for 2 months",
    "created_at": "2026-01-27T15:56:43"
}
```

---

## Error Response Examples

### 400 Bad Request - Duplicate Slug
```json
{
    "detail": "(sqlite3.IntegrityError) UNIQUE constraint failed: products.slug\n[SQL: INSERT INTO products ...]"
}
```

### 404 Not Found
```json
{
    "detail": "Product not found"
}
```

### 422 Validation Error - Missing Required Field
```json
{
    "detail": [
        {
            "type": "missing",
            "loc": ["body", "name"],
            "msg": "Field required",
            "input": {
                "slug": "test"
            }
        }
    ]
}
```

---

## Health Check

### Check Server Status
```http
GET / HTTP/1.1
```

**Expected Response (200 OK)**:
```json
{
    "status": "CareSpace backend running"
}
```

---

## HTTP Status Codes Used

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | GET requests successful |
| 201 | Created | POST requests successful |
| 400 | Bad Request | Validation error, duplicate entry |
| 404 | Not Found | Category/Product/Lead not found |
| 500 | Server Error | Unhandled exception |

---

## Testing Workflow

### Scenario 1: Complete Product Listing
1. `POST /api/categories` - Create category
2. `POST /api/products` - Create 3 products with that category
3. `GET /api/products/category/{slug}` - Verify all 3 appear
4. `GET /api/products/{slug}` - Verify individual product

### Scenario 2: Lead Capture
1. `POST /api/leads` - Submit lead from WhatsApp
2. `POST /api/leads` - Submit lead from form
3. `POST /api/leads` - Submit lead from popup
4. `GET /api/leads` - Verify all leads captured

### Scenario 3: E-Commerce Flow
1. User views: `GET /api/categories` → See all categories
2. User clicks category: `GET /api/products/category/hospital-beds` → See products
3. User clicks product: `GET /api/products/icu-hospital-bed` → See details & pricing
4. User inquires: `POST /api/leads` → Capture lead
5. Admin checks: `GET /api/leads` → View all inquiries

---

*Ready to integrate with your frontend!* 🚀
