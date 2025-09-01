import { Hono } from 'hono';
import { cors } from 'hono/cors';

const uploadApi = new Hono();

// Enable CORS
uploadApi.use('/*', cors());

// Upload image endpoint
uploadApi.post('/image', async (c) => {
  try {
    const body = await c.req.parseBody();
    const file = body['file'];
    
    if (!file || !(file instanceof File)) {
      return c.json({ 
        success: false, 
        error: 'No file uploaded' 
      }, 400);
    }
    
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return c.json({ 
        success: false, 
        error: 'Invalid file type. Only images are allowed.' 
      }, 400);
    }
    
    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return c.json({ 
        success: false, 
        error: 'File too large. Maximum size is 5MB.' 
      }, 400);
    }
    
    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    const dataUrl = `data:${file.type};base64,${base64}`;
    
    // In production, you would upload to a CDN or cloud storage
    // For now, we'll return the data URL
    // You could also save to Cloudflare R2 or another storage service
    
    return c.json({
      success: true,
      url: dataUrl,
      filename: file.name,
      size: file.size,
      type: file.type
    });
    
  } catch (error: any) {
    console.error('Upload error:', error);
    return c.json({ 
      success: false, 
      error: error.message || 'Failed to upload image' 
    }, 500);
  }
});

export default uploadApi;