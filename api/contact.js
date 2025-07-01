// API endpoint for contact messages
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
    const messages = [];
  
    try {
      switch (method) {
        case 'GET':
          if (id) {
            // Get single message
            const message = messages.find(m => m.messageId === id);
            if (!message) {
              return res.status(404).json({ error: 'Message not found' });
            }
            return res.status(200).json(message);
          }
  
          // Get all messages (admin functionality)
          return res.status(200).json({
            messages: messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
            total: messages.length,
            timestamp: new Date().toISOString()
          });
  
        case 'POST':
          // Submit new contact message
          const messageData = req.body;
          
          // Validate required fields
          if (!messageData.name || !messageData.email || !messageData.message) {
            return res.status(400).json({ 
              error: 'Missing required fields',
              required: ['name', 'email', 'message']
            });
          }
  
          // Validate email format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(messageData.email)) {
            return res.status(400).json({ error: 'Invalid email format' });
          }
  
          // Create new message
          const newMessage = {
            messageId: 'MSG' + Date.now(),
            timestamp: new Date().toISOString(),
            status: 'new',
            name: messageData.name,
            email: messageData.email,
            phone: messageData.phone || null,
            subject: messageData.subject || 'General Inquiry',
            orderNumber: messageData.orderNumber || null,
            message: messageData.message,
            priority: getPriority(messageData.subject),
            responseTime: getExpectedResponseTime(messageData.subject),
            ipAddress: req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown',
            userAgent: req.headers['user-agent'] || 'unknown'
          };
  
          // In a real app, save to database
          messages.push(newMessage);
  
          // Send auto-reply email (simulate)
          console.log(`Auto-reply email sent to ${newMessage.email}`);
  
          // Notify admin (simulate)
          console.log(`Admin notification: New ${newMessage.priority} priority message from ${newMessage.name}`);
  
          return res.status(201).json({
            message: 'Contact message submitted successfully',
            messageId: newMessage.messageId,
            expectedResponse: newMessage.responseTime,
            autoReply: 'Thank you for contacting Shaswata\'s Store! We\'ll get back to you soon.'
          });
  
        case 'PUT':
          // Update message status (admin functionality)
          if (!id) {
            return res.status(400).json({ error: 'Message ID required' });
          }
  
          const messageIndex = messages.findIndex(m => m.messageId === id);
          if (messageIndex === -1) {
            return res.status(404).json({ error: 'Message not found' });
          }
  
          const { status, adminNotes, assignedTo } = req.body;
          
          messages[messageIndex] = {
            ...messages[messageIndex],
            status: status || messages[messageIndex].status,
            adminNotes: adminNotes || messages[messageIndex].adminNotes,
            assignedTo: assignedTo || messages[messageIndex].assignedTo,
            updatedAt: new Date().toISOString()
          };
  
          return res.status(200).json({
            message: 'Contact message updated successfully',
            contactMessage: messages[messageIndex]
          });
  
        default:
          return res.status(405).json({ error: 'Method not allowed' });
      }
    } catch (error) {
      console.error('Contact API Error:', error);
      return res.status(500).json({ 
        error: 'Internal server error',
        message: error.message 
      });
    }
  }
  
  // Helper functions
  function getPriority(subject) {
    const urgentKeywords = ['urgent', 'critical', 'broken', 'not working', 'refund', 'complaint'];
    const highKeywords = ['order', 'shipping', 'delivery', 'payment', 'technical'];
    
    const subjectLower = subject.toLowerCase();
    
    if (urgentKeywords.some(keyword => subjectLower.includes(keyword))) {
      return 'urgent';
    } else if (highKeywords.some(keyword => subjectLower.includes(keyword))) {
      return 'high';
    } else {
      return 'normal';
    }
  }
  
  function getExpectedResponseTime(subject) {
    const priority = getPriority(subject);
    
    switch (priority) {
      case 'urgent':
        return 'Within 2 hours';
      case 'high':
        return 'Within 6 hours';
      default:
        return 'Within 24 hours';
    }
  }