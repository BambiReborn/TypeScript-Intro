"use strict";
// ============================================
// 1. DEFINE THE TYPES
// ============================================
// ============================================
// 2. SAMPLE DATA
// ============================================
// An array of Person — can contain both Users and Admins
const persons = [
    { type: 'user', name: 'Alice', age: 25 },
    { type: 'user', name: 'Bob', age: 30 },
    { type: 'admin', name: 'Charlie', role: 'superadmin' },
    { type: 'admin', name: 'Diana', role: 'moderator' },
    { type: 'user', name: 'Eve', age: 22 },
];
// ============================================
// 4. THE ACTUAL IMPLEMENTATION
// ============================================
// This is the real function body
// "Person[]" is used here because this handles BOTH cases
// "Record<string, unknown>" means an object with any string key and any value
// This is safe because overloads above already enforce the strict types
function filterPersons(personType, criteria) {
    // Step 1 — filter by type first (get only users OR only admins)
    return persons
        .filter(person => person.type === personType)
        // Step 2 — then filter by criteria
        // Object.keys(criteria) gets all the keys the user passed in
        // e.g. if criteria is { name: 'Alice' }, keys = ['name']
        .filter(person => {
        return Object.keys(criteria).every(key => {
            // For each key in criteria, check if the person's value matches
            // "as Record<string, unknown>" lets us access person[key] safely
            return person[key] === criteria[key];
        });
    });
}
// ============================================
// 5. TESTING
// ============================================
// TypeScript KNOWS this returns User[]
const users = filterPersons('user', { age: 25 });
console.log(users);
// Output: [{ type: 'user', name: 'Alice', age: 25 }]
// TypeScript KNOWS this returns Admin[]
const admins = filterPersons('admin', { role: 'superadmin' });
console.log(admins);
// Output: [{ type: 'admin', name: 'Charlie', role: 'superadmin' }]
// Filter by name — works for both
const namedUser = filterPersons('user', { name: 'Bob' });
console.log(namedUser);
// Output: [{ type: 'user', name: 'Bob', age: 30 }]
// criteria CANNOT include "type" — TypeScript will yell at you
// const wrong = filterPersons('user', { type: 'user' }); //  TypeScript ERROR
