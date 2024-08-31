/**
 * 处理夸克批量分享出来的链接
 */

const fs = require('fs');
const path = require('path');
const moment = require('moment');

// 读取文件路径
const inputFilePath = path.join(__dirname, 'input.txt');

const outputFilePath = path.join(__dirname, `${moment().format('YYYYMMDD_HHmmss')}批量分享处理结果.txt`);

// 读取文件内容
fs.readFile(inputFilePath, 'utf-8', (err, data) => {
    if (err) {
        console.error('读取文件出错:', err);
        return;
    }

    // 使用正则表达式匹配资源名称和链接
    const regex = /我用夸克网盘分享了「(.+?)」，[^]*?链接：(https:\/\/pan\.quark\.cn\/s\/[a-zA-Z0-9]+)/g;
    let match;
    const results = [];

    while ((match = regex.exec(data)) !== null) {
        // 格式化为一行
        results.push(`【${match[1]}】 ${match[2]}`);
    }

    // 将结果写入 2.txt 文件
    fs.writeFile(outputFilePath, results.join('\n'), (err) => {
        if (err) {
            console.error('写入文件出错:', err);
        } else {
            console.log('处理完成，结果已写入 2.txt 文件');
        }
    });
});
