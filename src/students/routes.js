const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getStudents);
router.post('/', controller.addStudent);
router.get('/:id', controller.getStudentById);
router.post('/get_by_age', controller.getStudentByAge);
router.delete("/:id", controller.removeStudent);
router.put("/:id", controller.updateStudent);
router.post('/post_by_age/', controller.postStudentByAge);
router.post('/get_by_name/', controller.getStudentByName);
router.post('/get_by_dob/', controller.getStudentByDob);
router.get('/count/get_all_student_count', controller.getStudentByCount);
router.post('/get_by_email/',controller.getStudentByEmail);

module.exports = router;

