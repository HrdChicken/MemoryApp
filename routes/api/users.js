const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');
const multer = require('multer');
const upload = multer(); // <- handles multipart/formdata requests(photos)
/*---------- Public Routes ----------*/

// photo must match the key on the formData, 
// se the signUpPage Component onSubmit function
router.post('/signup', upload.single('photo'), usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.get('/:username', usersCtrl.profile);

/*---------- Protected Routes ----------*/




module.exports = router;