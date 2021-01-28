var express = require('express');
var router = express.Router();
var db=  require('../db')

/* GET home page. */
router.get('/', function(req, res, next) {
    var query='select * from newbooks';

    db.query(query,function(err,rows,fields){
        if(err) throw err;

         res.render('products', { title: 'Books', data:rows });
    });
   
});
router.get('/create-form',function(req,res,next){
    res.render('createform',{title:'Create Book'});

});

router.post('/create',function(req,res,next){
    var book_name = req.body.book_name;
    var pub = req.body.publication;
    var price = parseInt(req.body.price);

    var query = `INSERT INTO newbooks(name,pub,price) VALUES("${book_name}", "${pub}",${price})`

    db.query(query,function(err,result){
        if(err)throw err;
        console.log('record inserted');
        res.redirect('/products');

    })
});
router.get('/edit-form/:id',function(req,res,next){
    
    var id=req.params.id;

    var query=`SELECT * from newbooks where id=${id}`;

    db.query(query,function(err,rows,fields){

        res.render('editform',{title:'Update Book',product: rows[0]});
        
    });
});

router.post('/edit/:id',function(req,res,next){
    var name= req.body.book_name;
    var pub = req.body.publication;
    var price= parseInt(req.body.price);
    var id=req.params.id;

    var query=`UPDATE newbooks SET name="${name}", pub="${pub}",price=${price} where id=${id}`;

    db.query(query,function(err,result){
        if(err)throw err;
        console.log('record updated');
        res.redirect('/products');
    });
});

router.get('/delete-form/:id',function(req,res,next){
    var id = req.params.id;
    var query=`DELETE FROM newbooks where id=${id}`;

    db.query(query,function(err,result){
        if(err) throw err;
        console.log('record deleted');
        res.redirect('/products');
    })
})



module.exports = router;
