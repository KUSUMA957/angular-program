"use strict";
// Filter + Sort Function (JS & TS)
// Given an array of product objects:
// TypeScript[  { id: 1, title: "Phone", price: 15000 },  { id: 2, title: "Laptop", price: 60000 },  { id: 3, title: "Mouse", price: 800 }] 
// Tasks:
// Write TypeScript type/interface for Product.
Object.defineProperty(exports, "__esModule", { value: true });
const products = [
    { id: 1, title: "Phone", price: 15000 },
    { id: 2, title: "Laptop", price: 60000 },
    { id: 3, title: "Mouse", price: 800 }
];
function filterAndSortProducts(products, minPrice, maxPrice) {
    return products
        .filter(p => p.price >= minPrice && p.price <= maxPrice) // filtering
        .sort((a, b) => a.price - b.price); // sorting ascending
}
const result = filterAndSortProducts(products, 1000, 50000);
console.log(result);
