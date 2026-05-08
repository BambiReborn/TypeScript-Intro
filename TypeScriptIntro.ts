// ============================================
// 1. DEFINE THE TYPES
// ============================================

type User = {
    type: 'user';   // can ONLY be the string 'user'
    name: string;
    age: number;
}

type Admin = {
    type: 'admin';  // can ONLY be the string 'admin'
    name: string;
    role: string;
}

// Person is EITHER a User OR an Admin
// The | symbol means "or"
type Person = User | Admin;


// ============================================
// 2. SAMPLE DATA
// ============================================

// An array of Person — can contain both Users and Admins
const persons: Person[] = [
    { type: 'user', name: 'Alice', age: 25 },
    { type: 'user', name: 'Bob', age: 30 },
    { type: 'admin', name: 'Charlie', role: 'superadmin' },
    { type: 'admin', name: 'Diana', role: 'moderator' },
    { type: 'user', name: 'Eve', age: 22 },
];


// ============================================
// 3. FUNCTION OVERLOAD SIGNATURES
// ============================================

// Overload 1 — when personType is 'user', return User[]
// Partial<Omit<User, 'type'>> means:
// "a partial User object but WITHOUT the type field"
function filterPersons(personType: 'user', criteria: Partial<Omit<User, 'type'>>): User[]

// Overload 2 — when personType is 'admin', return Admin[]
function filterPersons(personType: 'admin', criteria: Partial<Omit<Admin, 'type'>>): Admin[]


// ============================================
// 4. THE ACTUAL IMPLEMENTATION
// ============================================

// This is the real function body
// "Person[]" is used here because this handles BOTH cases
// "Record<string, unknown>" means an object with any string key and any value
// This is safe because overloads above already enforce the strict types
function filterPersons(personType: string, criteria: Record<string, unknown>): Person[] {

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
                return (person as Record<string, unknown>)[key] === criteria[key];
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