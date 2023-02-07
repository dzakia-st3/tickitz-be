const express = require ("express")
const {getAllMovies, getMoviesById, getMoviesSort, addNewMovies, updateMovie, deleteMovie} = require('../controller/movieController')
const router = express.Router ()
const upload = require('../helper/multer')
const verifyAuth = require('../helper/verifyAuth')
const validation = require('../helper/validation')

router.get('/', getAllMovies)
router.post('/', verifyAuth, upload, validation, addNewMovies)
router.get('/sort', getMoviesSort)
router.get('/:id', getMoviesById)
router.patch('/:id', verifyAuth, upload, validation, updateMovie)
router.delete('/:id', verifyAuth, deleteMovie)



module.exports = router