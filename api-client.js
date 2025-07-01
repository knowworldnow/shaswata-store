// API client for frontend-backend communication
class ApiClient {
    constructor() {
      // Use current domain in production, localhost for development
      this.baseURL = window.location.hostname === 'localhost' 
        ? 'http://localhost:3000' 
        : window.location.origin;
    }
  
    async request(endpoint, options = {}) {
      const url = `${this.baseURL}/api${endpoint}`;
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      };
  
      if (config.body && typeof config.body === 'object') {
        config.body = JSON.stringify(config.body);
      }
  
      try {
        const response = await fetch(url, config);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
  
        return await response.json();
      } catch (error) {
        console.error('API request failed:', error);
        throw error;
      }
    }
  
    // Products API
    async getProducts(params = {}) {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/products?${queryString}` : '/products';
      return this.request(endpoint);
    }
  
    async getProduct(id) {
      return this.request(`/products?id=${id}`);
    }
  
    async createProduct(productData) {
      return this.request('/products', {
        method: 'POST',
        body: productData,
      });
    }
  
    // Orders API
    async getOrders() {
      return this.request('/orders');
    }
  
    async getOrder(orderNumber) {
      return this.request(`/orders?id=${orderNumber}`);
    }
  
    async createOrder(orderData) {
      return this.request('/orders', {
        method: 'POST',
        body: orderData,
      });
    }
  
    async updateOrder(orderNumber, updateData) {
      return this.request(`/orders?id=${orderNumber}`, {
        method: 'PUT',
        body: updateData,
      });
    }
  
    // Contact API
    async getContactMessages() {
      return this.request('/contact');
    }
  
    async getContactMessage(messageId) {
      return this.request(`/contact?id=${messageId}`);
    }
  
    async submitContactMessage(messageData) {
      return this.request('/contact', {
        method: 'POST',
        body: messageData,
      });
    }
  
    async updateContactMessage(messageId, updateData) {
      return this.request(`/contact?id=${messageId}`, {
        method: 'PUT',
        body: updateData,
      });
    }
  }
  
  // Create global instance
  const apiClient = new ApiClient();
  
  // Fallback products data for offline mode
  const fallbackProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: 999.99,
      category: "electronics",
      description: "Latest iPhone with advanced camera system and A17 Pro chip",
      longDescription: "The iPhone 15 Pro represents the pinnacle of smartphone technology. With its revolutionary A17 Pro chip built on 3-nanometer process, it delivers unprecedented performance and efficiency.",
      icon: "📱",
      features: ["A17 Pro Chip", "48MP Camera System", "Titanium Design", "Action Button", "USB-C"]
    },
    {
      id: 2,
      name: "MacBook Pro M3",
      price: 1999.99,
      category: "electronics",
      description: "Powerful laptop for professionals with M3 chip",
      longDescription: "The MacBook Pro with M3 chip delivers exceptional performance for demanding professional workflows. With up to 22 hours of battery life, a stunning Liquid Retina XDR display, and advanced thermal architecture.",
      icon: "💻",
      features: ["M3 Chip", "Liquid Retina XDR", "22hr Battery", "Thunderbolt 4", "macOS Sonoma"]
    },
    {
      id: 3,
      name: "Nike Air Max 270",
      price: 129.99,
      category: "clothing",
      description: "Comfortable running shoes with Air Max technology",
      longDescription: "The Nike Air Max 270 features Nike's biggest heel Air unit yet for maximum comfort with every step. The engineered mesh upper provides breathability and flexibility.",
      icon: "👟",
      features: ["Air Max Technology", "Engineered Mesh", "Rubber Outsole", "Flex Grooves", "All-Day Comfort"]
    },
    {
      id: 4,
      name: "Premium Cotton T-Shirt",
      price: 29.99,
      category: "clothing",
      description: "High-quality 100% cotton t-shirt in multiple colors",
      longDescription: "Crafted from premium 100% organic cotton, this t-shirt offers exceptional comfort and durability. The fabric is pre-shrunk and features a classic fit.",
      icon: "👕",
      features: ["100% Organic Cotton", "Pre-shrunk", "Classic Fit", "Multiple Colors", "Reinforced Seams"]
    },
    {
      id: 5,
      name: "JavaScript: The Complete Guide",
      price: 39.99,
      category: "books",
      description: "Comprehensive guide to modern JavaScript programming",
      longDescription: "Master JavaScript from fundamentals to advanced concepts with this comprehensive guide. Covering ES6+, async programming, DOM manipulation, and modern frameworks.",
      icon: "📚",
      features: ["ES6+ Coverage", "Practical Examples", "Real Projects", "Advanced Concepts", "Beginner Friendly"]
    },
    {
      id: 6,
      name: "Design Patterns: Elements of Reusable Software",
      price: 49.99,
      category: "books",
      description: "Essential book for software developers and architects",
      longDescription: "This foundational book describes simple and elegant solutions to specific problems in object-oriented software design. Design patterns capture solutions that have developed and evolved over time.",
      icon: "📖",
      features: ["23 Design Patterns", "Object-Oriented Design", "Code Examples", "Best Practices", "Software Architecture"]
    },
    {
      id: 7,
      name: "Professional Tennis Racket",
      price: 89.99,
      category: "sports",
      description: "High-quality tennis racket for intermediate to advanced players",
      longDescription: "This professional-grade tennis racket features a graphite composite frame for optimal power and control. With a mid-plus head size and balanced weight distribution.",
      icon: "🎾",
      features: ["Graphite Composite", "Mid-Plus Head", "Vibration Dampening", "Open String Pattern", "Balanced Weight"]
    },
    {
      id: 8,
      name: "Premium Yoga Mat",
      price: 24.99,
      category: "sports",
      description: "Non-slip yoga mat perfect for all types of exercise",
      longDescription: "This premium yoga mat provides exceptional grip and cushioning for all your workout needs. Made from eco-friendly TPE material, it's non-toxic and biodegradable.",
      icon: "🧘",
      features: ["Eco-Friendly TPE", "6mm Thickness", "Non-Slip Surface", "Carrying Strap", "Easy to Clean"]
    },
    {
      id: 9,
      name: "Wireless Noise-Cancelling Headphones",
      price: 199.99,
      category: "electronics",
      description: "Premium wireless headphones with active noise cancellation",
      longDescription: "Experience superior sound quality with these premium wireless headphones featuring advanced active noise cancellation technology. With up to 30 hours of battery life.",
      icon: "🎧",
      features: ["Active Noise Cancellation", "30hr Battery", "Quick Charge", "Premium Drivers", "Comfortable Design"]
    },
    {
      id: 10,
      name: "Smart Fitness Watch",
      price: 299.99,
      category: "electronics",
      description: "Advanced fitness tracking smart watch with health monitoring",
      longDescription: "Track your fitness goals with this advanced smart watch featuring comprehensive health monitoring capabilities. Monitor heart rate, sleep patterns, stress levels.",
      icon: "⌚",
      features: ["Health Monitoring", "100+ Workout Modes", "GPS Tracking", "Water Resistant", "7-Day Battery"]
    },
    {
      id: 11,
      name: "Designer Winter Jacket",
      price: 159.99,
      category: "clothing",
      description: "Stylish and warm winter jacket with premium insulation",
      longDescription: "Stay warm and stylish with this premium winter jacket featuring advanced insulation technology and water-resistant fabric. The sleek design combines functionality with fashion.",
      icon: "🧥",
      features: ["Premium Insulation", "Water-Resistant", "Multiple Pockets", "Adjustable Hood", "Urban Design"]
    },
    {
      id: 12,
      name: "The Art of Cooking: Master Chef's Cookbook",
      price: 34.99,
      category: "books",
      description: "Professional cookbook with over 200 delicious recipes",
      longDescription: "Discover the secrets of professional cooking with this comprehensive cookbook featuring over 200 carefully tested recipes. From basic techniques to advanced culinary arts.",
      icon: "👨‍🍳",
      features: ["200+ Recipes", "Step-by-Step Instructions", "Beautiful Photography", "Expert Tips", "All Skill Levels"]
    }
  ];
  
  // Enhanced products functions with API integration
  async function getProducts(params = {}) {
    try {
      const response = await apiClient.getProducts(params);
      return response.products || [];
    } catch (error) {
      console.warn('API unavailable, using fallback data:', error.message);
      let products = [...fallbackProducts];
      
      // Apply client-side filtering
      if (params.category && params.category !== 'all') {
        products = products.filter(p => p.category === params.category);
      }
      
      if (params.search) {
        const searchTerm = params.search.toLowerCase();
        products = products.filter(p =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm) ||
          p.category.toLowerCase().includes(searchTerm)
        );
      }
      
      if (params.limit) {
        products = products.slice(0, parseInt(params.limit));
      }
      
      return products;
    }
  }
  
  async function getProductById(id) {
    try {
      return await apiClient.getProduct(id);
    } catch (error) {
      console.warn('API unavailable, using fallback data:', error.message);
      return fallbackProducts.find(p => p.id === parseInt(id));
    }
  }
  
  // Enhanced order functions
  async function createOrder(orderData) {
    try {
      const response = await apiClient.createOrder(orderData);
      return response.order;
    } catch (error) {
      console.error('Failed to create order via API:', error.message);
      // Fallback: create order locally
      const localOrder = {
        orderNumber: 'SS' + Date.now(),
        status: 'confirmed',
        orderDate: new Date().toISOString(),
        ...orderData,
        pricing: {
          subtotal: orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          shipping: orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) > 100 ? 0 : 9.99,
          tax: orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.085
        }
      };
      localOrder.pricing.total = localOrder.pricing.subtotal + localOrder.pricing.shipping + localOrder.pricing.tax;
      
      // Store locally
      let orders = JSON.parse(localStorage.getItem('orders')) || [];
      orders.push(localOrder);
      localStorage.setItem('orders', JSON.stringify(orders));
      
      return localOrder;
    }
  }
  
  // Enhanced contact functions
  async function submitContactMessage(messageData) {
    try {
      return await apiClient.submitContactMessage(messageData);
    } catch (error) {
      console.error('Failed to submit message via API:', error.message);
      // Fallback: store locally
      const localMessage = {
        messageId: 'MSG' + Date.now(),
        timestamp: new Date().toISOString(),
        ...messageData
      };
      
      let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
      messages.push(localMessage);
      localStorage.setItem('contactMessages', JSON.stringify(messages));
      
      return {
        messageId: localMessage.messageId,
        message: 'Message stored locally (API unavailable)'
      };
    }
  }