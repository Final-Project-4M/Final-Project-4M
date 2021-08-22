const isAuthorized = async (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) {
        res.status(401).send("User is not authorized");
    } else {
        const token = auth.split(' ')[1];
        try {
            const user = jwt.verify(token, secret)
            if (user) {
                req.user = user;
                next();
            } else {
                res.status(401).send("User is not authorized");
            }
        } catch (e) {
            res.status(401).send("User is not authorized");
        }
    }
};

module.exports = { isAuthorized };