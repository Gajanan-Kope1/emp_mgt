module.exports = function (app,router) {
    
    require("./common")(router);
    require("./employee")(router);
    require("./department")(router);
    require("./statistics")(router);

	app.use("/api",router);
    app.use("/*",(req,res) => {
	    res.status(200).json({status:200,msg:"Not Found",data:null});
    });
};