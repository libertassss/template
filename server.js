const express = require('express');



const app = express();
const PORT = 8888;
app.get('*', (req, res, next) => {
    res.send('hello word');
})
app.listen(PORT, () => {
    console.log('本地服务已启动： localhost:%s', PORT);
})