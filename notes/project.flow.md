![alt text](mermaid-diagram.png)

# 📦 StockPilot – Inventory & Order Management System (OMS)

A production-grade Inventory & Order Management System built with:

* React
* Apollo Client
* TanStack Query
* Express.js
* Apollo Server
* MongoDB
* Zod

Designed with **Clean Architecture**, **Transactional Safety**, and **Production Deployment Strategy** in mind.

---

# 🧭 Order Creation Architecture Flow

This document explains the complete lifecycle of the `createOrder` operation.

---

## 🔁 High-Level Layered Flow

```
UI
 ↓
Custom Hook
 ↓
Apollo Client
 ↓
GraphQL Resolver
 ↓
Order Service (Domain Layer)
 ↓
Product Service
 ↓
Repository Layer
 ↓
MongoDB (Transaction)
```

---

# 🚀 Order Creation – Detailed Flow

---

## 1️⃣ Interaction Layer — React UI

**Component:** `CreateOrderForm.tsx`

### Responsibilities:

* Collect order data (cart items)
* Trigger `handleCreateOrder`
* Manage UI loading state
* Show success/error feedback

### Flow:

* User clicks **Place Order**
* Local state → `loading = true`
* Calls `useCreateOrder()` hook

---

## 2️⃣ Logic Layer — Custom Hook

**File:** `useCreateOrder.ts`

### Responsibilities:

* Pre-validate inputs:

  * Cart is not empty
  * Quantity > 0
* Prepare GraphQL mutation payload
* Call Apollo `useMutation`
* Optionally perform Optimistic UI update

### Important:

✔ Frontend validation only
❌ No business validation here

---

## 3️⃣ Transport Layer — Apollo Client

Sends GraphQL mutation to backend.

```graphql
mutation CreateOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    id
    orderNumber
    totalAmount
    status
  }
}
```

### Optional: Optimistic UI

The UI can temporarily display:

```json
{
  "status": "pending"
}
```

Until server confirms.

---

## 4️⃣ Gateway Layer — GraphQL Resolver

### Responsibilities:

* Parse input
* Validate input via Zod
* Call `orderService.createOrder()`
* Catch and format errors
* Return structured response

### Strict Rule:

Resolvers must:

* ❌ Not access database directly
* ❌ Not implement business logic

They act as **orchestrators only**.

---

## 5️⃣ Domain Layer — Order Service (Business Brain)

This is where the core logic resides.

### Responsibilities:

1. Start MongoDB session
2. Start transaction
3. Fetch product details
4. Validate stock availability
5. Calculate total amount
6. Create Order document
7. Update product stock
8. Commit transaction
9. Return created order

### Failure Handling:

If any step fails → `abortTransaction()`

Ensures atomicity.

---

## 6️⃣ Integration Layer — Product Service

### Responsibilities:

* Fetch products using `$in` query
* Validate stock for each item
* Prepare stock decrement operations
* Throw error if insufficient stock

### No Database Mapping Logic Here

Only business validation.

---

## 7️⃣ Persistence Layer — Repository Layer

### Responsibilities:

* Execute MongoDB queries
* Attach session to queries
* Use `.lean()` for read operations
* Use projections to limit fields
* Perform `bulkWrite` for stock updates

### Performance Pattern:

Instead of multiple updates:

```js
bulkWrite([
  { updateOne: { filter, update } }
])
```

Efficient and scalable.

---

## 8️⃣ Database Layer — MongoDB

### Transaction Operations:

Inside one transaction:

* Insert Order document
* Update multiple Product stock fields

### Important:

MongoDB transactions require a **Replica Set**.

For local development:

* Enable single-node replica set

For production (e.g., Render deployment):

* Use MongoDB Atlas (replica set enabled by default)

---

## 9️⃣ Response Cycle

```
Order Service
 ↓
Resolver
 ↓
Apollo Client
 ↓
InMemoryCache Update
 ↓
React Re-render
```

### UI Updates:

* `loading = false`
* Success toast
* Order list updates automatically

---

# ⚡ Performance Considerations

### 1️⃣ Single Product Fetch

Use:

```js
{ _id: { $in: productIds } }
```

Instead of multiple queries.

---

### 2️⃣ Field Projection

Only fetch:

* stock
* price

Avoid unnecessary fields.

---

### 3️⃣ Bulk Stock Update

Use `bulkWrite()` instead of individual updates.

---

### 4️⃣ Index Strategy

Products:

* `sku` (unique)
* `category`
* `stock`

Orders:

* `orderNumber` (unique)
* `status`
* `createdAt`
* Compound: `(status + createdAt)`

---

# 🛡 Transaction Strategy

We follow:

### A) Fully Transactional Strict Consistency

Ensures:

* No partial writes
* No stock mismatch
* No phantom orders
* Atomic multi-document safety

This is production-grade consistency.

---

# 🏗 Clean Architecture Principles Followed

* Separation of Concerns
* Layer Isolation
* Single Responsibility
* Transactional Safety
* Performance Optimization
* Production Deployment Compatibility

---

# 🚀 Deployment Strategy

Designed for single-repo deployment on Render

Backend:

* Serves GraphQL API
* Serves frontend static build

Single service deployment.

---

# 📌 Next Step

If confirmed, next documentation section will be:

## 👉 MongoDB Transaction Design Strategy (Deep Dive)

* Session lifecycle
* Error handling patterns
* Retry strategy
* Edge cases
* Concurrency discussion

---

Reply:

**Proceed to Transaction Deep Dive**

and we move to the next advanced section 🔥
