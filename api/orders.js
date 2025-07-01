// API endpoint for orders
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
  
    const { method } = req;
    const { id } = req.query;
  
    // In-memory storage (in production, use a real database)
    const orders = [];
  
    try {
      switch (method) {
        case 'GET':
          if (id) {
            // Get single order
            const order = orders.find(o => o.orderNumber === id);
            if (!order) {
              return res.status(404).json({ error: 'Order not found' });
            }
            return res.status(200).json(order);
          }
  
          // Get all orders (admin functionality)
          return res.status(200).json({
            orders: orders,
            total: orders.length,
            timestamp: new Date().toISOString()
          });
  
        case 'POST':
          // Create new order
          const orderData = req.body;
          
          // Validate required fields
          if (!orderData.items || !orderData.firstName || !orderData.email) {
            return res.status(400).json({ 
              error: 'Missing required fields',
              required: ['items', 'firstName', 'email']
            });
          }
  
          // Calculate totals
          const subtotal = orderData.items.reduce((sum, item) => 
            sum + (item.price * item.quantity), 0
          );
          const shipping = subtotal > 100 ? 0 : 9.99;
          const tax = subtotal * 0.085;
          const total = subtotal + shipping + tax;
  
          // Generate order
          const newOrder = {
            orderNumber: 'SS' + Date.now(), // SS for Shaswata's Store
            status: 'confirmed',
            orderDate: new Date().toISOString(),
            estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            customer: {
              firstName: orderData.firstName,
              lastName: orderData.lastName,
              email: orderData.email,
              phone: orderData.phone
            },
            shippingAddress: {
              address: orderData.address,
              city: orderData.city,
              state: orderData.state,
              zipCode: orderData.zipCode,
              country: orderData.country
            },
            items: orderData.items.map(item => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              total: item.price * item.quantity
            })),
            pricing: {
              subtotal: Math.round(subtotal * 100) / 100,
              shipping: Math.round(shipping * 100) / 100,
              tax: Math.round(tax * 100) / 100,
              total: Math.round(total * 100) / 100
            },
            paymentMethod: 'Credit Card', // Demo payment
            specialInstructions: orderData.specialInstructions || '',
            trackingNumber: 'TRK' + Math.random().toString(36).substr(2, 9).toUpperCase()
          };
  
          // In a real app, save to database
          orders.push(newOrder);
  
          // Send confirmation email (simulate)
          console.log(`Order confirmation email sent to ${newOrder.customer.email}`);
  
          return res.status(201).json({
            message: 'Order created successfully',
            order: newOrder,
            trackingUrl: `https://shaswatas-store.vercel.app/track?order=${newOrder.orderNumber}`
          });
  
        case 'PUT':
          // Update order status (admin functionality)
          if (!id) {
            return res.status(400).json({ error: 'Order ID required' });
          }
  
          const orderIndex = orders.findIndex(o => o.orderNumber === id);
          if (orderIndex === -1) {
            return res.status(404).json({ error: 'Order not found' });
          }
  
          const { status, trackingNumber } = req.body;
          
          orders[orderIndex] = {
            ...orders[orderIndex],
            status: status || orders[orderIndex].status,
            trackingNumber: trackingNumber || orders[orderIndex].trackingNumber,
            updatedAt: new Date().toISOString()
          };
  
          return res.status(200).json({
            message: 'Order updated successfully',
            order: orders[orderIndex]
          });
  
        default:
          return res.status(405).json({ error: 'Method not allowed' });
      }
    } catch (error) {
      console.error('Orders API Error:', error);
      return res.status(500).json({ 
        error: 'Internal server error',
        message: error.message 
      });
    }
  }