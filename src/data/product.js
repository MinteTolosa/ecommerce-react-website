const products = [
    {
        id: 1,
        name: "Apple AirPods Max",
        price: 549.99,
        image: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/1.webp",
        description:
            "Premium over-ear wireless headphones with high-fidelity audio, active noise cancellation, and a comfortable design."
    },
    {
        id: 2,
        name: "Apple AirPods Pro",
        price: 249.99,
        image: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-pro/1.webp",
        description:
            "Wireless earbuds featuring active noise cancellation, immersive audio, and a compact charging case."
    },
    {
        id: 3,
        name: "Samsung Galaxy Buds",
        price: 129.99,
        image: "https://cdn.dummyjson.com/product-images/mobile-accessories/samsung-galaxy-buds/1.webp",
        description:
            "Compact wireless earbuds designed for clear audio, comfortable everyday listening, and easy Bluetooth connectivity."
    },
    {
        id: 4,
        name: "Apple iPhone 14",
        price: 799.99,
        image: "https://cdn.dummyjson.com/product-images/smartphones/iphone-13/1.webp",
        description:
            "Modern smartphone with a high-quality display, advanced cameras, fast performance, and a premium design."
    },
    {
        id: 5,
        name: "Samsung Galaxy S23",
        price: 699.99,
        image: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s23/1.webp",
        description:
            "Powerful Android smartphone with a vibrant display, advanced camera system, and fast mobile performance."
    },
    {
        id: 6,
        name: "MacBook Pro",
        price: 1599.99,
        image: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp",
        description:
            "High-performance laptop built for demanding work, creative applications, programming, and everyday productivity."
    },
    {
        id: 7,
        name: "Dell XPS 15",
        price: 1499.99,
        image: "https://cdn.dummyjson.com/product-images/laptops/dell-xps-15/1.webp",
        description:
            "Premium Windows laptop combining powerful performance, a sharp display, and a sleek portable design."
    },
    {
        id: 8,
        name: "Samsung Galaxy Tab",
        price: 499.99,
        image: "https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8/1.webp",
        description:
            "Versatile tablet with a large display, fast performance, and a portable design for entertainment and productivity."
    },
    {
        id: 9,
        name: "Smart LED TV",
        price: 699.99,
        image: "https://cdn.dummyjson.com/product-images/1/1.jpg",
        description:
            "Large-screen smart television designed for streaming movies, shows, sports, and other entertainment."
    },
    {
        id: 10,
        name: "Bluetooth Speaker",
        price: 89.99,
        image: "https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-dot/1.webp",
        description:
            "Compact wireless speaker with Bluetooth connectivity for convenient music and audio playback."
    },
    {
        id: 11,
        name: "Smart Watch",
        price: 199.99,
        image: "https://cdn.dummyjson.com/product-images/mens-watches/iwc-ingenieur-automatic-steel/1.webp",
        description:
            "Stylish wearable device designed for everyday use with a modern display and convenient smart features."
    },
    {
        id: 12,
        name: "Wireless Charger",
        price: 39.99,
        image: "https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-dot/1.webp",
        description:
            "Convenient wireless charging accessory designed to provide an easy way to charge compatible devices."
    }
];

export function getProducts() {
    return products;
}

export function  getProductById(id){
    return products.find((p) => p.id === Number(id));
}