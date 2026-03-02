<img width="972" height="646" alt="image" src="https://github.com/user-attachments/assets/db785b46-6ba9-4f4c-94cd-b56cd3eb6a42" />

---

# 🔷 1️⃣ `type User` ka kya matlab hai?

```js
type User {
  id: ID!
  name: String!
  email: String!
}
```

Ye GraphQL ko batata hai:

👉 "User object ka structure kya hoga"

Matlab agar client `users` query karega, toh response me:

* id milega
* name milega
* email milega

`!` ka matlab:

* Field required hai (null nahi hoga)

---

# 🔷 2️⃣ `type Query` kya hota hai?

```js
type Query {
  users: [User!]!
}
```

GraphQL me **Query entry point hota hai**.

Ye bol raha hai:

👉 Ek query available hai jiska naam `users` hai
👉 Wo array return karegi
👉 Array me User objects honge

Matlab client ye likh sakta hai:

```graphql
{
  users {
    name
  }
}
```

---

# 🔷 3️⃣ `userResolver` kya karta hai?

```js
export const userResolver = {
  Query: {
    users: async () => {
      return [
        { id: "1", name: "Chandan", email: "chandan@test.com" }
      ];
    }
  }
};
```

Schema sirf batata hai:
👉 kya available hai

Resolver batata hai:
👉 data kaise milega

Flow:

Client → `users` query
GraphQL → userResolver.Query.users
Ye function run hota hai
Data return hota hai

Abhi hum static data return kar rahe hain.

Baad me:

```js
return await UserModel.find()
```

use karenge.

---

# 🔷 4️⃣ `extend type Query` kyun use kiya?

```js
extend type Query {
  stocks: [Stock!]!
}
```

Ye sabse important concept hai 🔥

Hum modular system bana rahe hain.

Agar har module me likhte:

```js
type Query { ... }
```

Toh error aata:
❌ "Query already defined"

Isliye:

* User module ne `type Query` define kiya
* Stock module ne `extend type Query` use kiya

`extend` ka matlab:
👉 Pehle se existing Query ko aur fields add karo

Matlab final Query ban gayi:

```graphql
type Query {
  users: [User!]!
  stocks: [Stock!]!
}
```

Automatically merge ho gaya 🔥

---

# 🔷 5️⃣ `stockResolver` ka matlab

```js
export const stockResolver = {
  Query: {
    stocks: async () => {
      return [
        { id: "1", name: "Apple", price: 180.5 }
      ];
    }
  }
};
```

Same logic:

Client → stocks
Resolver → data return

---

# 🔥 Ab pura flow samjho (Important)

1️⃣ Client query bhejta hai

```
{
  users { name }
  stocks { name }
}
```

2️⃣ Apollo Server receive karta hai

3️⃣ Wo merged typeDefs dekhta hai

4️⃣ Wo merged resolvers dekhta hai

5️⃣ Users ke liye userResolver run karta hai
6️⃣ Stocks ke liye stockResolver run karta hai

7️⃣ Combined response return karta hai

---
