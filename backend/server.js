import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from  './config/db.js';
import { from } from 'rxjs';
import { notFound,errorHandler } from './middleware/errorMidleware.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js'

const port=process.env.PORT || 5000;

connectDB();//connectDB

const app=express();
//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//cookie parser middleware
app.use(cookieParser());


app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload',uploadRoutes);



app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);










if(process.env.NODE_ENV==='production')
{
    //set static folder
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname,'/frontend/build')));

    //any route that is not api wil be redirected to index.html
    app.get('*',(req,res)=>
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    );

}
else{
    const __dirname = path.resolve();
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
      app.get('/', (req, res) => {
        res.send('API is running....');
      });
}


// app.get('/api/products',(req,res)=>{
//     res.json(products);

// });

// //route for single product
// app.get('/api/products/:id',(req,res)=>{
//      const product=products.find((p)=>p._id===req.params.id);
//      res.json(product);
// });
app.use(notFound);
app.use(errorHandler);
app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);



