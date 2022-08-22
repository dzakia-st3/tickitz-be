const express = require ("express")
const {getAllScehdule, addNewSchedule, updateSchedule, deleteSchedule} = require('../controller/scheduleController')
const router = express.Router ()

router.get('/:id', getAllScehdule)
router.post('/', addNewSchedule)
router.patch('/:id_movie', updateSchedule)
router.delete('/:id_movie', deleteSchedule)

module.exports = router