
# FilterPersons — TypeScript Function Overloads

A TypeScript implementation demonstrating **Function Overloads**, **Partial Types**, and **Omit Utility Types** using a person filtering system as a use case.

## Description
The system filters a list of persons based on their type, either `user` or `admin`.
TypeScript is smart enough to know the exact return type based on what you pass in,
thanks to function overloads.

## How It Works
1. A shared list of persons contains both `User` and `Admin` objects
2. You call `filterPersons` with a `personType` and a `criteria` object
3. The function first filters by type — users or admins
4. Then filters further by any criteria you provide
5. TypeScript automatically knows whether `User[]` or `Admin[]` is returned

## Types

### User
| Property | Type | Description |
|---|---|---|
| `type` | `'user'` | Identifies the person as a user |
| `name` | `string` | Name of the user |
| `age` | `number` | Age of the user |

### Admin
| Property | Type | Description |
|---|---|---|
| `type` | `'admin'` | Identifies the person as an admin |
| `name` | `string` | Name of the admin |
| `role` | `string` | Role of the admin |

## Function

### filterPersons
Filters the persons list based on type and criteria.

| Argument | Type | Description |
|---|---|---|
| `personType` | `'user'` or `'admin'` | The type of person to filter |
| `criteria` | `Partial<Omit<User, 'type'>>` or `Partial<Omit<Admin, 'type'>>` | Fields to filter by — `type` field is excluded |

**Returns:**
- `User[]` when `personType` is `'user'`
- `Admin[]` when `personType` is `'admin'`

## Usage
```typescript
// Filter users by age
const users = filterPersons('user', { age: 25 });

// Filter admins by role
const admins = filterPersons('admin', { role: 'superadmin' });

// Filter by name
const namedUser = filterPersons('user', { name: 'Bob' });
```

## Concepts Demonstrated
- **Function Overloads** — TypeScript knows the return type based on input
- **Partial\<T\>** — Makes all fields of a type optional
- **Omit\<T, K\>** — Removes a specific field from a type
- **Literal Types** — `type` field can only be `'user'` or `'admin'`
- **Type Guards** — Safely accessing dynamic object keys