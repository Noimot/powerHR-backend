class CheckConflicts {
    static validateUserDetails(req, res, next){
        const password = req.body.password;
        if(password.length < 8) {
            res.status(400).json({
                status:'error',
                message:'password length is less than 8'
            })
        }
        next();
    }
}

export default CheckConflicts;