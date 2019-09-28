const fs = require('fs');
const path = require('path');
//create pdf on the fly, on the server
const PdfDocument = require('pdfkit');
const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      console.log(products);
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products',
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products,
      });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return {
          quantity: i.quantity,
          product: {
            ...i.productId._doc
          }
        };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({
      'user.userId': req.user._id
    })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
      });
    })
    .catch(err => console.log(err));
};

exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findById(orderId)
    .then(order => {
      if (!order) {
        return next(new Error('No order found.'));
      }
      if (order.user.userId.toString() !== req.user._id.toString()) {
        return next(new Error('Unauthorized'));
      }
      const invoiceName = 'invoice-' + orderId + '.pdf';
      const invoicePath = path.join('data', 'invoices', invoiceName);
      const pdfDoc = new PdfDocument(); //readble stream
      const file = fs.createWriteStream(invoicePath); //create write stream
      pdfDoc.pipe(file);


    


    /*
     ****** Reading our response data - for smaller files ******
     */
    //   fs.readFile(invoicePath, (err, data) => {
    //     if (err) {
    //       return next(err);
    //     }
    // //passing some headers to the browser in order to use the correct file name and the correct extenstions
    // res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader('Accept','application/pdf');
    //   //how the content should be servred to the client
    //   //inline,attachment,filename and so on
    //     res.send(data);
    //   });
    /*
     * ****** Streaming our response data recommended (for bigger files) ******
    */
    // const file = fs.createReadStream(invoicePath); // create read stream
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Accept','application/pdf');
        res.setHeader('Content-Disposition',`attachment; filename="${invoiceName}"`)


        //forward the data that was red with that stream - to my response (response obj is a writeble stream)
        //readable stream ==> pipe the output to writable stream
        // node doesnt have to preload the data in to memmory , but streams the data to the client onb the fly
         //file.pipe(res);

        pdfDoc.pipe(res);
        // pdfDoc.text('Hello World');
        pdfDoc.fontSize(26).text('Invoice',{
          underline:true
        });
        pdfDoc.text('-------------------------');
        let totalPrice = 0; 


        order.products.forEach( prod =>{
   
          totalPrice +=  + prod.quantity  * prod.product.price;
          pdfDoc.text(prod.product.title +  ' - ' + prod.quantity + ' x ' + '$' + prod.product.price);
        });
  
        pdfDoc.text('Total Price: $' + totalPrice);
        pdfDoc.end();

    })
    .catch(err => next(err));
};







