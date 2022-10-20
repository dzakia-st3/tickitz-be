const fs = require('fs')

module.exports = (req, res, next) => {
    
    let image = req.file
    
    if(!(req.file.mimetype).includes('jpeg') && !(req.file.mimetype).includes('jpg') && !(req.file.mimetype).includes('png') && !(req.file.mimetype).includes('svg')) {
        fs.unlinkSync(image)
        return res.status(400).send({message: "File not support"})
    }
    
    if(req.file.size > 1024 * 1024 * 3) {
        fs.unlinkSync(image)
        return res.status(400).send({message: "File is too large"})
    }

    // if(!name || !image) {
    //     return res.status(400).send({message: "All fields are required"})
    // }
    next ()

}

