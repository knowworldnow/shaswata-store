// API endpoint for products
export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  
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
        features: ["A17 Pro Chip", "48MP Camera System", "Titanium Design", "Action Button", "USB-C"],
        stock: 25,
        createdAt: "2025-01-01T00:00:00Z"
      },
      {
        id: 2,
        name: "MacBook Pro M3",
        price: 1999.99,
        category: "electronics",
        description: "Powerful laptop for professionals with M3 chip",
        longDescription: "The MacBook Pro with M3 chip delivers exceptional performance for demanding professional workflows. With up to 22 hours of battery life, a stunning Liquid Retina XDR display, and advanced thermal architecture, it's built for sustained pro performance. The M3 chip features an 8-core CPU and up to 10-core GPU, making it perfect for video editing, 3D rendering, and complex computational tasks.",
        icon: "💻",
        features: ["M3 Chip", "Liquid Retina XDR", "22hr Battery", "Thunderbolt 4", "macOS Sonoma"],
        stock: 15,
        createdAt: "2025-01-01T00:00:00Z"
      },
      {
        id: 3,
        name: "Nike Air Max 270",
        price: 129.99,
        category: "clothing",
        description: "Comfortable running shoes with Air Max technology",
        longDescription: "The Nike Air Max 270 features Nike's biggest heel Air unit yet for maximum comfort with every step. The engineered mesh upper provides breathability and flexibility, while the rubber outsole with flex grooves delivers natural motion. Perfect for both athletic activities and casual wear, these shoes combine style with unmatched comfort.",
        icon: "👟",
        features: ["Air Max Technology", "Engineered Mesh", "Rubber Outsole", "Flex Grooves", "All-Day Comfort"],
        stock: 50,
        createdAt: "2025-01-01T00:00:00Z"
      },
      {
        id: 4,
        name: "Premium Cotton T-Shirt",
        price: 29.99,
        category: "clothing",
        description: "High-quality 100% cotton t-shirt in multiple colors",
        longDescription: "Crafted from premium 100% organic cotton, this t-shirt offers exceptional comfort and durability. The fabric is pre-shrunk and features a classic fit that looks great on everyone. Available in multiple colors, it's perfect for casual wear or layering. The reinforced seams ensure long-lasting quality, while the soft cotton feels great against your skin.",
        icon: "👕",
        features: ["100% Organic Cotton", "Pre-shrunk", "Classic Fit", "Multiple Colors", "Reinforced Seams"],
        stock: 100,
        createdAt: "2025-01-01T00:00:00Z"
      },
      {
        id: 5,
        name: "JavaScript: The Complete Guide",
        price: 39.99,
        category: "books",
        description: "Comprehensive guide to modern JavaScript programming",
        longDescription: "Master JavaScript from fundamentals to advanced concepts with this comprehensive guide. Covering ES6+, async programming, DOM manipulation, and modern frameworks, this book is perfect for both beginners and experienced developers. Includes practical examples, exercises, and real-world projects to reinforce your learning.",
        icon: "📚",
        features: ["ES6+ Coverage", "Practical Examples", "Real Projects", "Advanced Concepts", "Beginner Friendly"],
        stock: 75,
        createdAt: "2025-01-01T00:00:00Z"
      },
      {
        id: 6,
        name: "Design Patterns: Elements of Reusable Software",
        price: 49.99,
        category: "books",
        description: "Essential book for software developers and architects",
        longDescription: "This foundational book describes simple and elegant solutions to specific problems in object-oriented software design. Design patterns capture solutions that have developed and evolved over time, helping you choose design alternatives that make your code reusable and flexible. Essential reading for any serious software developer.",
        icon: "📖",
        features: ["23 Design Patterns", "Object-Oriented Design", "Code Examples", "Best Practices", "Software Architecture"],
        stock: 40,
        createdAt: "2025-01-01T00:00:00Z"
      },
      {
        id: 7,
        name: "Professional Tennis Racket",
        price: 89.99,
        category: "sports",
        description: "High-quality tennis racket for intermediate to advanced players",
        longDescription: "This professional-grade tennis racket features a graphite composite frame for optimal power and control. With a mid-plus head size and balanced weight distribution, it's perfect for players looking to improve their game. The vibration dampening technology reduces shock, while the open string pattern provides enhanced spin potential.",
        icon: "🎾",
        features: ["Graphite Composite", "Mid-Plus Head", "Vibration Dampening", "Open String Pattern", "Balanced Weight"],
        stock: 30,
        createdAt: "2025-01-01T00:00:00Z"
      },
      {
        id: 8,
        name: "Premium Yoga Mat",
        price: 24.99,
        category: "sports",
        description: "Non-slip yoga mat perfect for all types of exercise",
        longDescription: "This premium yoga mat provides exceptional grip and cushioning for all your workout needs. Made from eco-friendly TPE material, it's non-toxic and biodegradable. The 6mm thickness offers perfect balance between comfort and stability, while the non-slip surface ensures safety during intense sessions. Includes a carrying strap for easy transport.",
        icon: "🧘",
        features: ["Eco-Friendly TPE", "6mm Thickness", "Non-Slip Surface", "Carrying Strap", "Easy to Clean"],
        stock: 80,
        createdAt: "2025-01-01T00:00:00Z"
      },
      {
        id: 9,
        name: "Wireless Noise-Cancelling Headphones",
        price: 199.99,
        category: "electronics",
        description: "Premium wireless headphones with active noise cancellation",
        longDescription: "Experience superior sound quality with these premium wireless headphones featuring advanced active noise cancellation technology. With up to 30 hours of battery life, quick charge capability, and premium drivers, they deliver exceptional audio performance. The comfortable over-ear design makes them perfect for long listening sessions.",
        icon: "🎧",
        features: ["Active Noise Cancellation", "30hr Battery", "Quick Charge", "Premium Drivers", "Comfortable Design"],
        stock: 35,
        createdAt: "2025-01-01T00:00:00Z"
      },
      {
        id: 10,
        name: "Smart Fitness Watch",
        price: 299.99,
        category: "electronics",
        description: "Advanced fitness tracking smart watch with health monitoring",
        longDescription: "Track your fitness goals with this advanced smart watch featuring comprehensive health monitoring capabilities. Monitor heart rate, sleep patterns, stress levels, and over 100 workout modes. With GPS tracking, water resistance, and 7-day battery life, it's the perfect companion for an active lifestyle.",
        icon: "⌚",
        features: ["Health Monitoring", "100+ Workout Modes", "GPS Tracking", "Water Resistant", "7-Day Battery"],
        stock: 20,
        createdAt: "2025-01-01T00:00:00Z"
      },
      {
        id: 11,
        name: "Designer Winter Jacket",
        price: 159.99,
        category: "clothing",
        description: "Stylish and warm winter jacket with premium insulation",
        longDescription: "Stay warm and stylish with this premium winter jacket featuring advanced insulation technology and water-resistant fabric. The sleek design combines functionality with fashion, perfect for urban environments. Multiple pockets provide ample storage, while the adjustable hood offers additional protection from the elements.",
        icon: "🧥",
        features: ["Premium Insulation", "Water-Resistant", "Multiple Pockets", "Adjustable Hood", "Urban Design"],
        stock: 25,
        createdAt: "2025-01-01T00:00:00Z"
      },
      {
        id: 12,
        name: "The Art of Cooking: Master Chef's Cookbook",
        price: 34.99,
        category: "books",
        description: "Professional cookbook with over 200 delicious recipes",
        longDescription: "Discover the secrets of professional cooking with this comprehensive cookbook featuring over 200 carefully tested recipes. From basic techniques to advanced culinary arts, this book covers everything you need to become a master chef. Includes beautiful photography, step-by-step instructions, and expert tips from renowned chefs.",
        icon: "👨‍🍳",
        features: ["200+ Recipes", "Step-by-Step Instructions", "Beautiful Photography", "Expert Tips", "All Skill Levels"],
        stock: 60,
        createdAt: "2025-01-01T00:00:00Z"
      }
    ];
  
    const { method } = req;
    const { id, category, search, limit } = req.query;
  
    try {
      switch (method) {
        case 'GET':
          if (id) {
            // Get single product
            const product = products.find(p => p.id === parseInt(id));
            if (!product) {
              return res.status(404).json({ error: 'Product not found' });
            }
            return res.status(200).json(product);
          }
  
          let filteredProducts = [...products];
  
          // Filter by category
          if (category && category !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.category === category);
          }
  
          // Search functionality
          if (search) {
            const searchTerm = search.toLowerCase();
            filteredProducts = filteredProducts.filter(p =>
              p.name.toLowerCase().includes(searchTerm) ||
              p.description.toLowerCase().includes(searchTerm) ||
              p.longDescription.toLowerCase().includes(searchTerm) ||
              p.category.toLowerCase().includes(searchTerm)
            );
          }
  
          // Limit results
          if (limit) {
            filteredProducts = filteredProducts.slice(0, parseInt(limit));
          }
  
          return res.status(200).json({
            products: filteredProducts,
            total: filteredProducts.length,
            timestamp: new Date().toISOString()
          });
  
        case 'POST':
          // Add new product (admin functionality)
          const newProduct = {
            id: Math.max(...products.map(p => p.id)) + 1,
            ...req.body,
            createdAt: new Date().toISOString()
          };
          
          // In a real app, this would be saved to a database
          return res.status(201).json({
            message: 'Product created successfully',
            product: newProduct
          });
  
        default:
          return res.status(405).json({ error: 'Method not allowed' });
      }
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ 
        error: 'Internal server error',
        message: error.message 
      });
    }
  }