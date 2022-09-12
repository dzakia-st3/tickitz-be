const movie = require('../model/movie')
const fs = require('fs')
// const multer  = require('multer')
// const { get } = require('http')
// const upload = multer({ dest: 'uploads/' })


module.exports = {
    getAllMovies: async (req, res) => {
        try {
            const result = await movie.get(req,res)
            return res.status(200).send(result)
        } catch (error) {
            return res.status(500).send(error)
        }
    }, getMoviesById: async (req, res) => {
        try {
            const result = await movie.getById(req,res)
            return res.status(200).send(result)
        } catch (error) {
            return res.status(500).send(error)
        }
    }, getMoviesSort: async (req, res) => {
        try {
            const result = await movie.getSort(req,res)
            return res.status(200).send(result)
        } catch (error) {
            return res.status(500).send(error)
        }
    }, getMoviesById: async (req, res) => {
        try {
            const result = await movie.getById(req,res)
            return res.status(200).send(result)
        } catch (error) {
            return res.status(500).send(error)
        }
    }, addNewMovies: async (req, res) => {
        console.log(req.file, 'filename dari upload')
        try {
            console.log({...req.body, image: 'cekcek'})
            const reqModifer = {
                ...req,
                body: { ...req.body, image: req.file.filename }
            }
            const results = await movie.add(reqModifer, res)
            return res.status(201).send(results)
        } catch (error) {
            return res.status(400).send(error)
        }
    }, updateMovie: async (req, res) => {
        try { 
            const result = await movie.update(req, res)
            return res.status(201).send(result)
        } catch (error) {
            return res.status(400).send(error)
        }
    }, deleteMovie: async (req, res) => {
        try {
            const result = await movie.remove(req,res)
            return res.status(201).send(result)
        } catch (error) {
            return res.status(400).send(error)
        }
    },
}