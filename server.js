const express = require('express');
const app = express();

const { connection } = require('./Config/Database')

const database = connection()

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))




const userRouter = require('./Routes/UserRoute')
const categoryRouter = require('./Routes/CategoryRoute')
const subCategoryRouter = require('./Routes/SubCategoryRoute')
const productRouter = require('./Routes/ProductRoute')
const orderRouter = require('./Routes/OrderRoute')

app.use('/users', userRouter)
app.use('/categories', categoryRouter)
app.use('/subcategories', subCategoryRouter)
app.use('/products', productRouter)
app.use('/orders', orderRouter)


database.connectToMongo()

app.listen(5000, () => {
    console.log('listening on 5000')
})