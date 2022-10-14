const express = require('express');
const router = require('./routes');
const multer = require('multer');


const app = express();
app.use(express.json());


app.use((request, response, next) => {
   
    response.setHeader('Cross-Origin-Request','*');
    response.setHeader('Access-Control-Allow-Credentials', '*');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Accept', 'application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
   
    next();
});


app.use(router);

//app.listen('3000', '192.168.215.131')

app.listen('3000', () => console.log('server up and listening on port :  3000'));
/**------------------UPLOAD DE FICHIER----------------------------* */
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
  })
  
const upload = multer({ storage: storage })

app.post('/file', upload.single('file'), (req, res, next) => {
    const file = req.file;
    //console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
  })

app.post('/multipleFiles', upload.array('files'), (req, res, next) => {
const files = req.files;
console.log(files);
if (!files) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
}
    res.send({sttus:  'ok'});
})
  
  
