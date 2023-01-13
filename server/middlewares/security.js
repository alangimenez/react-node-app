class MidSecurity {
    constructor() {}

    checkPassword (req, res, next) {
        if (req.body.password == process.env.WORD_SECRET) {
            next()
        } else {
            res.status(401).json({"error_message": "You are not allowed to do this operation"})
        }
    }
}

const midSecurity = new MidSecurity()

module.exports = midSecurity