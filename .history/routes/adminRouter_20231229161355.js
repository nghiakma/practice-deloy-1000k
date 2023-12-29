module.exports = router = function(router){
    var admin = require('../controller/adminController');

    router.post("/api/admin/login", admin.handleLogin);
};