// Filter + Sort Function (JS & TS)
// Given an array of product objects:
// TypeScript[  { id: 1, title: "Phone", price: 15000 },  { id: 2, title: "Laptop", price: 60000 },  { id: 3, title: "Mouse", price: 800 }] 
// Tasks:
// Write TypeScript type/interface for Product.
 
// Write a function that:
// Filters products between minPrice and maxPrice
// Sorts the filtered products by price (ascending)
 
// Focus Areas:
// Array filtering
// Sorting
// Object typing
// Building logic used in Angular Pipes

//Typing array of products
type Product = {
    id:number;
    title:string;
    price:number;
}  
 
const products:Product[] = [
    { id: 1, title: "Phone", price: 15000 },  
    { id: 2, title: "Laptop", price: 60000 },  
    { id: 3, title: "Mouse", price: 800 }
];  
 
function filterAndSortProducts(
    products: Product[],
    minPrice: number,
    maxPrice: number
): Product[] {
    return products
        .filter(p => p.price >= minPrice && p.price <= maxPrice) // filtering
        .sort((a, b) => a.price - b.price);                     // sorting ascending
}

const result = filterAndSortProducts(products, 1000, 50000);
console.log(result);
