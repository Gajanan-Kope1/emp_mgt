/**
* This Function use to verify correct App key & App seccrete for API calls
*/
const verifyKeysFun = (req) => {
	try{
		const api_key = req.headers.api_key;
		const api_secrete = req.headers.api_secrete;
        
		if(api_key==process.env.API_KEY && api_secrete==process.env.API_SECRETE){
			return {status:200,msg:"sucess",data:null};
		}
		else
			return {status:401,msg:"Please provide valid api key & secrete",data:null};

	} catch(err) {
		return {status:401,msg:"Valid api key & secrete require",data:err};
	}
};

exports.verifyKeys = (app) => {
	app.use((req, res, next) => { // check default functions before call to route
		const verifyKeysResult = verifyKeysFun(req);
		if(verifyKeysResult.status!=200){
			res.status(verifyKeysResult.status).json(verifyKeysResult);
		}
		else
			next();
	});
};

