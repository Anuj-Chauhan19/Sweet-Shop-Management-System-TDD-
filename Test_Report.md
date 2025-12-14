# 📊 Test Execution Report

**Project:** Sweet Shop Management System
**Date:** December 14, 2025
**Framework:** Jest & Supertest
**Environment:** Node.js v18.x / MongoDB Memory Server
**Total Tests:** 52
**Status:** ✅ **PASSED**

---

## 🟢 Executive Summary

All 6 test suites were executed successfully with no failures. The test coverage includes Model Schema validation and full Integration testing of all API endpoints.

| Metric | Result |
| :--- | :--- |
| **Test Suites** | **6 passed**, 6 total |
| **Tests** | **52 passed**, 52 total |
| **Snapshots** | 0 total |
| **Execution Time** | 23.23 s |
| **Final Status** | ✅ **100% Success** |

---

## 📝 Detailed Test Scope

### 1. Integration Tests (API Endpoints)
> End-to-end verification of HTTP routes, Controllers, and Database interactions.

#### **🅰️ Authentication Module (`src/tests/integration/auth.test.js`)**
| Method | Endpoint | Test Case Description |
| :--- | :--- | :--- |
| **POST** | `/api/auth/register` | ✅ Should register a new user successfully (201 Created). |
| **POST** | `/api/auth/register` | ✅ Should fail if email already exists (400 Bad Request). |
| **POST** | `/api/auth/register` | ✅ Should validate missing fields (username/password). |
| **POST** | `/api/auth/login` | ✅ Should login with valid credentials & return JWT. |
| **POST** | `/api/auth/login` | ✅ Should reject invalid password or email (401 Unauthorized). |

#### **🅱️ Sweets Inventory Module (`src/tests/integration/sweets.test.js`)**
| Method | Endpoint | Test Case Description |
| :--- | :--- | :--- |
| **GET** | `/api/sweets` | ✅ Should return an empty array initially. |
| **POST** | `/api/sweets` | ✅ [Admin] Should create a new sweet successfully. |
| **POST** | `/api/sweets` | ✅ [User] Should return 403 Forbidden for non-admins. |
| **GET** | `/api/sweets/search` | ✅ Should filter sweets by query name (e.g., "Chocolate"). |
| **GET** | `/api/sweets/search` | ✅ Should filter sweets by category. |
| **POST** | `/api/sweets/:id/purchase` | ✅ Should decrease stock quantity by 1 upon purchase. |
| **POST** | `/api/sweets/:id/purchase` | ✅ Should fail if item is out of stock (Qty: 0). |
| **POST** | `/api/sweets/:id/restock` | ✅ [Admin] Should increase stock quantity. |
| **DELETE** | `/api/sweets/:id` | ✅ [Admin] Should delete a sweet from database. |

---

### 2. Model Unit Tests (Schema Validation)
> Verifies Mongoose schema rules, types, and required fields.

* **`src/tests/models/sweet.test.js`**
    * ✅ Validates `name` (String, Required).
    * ✅ Validates `price` (Number, Min: 0).
    * ✅ Validates `category` (Enum: Chocolate, Gummy, etc.).
    * ✅ Validates `quantity` (Number, Default: 0).
* **`src/tests/models/user.test.js`**
    * ✅ Validates `email` format and uniqueness.
    * ✅ Validates `role` (Enum: 'user', 'admin').
    * ✅ Encrypts password before saving.

### 3. Middleware & Utility Tests
> Low-level verification of internal logic.

* **`src/tests/middleware/auth.test.js`**
    * ✅ `protect()`: Returns 401 if Authorization header is missing.
    * ✅ `admin()`: Returns 403 if user role is not 'admin'.
* **`src/tests/utils/jwt.test.js`**
    * ✅ Generates valid JWT token.
    * ✅ Verifies token payload.

---

## Images of Tests

<img width="861" height="818" alt="Screenshot 2025-12-14 220256" src="https://github.com/user-attachments/assets/3c05bd1e-d1bc-4079-b852-8163926d3d0a" />
<img width="678" height="756" alt="Screenshot 2025-12-14 220305" src="https://github.com/user-attachments/assets/7f2cd25a-47e5-454a-b3b0-1ed52b3fc887" />
<img width="696" height="753" alt="Screenshot 2025-12-14 220313" src="https://github.com/user-attachments/assets/0a652e32-60ec-4a47-84c7-4eec6e1625da" />
<img width="610" height="778" alt="Screenshot 2025-12-14 220320" src="https://github.com/user-attachments/assets/b1b2f5cc-e63a-4dee-9fdc-0ea8207377cf" />
<img width="1077" height="538" alt="Screenshot 2025-12-14 220034" src="https://github.com/user-attachments/assets/285807c7-aca7-4daa-994a-e78a53e6ad0b" />
<img width="652" height="843" alt="Screenshot 2025-12-14 220341" src="https://github.com/user-attachments/assets/0af04619-a881-41f8-9d0a-2d31804b52b8" />




## 🖥️ Raw Execution Log

```bash
 PASS  src/tests/models/sweet.test.js (11.313 s)
 PASS  src/tests/models/user.test.js (12.111 s)
 PASS  src/tests/middleware/auth.test.js
 PASS  src/tests/utils/jwt.test.js
 PASS  src/tests/integration/auth.test.js (7.581 s)
 PASS  src/tests/integration/sweets.test.js (8.908 s)

Test Suites: 6 passed, 6 total
Tests:       52 passed, 52 total
Snapshots:   0 total
Time:        23.23 s
Ran all test suites.
