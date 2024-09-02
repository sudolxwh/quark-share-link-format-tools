
/**
 * 把批量处理后的文件
 * 分隔割为中文和英文分享版本
 */
const fs = require('fs');

// 读取文件内容
const data = fs.readFileSync('input.txt', 'utf8');

const moment = require('moment');

// 按行分割文件内容
const lines = data.split('\n');

// 初始化两个数组，用于存放处理后的中文和英文名称
let chineseLines = [];
let englishLines = [];

lines.forEach(line => {
    // 使用正则表达式匹配【】内的内容
    const match = line.match(/【([^】]+)】/);
    
    if (match) {
        const fullName = match[1];
        
        // 找到第一个句号的位置
        const firstDotIndex = fullName.indexOf('.');
        
        // 使用 substring 方法获取中文和英文名称
        const chineseName = fullName.substring(0, firstDotIndex);
        const englishName = fullName.substring(firstDotIndex + 1);
        
        // 重新生成中文和英文的行，并推入各自的数组中
        const chineseLine = `【${chineseName}】${line.replace(match[0], '')}`;
        const englishLine = `【${englishName}】${line.replace(match[0], '')}`;
        
        chineseLines.push(chineseLine);
        englishLines.push(englishLine);
    }
});

// 将处理后的内容写入3.txt和4.txt
fs.writeFileSync(`${moment().format('YYYYMMDD_HHmmss')}中文版本.txt`, chineseLines.join('\n'), 'utf8');
fs.writeFileSync(`${moment().format('YYYYMMDD_HHmmss')}英文版本.txt`, englishLines.join('\n'), 'utf8');

console.log('文件处理完成，结果已写入成功');
