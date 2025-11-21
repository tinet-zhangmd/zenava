import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// 压缩配置：保持原始分辨率，只转换格式，使用高质量
const configs = {
  banner: { quality: 90 }, // 不缩放，保持原始分辨率
  person: { quality: 90 },
  voice: { quality: 90 },
  livechat: { quality: 90 }
};

async function compressImage(inputPath, outputPath, options) {
  try {
    const { quality } = options;
    
    // 获取原图信息
    const metadata = await sharp(inputPath).metadata();
    console.log(`\n处理: ${path.basename(inputPath)}`);
    console.log(`   分辨率: ${metadata.width}x${metadata.height}px`);
    
    // 保持原始分辨率，只转换格式，使用高质量
    await sharp(inputPath)
      .webp({ 
        quality,
        effort: 6 // 更高的压缩努力（0-6，6最慢但质量最好）
      })
      .toFile(outputPath);
    
    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
    
    console.log(`   原始: ${(inputStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   压缩: ${(outputStats.size / 1024 / 1024).toFixed(2)} MB (减少 ${reduction}%)`);
    console.log(`   ✅ 保持原始分辨率，质量 ${quality}`);
    
    return true;
  } catch (error) {
    console.error(`❌ 压缩失败 ${inputPath}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('=== 高质量图片压缩 - 保持原始分辨率 ===\n');
  console.log('方案：不缩放，只转换格式，质量 90（最高清晰度）\n');
  
  const tasks = [
    compressImage(
      'public/assets/images/ai-agents/banner.png',
      'public/assets/images/ai-agents/banner.webp',
      configs.banner
    ),
    compressImage(
      'public/assets/images/ai-agents/person.png',
      'public/assets/images/ai-agents/person.webp',
      configs.person
    ),
    compressImage(
      'public/assets/images/ai-agents/voice.png',
      'public/assets/images/ai-agents/voice.webp',
      configs.voice
    ),
    compressImage(
      'public/assets/images/livechat/banner.png',
      'public/assets/images/livechat/banner.webp',
      configs.livechat
    )
  ];
  
  await Promise.all(tasks);
  
  console.log('\n✅ 所有图片压缩完成！保持原始分辨率，最高清晰度。');
}

main().catch(console.error);

