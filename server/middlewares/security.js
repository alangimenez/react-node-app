class MidSecurity {
    constructor() {}

    checkPassword (req, res, next) {
        const indexHeader = req.rawHeaders.findIndex((e) => e == 'password-security')
        if (req.rawHeaders[indexHeader+1] == process.env.WORD_SECRET) {
            next()
        } else {
            res.status(401).json({"error_message": "You are not allowed to do this operation"})
        }
    }
}

const midSecurity = new MidSecurity()

module.exports = midSecurity