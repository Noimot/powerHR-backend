class CheckConflicts {
    static validateUserDetails(req, res, next){
        const password = req.body.password;
        if(password.length < 8) {
            return res.status(400).json({
                status:'error',
                message:'password length is less than 8'
            })
        }
        next();
    }


    static authenticateUserDetails(req, res, next){
        const { password, adminId, email } = req.body;
        if(password !== process.env.ADMIN_PASSWORD || adminId !== process.env.ADMIN_ID_NUMBER){
            return res.status(401).json({
                message: 'incorrect password or id'
            })
        }
        next();
    }
}

export default CheckConflicts;