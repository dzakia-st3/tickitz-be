const jwt = require('jsonwebtoken')

const verifyAuth = (req, res, next)=> {
    if(!req.headers.authorization) {
        return res.status(404).send({message: "Token Required"})
        // (401).send({message: "Unauthorized User, Token Required"})
    }else {
        jwt.verify(req.headers.authorization, 'BismillahirrahmanirrahimBarokah!!!', function(err, decoded) {
            if(err) {
                return res.status(404).send({message: "Access Forbidden"})
            }
            console.log(decoded, 'ehehehhe')
            if(decoded.role === admin) {
                next()
            }else if(decoded.role === user) {
                return res.status(403).send({message: "Access Forbidden"})
            } 
            // next() //kalo udah benar semua, maka / lanjut ke tahap berikutnya.
        });
    }
    // console.log(req.headers)

}


module.exports = verifyAuth
