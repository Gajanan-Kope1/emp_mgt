const hprFlpUpl = require("../app/helper/file_upload");
const ctrCmn = require("../app/controllers/common");

module.exports = function (router) {

	router.post("/common/upload",hprFlpUpl.upload.array("files",1),hprFlpUpl.fileValidation,ctrCmn.fileUpload);

};