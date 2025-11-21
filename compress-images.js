import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 压缩配置：保持原始分辨率，只转换格式，使用高质量
const DEFAULT_QUALITY = 90;

// 支持的图片格式
const SUPPORTED_FORMATS = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff'];

/**
 * 递归获取目录下所有图片文件
 */
function getAllImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // 递归处理子目录
      getAllImageFiles(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      // 只处理支持的图片格式，且不是 .webp 文件
      if (SUPPORTED_FORMATS.includes(ext) && ext !== '.webp') {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

/**
 * 压缩单张图片
 */
async function compressImage(inputPath, outputPath, quality = DEFAULT_QUALITY) {
  try {
    // 如果输出文件已存在，跳过
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  跳过: ${path.relative(process.cwd(), inputPath)} (WebP 已存在)`);
      return { success: true, skipped: true };
    }
    
    // 获取原图信息
    const metadata = await sharp(inputPath).metadata();
    const relativePath = path.relative(process.cwd(), inputPath);
    
    console.log(`\n📸 处理: ${relativePath}`);
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
    console.log(`   WebP: ${(outputStats.size / 1024 / 1024).toFixed(2)} MB (减少 ${reduction}%)`);
    console.log(`   ✅ 已转换为 WebP (质量: ${quality})`);
    
    return { success: true, skipped: false, inputSize: inputStats.size, outputSize: outputStats.size };
  } catch (error) {
    console.error(`❌ 压缩失败 ${inputPath}:`, error.message);
    return { success: false, skipped: false, error: error.message };
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('=== 🎨 自动图片压缩工具 - WebP 转换 ===\n');
  console.log('📁 扫描目录: public/assets/images/');
  console.log(`🔍 支持格式: ${SUPPORTED_FORMATS.join(', ')}`);
  console.log(`⚙️  压缩质量: ${DEFAULT_QUALITY} (保持原始分辨率)\n`);
  
  const imagesDir = path.join(__dirname, 'public/assets/images');
  
  // 检查目录是否存在
  if (!fs.existsSync(imagesDir)) {
    console.error(`❌ 目录不存在: ${imagesDir}`);
    process.exit(1);
  }
  
  // 获取所有图片文件
  const imageFiles = getAllImageFiles(imagesDir);
  
  if (imageFiles.length === 0) {
    console.log('ℹ️  未找到需要转换的图片文件');
    return;
  }
  
  console.log(`📊 找到 ${imageFiles.length} 个图片文件\n`);
  console.log('━'.repeat(60));
  
  // 批量处理图片
  const tasks = imageFiles.map(inputPath => {
    const dir = path.dirname(inputPath);
    const ext = path.extname(inputPath);
    const basename = path.basename(inputPath, ext);
    const outputPath = path.join(dir, `${basename}.webp`);
    
    return compressImage(inputPath, outputPath, DEFAULT_QUALITY);
  });
  
  const results = await Promise.all(tasks);
  
  // 统计结果
  const successful = results.filter(r => r.success && !r.skipped).length;
  const skipped = results.filter(r => r.skipped).length;
  const failed = results.filter(r => !r.success).length;
  const totalInputSize = results
    .filter(r => r.inputSize)
    .reduce((sum, r) => sum + r.inputSize, 0);
  const totalOutputSize = results
    .filter(r => r.outputSize)
    .reduce((sum, r) => sum + r.outputSize, 0);
  
  console.log('\n' + '━'.repeat(60));
  console.log('\n📈 压缩统计:');
  console.log(`   ✅ 成功转换: ${successful} 个`);
  console.log(`   ⏭️  跳过: ${skipped} 个`);
  console.log(`   ❌ 失败: ${failed} 个`);
  
  if (successful > 0) {
    const totalReduction = ((1 - totalOutputSize / totalInputSize) * 100).toFixed(1);
    console.log(`   💾 总原始大小: ${(totalInputSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   💾 总压缩大小: ${(totalOutputSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   📉 总体减少: ${totalReduction}%`);
  }
  
  console.log('\n✨ 图片压缩完成！');
  
  if (failed > 0) {
    console.log('\n⚠️  部分文件处理失败，请检查上述错误信息');
    process.exit(1);
  }
}

main().catch(error => {
  console.error('\n❌ 程序执行出错:', error);
  process.exit(1);
});

