import { Hono } from 'hono';
import { cors } from 'hono/cors';

const uploadApi = new Hono();

// Enable CORS
uploadApi.use('/*', cors());

// Helper function to convert ArrayBuffer to Base64 more efficiently
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  let binary = '';
  const chunkSize = 0x8000; // Process in chunks to avoid stack overflow
  
  for (let i = 0; i < len; i += chunkSize) {
    const chunk = bytes.subarray(i, Math.min(i + chunkSize, len));
    binary += String.fromCharCode.apply(null, Array.from(chunk));
  }
  
  return btoa(binary);
}

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
    
    // Check file type - explicitly support PNG and other common formats
    const allowedTypes = [
      'image/jpeg', 
      'image/jpg', 
      'image/png',      // PNG support
      'image/gif', 
      'image/webp', 
      'image/svg+xml',
      'image/x-icon',   // ICO files
      'image/bmp'       // BMP files
    ];
    
    if (!allowedTypes.includes(file.type)) {
      return c.json({ 
        success: false, 
        error: `Invalid file type: ${file.type}. Supported formats: JPG, PNG, GIF, WebP, SVG, ICO, BMP` 
      }, 400);
    }
    
    // Check file size (max 10MB for better PNG support)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return c.json({ 
        success: false, 
        error: 'File too large. Maximum size is 10MB.' 
      }, 400);
    }
    
    // Convert file to base64 with better handling for large files
    const arrayBuffer = await file.arrayBuffer();
    const base64 = arrayBufferToBase64(arrayBuffer);
    const dataUrl = `data:${file.type};base64,${base64}`;
    
    // Log successful upload
    console.log(`Image uploaded successfully: ${file.name} (${file.type}, ${(file.size / 1024).toFixed(2)}KB)`);
    
    // In production, you would upload to a CDN or cloud storage
    // For now, we'll return the data URL
    // You could also save to Cloudflare R2 or another storage service
    
    return c.json({
      success: true,
      url: dataUrl,
      filename: file.name,
      size: file.size,
      type: file.type,
      message: `${file.name} uploaded successfully`
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