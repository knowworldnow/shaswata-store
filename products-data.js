// Sample product database
const products = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        price: 999.99,
        category: "electronics",
        description: "Latest iPhone with advanced camera system and A17 Pro chip",
        longDescription: "The iPhone 15 Pro represents the pinnacle of smartphone technology. With its revolutionary A17 Pro chip built on 3-nanometer process, it delivers unprecedented performance and efficiency. The advanced camera system features a 48MP main camera, 12MP ultra-wide, and 12MP telephoto lens with 3x optical zoom. The titanium design makes it both durable and lightweight, while the Action Button provides quick access to your favorite features.",
        icon: "📱",
        features: ["A17 Pro Chip", "48MP Camera System", "Titanium Design", "Action Button", "USB-C"]
    },
    {
        id: 2,
        name: "MacBook Pro M3",
        price: 1999.99,
        category: "electronics",
        description: "Powerful laptop for professionals with M3 chip",
        longDescription: "The MacBook Pro with M3 chip delivers exceptional performance for demanding professional workflows. With up to 22 hours of battery life, a stunning Liquid Retina XDR display, and advanced thermal architecture, it's built for sustained pro performance. The M3 chip features an 8-core CPU and up to 10-core GPU, making it perfect for video editing, 3D rendering, and complex computational tasks.",
        icon: "💻",
        features: ["M3 Chip", "Liquid Retina XDR", "22hr Battery", "Thunderbolt 4", "macOS Sonoma"]
    },
    {
        id: 3,
        name: "Nike Air Max 270",
        price: 129.99,
        category: "clothing",
        description: "Comfortable running shoes with Air Max technology",
        longDescription: "The Nike Air Max 270 features Nike's biggest heel Air unit yet for maximum comfort with every step. The engineered mesh upper provides breathability and flexibility, while the rubber outsole with flex grooves delivers natural motion. Perfect for both athletic activities and casual wear, these shoes combine style with unmatched comfort.",
        icon: "👟",
        features: ["Air Max Technology", "Engineered Mesh", "Rubber Outsole", "Flex Grooves", "All-Day Comfort"]
    },
    {
        id: 4,
        name: "Premium Cotton T-Shirt",
        price: 29.99,
        category: "clothing",
        description: "High-quality 100% cotton t-shirt in multiple colors",
        longDescription: "Crafted from premium 100% organic cotton, this t-shirt offers exceptional comfort and durability. The fabric is pre-shrunk and features a classic fit that looks great on everyone. Available in multiple colors, it's perfect for casual wear or layering. The reinforced seams ensure long-lasting quality, while the soft cotton feels great against your skin.",
        icon: "👕",
        features: ["100% Organic Cotton", "Pre-shrunk", "Classic Fit", "Multiple Colors", "Reinforced Seams"]
    },
    {
        id: 5,
        name: "JavaScript: The Complete Guide",
        price: 39.99,
        category: "books",
        description: "Comprehensive guide to modern JavaScript programming",
        longDescription: "Master JavaScript from fundamentals to advanced concepts with this comprehensive guide. Covering ES6+, async programming, DOM manipulation, and modern frameworks, this book is perfect for both beginners and experienced developers. Includes practical examples, exercises, and real-world projects to reinforce your learning.",
        icon: "📚",
        features: ["ES6+ Coverage", "Practical Examples", "Real Projects", "Advanced Concepts", "Beginner Friendly"]
    },
    {
        id: 6,
        name: "Design Patterns: Elements of Reusable Software",
        price: 49.99,
        category: "books",
        description: "Essential book for software developers and architects",
        longDescription: "This foundational book describes simple and elegant solutions to specific problems in object-oriented software design. Design patterns capture solutions that have developed and evolved over time, helping you choose design alternatives that make your code reusable and flexible. Essential reading for any serious software developer.",
        icon: "📖",
        features: ["23 Design Patterns", "Object-Oriented Design", "Code Examples", "Best Practices", "Software Architecture"]
    },
    {
        id: 7,
        name: "Professional Tennis Racket",
        price: 89.99,
        category: "sports",
        description: "High-quality tennis racket for intermediate to advanced players",
        longDescription: "This professional-grade tennis racket features a graphite composite frame for optimal power and control. With a mid-plus head size and balanced weight distribution, it's perfect for players looking to improve their game. The vibration dampening technology reduces shock, while the open string pattern provides enhanced spin potential.",
        icon: "🎾",
        features: ["Graphite Composite", "Mid-Plus Head", "Vibration Dampening", "Open String Pattern", "Balanced Weight"]
    },
    {
        id: 8,
        name: "Premium Yoga Mat",
        price: 24.99,
        category: "sports",
        description: "Non-slip yoga mat perfect for all types of exercise",
        longDescription: "This premium yoga mat provides exceptional grip and cushioning for all your workout needs. Made from eco-friendly TPE material, it's non-toxic and biodegradable. The 6mm thickness offers perfect balance between comfort and stability, while the non-slip surface ensures safety during intense sessions. Includes a carrying strap for easy transport.",
        icon: "🧘",
        features: ["Eco-Friendly TPE", "6mm Thickness", "Non-Slip Surface", "Carrying Strap", "Easy to Clean"]
    },
    {
        id: 9,
        name: "Wireless Noise-Cancelling Headphones",
        price: 199.99,
        category: "electronics",
        description: "Premium wireless headphones with active noise cancellation",
        longDescription: "Experience superior sound quality with these premium wireless headphones featuring advanced active noise cancellation technology. With up to 30 hours of battery life, quick charge capability, and premium drivers, they deliver exceptional audio performance. The comfortable over-ear design makes them perfect for long listening sessions.",
        icon: "🎧",
        features: ["Active Noise Cancellation", "30hr Battery", "Quick Charge", "Premium Drivers", "Comfortable Design"]
    },
    {
        id: 10,
        name: "Smart Fitness Watch",
        price: 299.99,
        category: "electronics",
        description: "Advanced fitness tracking smart watch with health monitoring",
        longDescription: "Track your fitness goals with this advanced smart watch featuring comprehensive health monitoring capabilities. Monitor heart rate, sleep patterns, stress levels, and over 100 workout modes. With GPS tracking, water resistance, and 7-day battery life, it's the perfect companion for an active lifestyle.",
        icon: "⌚",
        features: ["Health Monitoring", "100+ Workout Modes", "GPS Tracking", "Water Resistant", "7-Day Battery"]
    },
    {
        id: 11,
        name: "Designer Winter Jacket",
        price: 159.99,
        category: "clothing",
        description: "Stylish and warm winter jacket with premium insulation",
        longDescription: "Stay warm and stylish with this premium winter jacket featuring advanced insulation technology and water-resistant fabric. The sleek design combines functionality with fashion, perfect for urban environments. Multiple pockets provide ample storage, while the adjustable hood offers additional protection from the elements.",
        icon: "🧥",
        features: ["Premium Insulation", "Water-Resistant", "Multiple Pockets", "Adjustable Hood", "Urban Design"]
    },
    {
        id: 12,
        name: "The Art of Cooking: Master Chef's Cookbook",
        price: 34.99,
        category: "books",
        description: "Professional cookbook with over 200 delicious recipes",
        longDescription: "Discover the secrets of professional cooking with this comprehensive cookbook featuring over 200 carefully tested recipes. From basic techniques to advanced culinary arts, this book covers everything you need to become a master chef. Includes beautiful photography, step-by-step instructions, and expert tips from renowned chefs.",
        icon: "👨‍🍳",
        features: ["200+ Recipes", "Step-by-Step Instructions", "Beautiful Photography", "Expert Tips", "All Skill Levels"]
    }
];

// Function to get product by ID
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

// Function to get products by category
function getProductsByCategory(category) {
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
}

// Function to search products
function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.longDescription.toLowerCase().includes(searchTerm)
    );
}
