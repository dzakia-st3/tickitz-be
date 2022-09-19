const express = require ("express")
const {getAllScehdule, addNewSchedule, addNewShowtime, getScheduleById, updateSchedule, deleteSchedule} = require('../controller/scheduleController')
const router = express.Router ()

router.get('/', getAllScehdule)
router.post('/', addNewSchedule)
router.post('/time', addNewShowtime)
router.get('/:id', getScheduleById)
router.patch('/:id', updateSchedule)
router.delete('/:id', deleteSchedule)

module.exports = router