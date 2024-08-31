const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// 修改这里为你的CSV文件所在的目录
const csvDirectory = './csv';

// 处理CSV文件
fs.readdir(csvDirectory, (err, files) => {
    if (err) {
        return console.error('无法读取目录:', err);
    }

    let markdownContent = '| 序号 | 音乐名 | 链接 |\n| --- | --- | --- |\n';
    let index = 1;

    files.forEach(file => {
        if (path.extname(file) === '.csv') {
            const filePath = path.join(csvDirectory, file);

            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                    const musicName = row['分享名'];
                    const shareAddress = row['分享地址'];
                    
                    const linkMatch = shareAddress.match(/https:\/\/pan\.quark\.cn\/s\/\w+/);
                    if (linkMatch) {
                        const link = linkMatch[0];
                        markdownContent += `| ${index} | ${musicName} | [保存](${link}) |\n`;
                        index++;
                    }
                })
                .on('end', () => {
                    console.log(`已处理文件: ${file}`);
                    // 当所有文件都处理完后，保存生成的Markdown文件
                    if (files.indexOf(file) === files.length - 1) {
                        fs.writeFile('output.md', markdownContent, (err) => {
                            if (err) {
                                return console.error('无法写入Markdown文件:', err);
                            }
                            console.log('Markdown文件已生成: output.md');
                        });
                    }
                });
        }
    });
});
