const schedule = require('../model/schedule')

module.exports = {
    getAllScehdule: async (req, res) => {
        try {
            const result = await schedule.get(req,res)
            return res.status(200).send(result)
        } catch (error) {
            return res.status(500).send(error)
        }
    }, getScheduleById: async (req, res) => {
        try {
            const result = await schedule.getById(req,res)
            return res.status(200).send(result)
        } catch (error) {
            return res.status(500).send(error)
        }
    }, addNewSchedule: async (req, res) => {
        try {
            const result = await schedule.addSchedule(req,res)
            return res.status(201).send(result)
        } catch (error) {
            return res.status(400).send(error)
        }
    }, addNewShowtime: async (req, res) => {
        try {
            const result = await schedule.addShowtime(req,res)
            return res.status(201).send(result)
        } catch (error) {
            return res.status(400).send(error)
        }
    }, updateSchedule: async (req, res) => {
        try {
            const result = await schedule.update(req,res)
            return res.status(201).send(result)
        } catch (error) {
            return res.status(400).send(error)
        }
    }, deleteSchedule: async (req, res) => {
        try {
            const result = await schedule.remove(req,res)
            return res.status(201).send(result)
        } catch (error) {
            return res.status(400).send(error)
        }
    },
}