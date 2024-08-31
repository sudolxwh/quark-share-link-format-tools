/**
 * 龙之谷合集			https://pan.quark.cn/s/5bf4e6d7aa05										
百万美元的五棱星			https://pan.quark.cn/s/e838a964167e	
提取出来链接
 */
const fs = require('fs');
const path = require('path');

// 定义文件路径
const inputFilePath = path.join(__dirname, 'other.txt');
const outputFilePath = path.join(__dirname, 'result.txt');

// 读取文件内容
fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('读取文件失败:', err);
        return;
    }

    // 使用正则表达式提取链接
    const links = data.match(/https:\/\/pan\.quark\.cn\/[^\s]+/g);

    if (links) {
        // 将链接写入到 result.txt 文件
        fs.writeFile(outputFilePath, links.join('\n'), (err) => {
            if (err) {
                console.error('写入文件失败:', err);
            } else {
                console.log('链接已成功写入到 result.txt 文件中');
            }
        });
    } else {
        console.log('未找到匹配的链接');
    }
});
