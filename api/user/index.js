module.exports = {
    register: function (req, res, next) {
        try {
            return res.send('ok');
        } catch (err) {
            next(err);
        }
    },
    login: function (req, res, next) {
        try {
            return res.send('ok');
        } catch (err) {
            next(err);
        }
    },
    deleteUser: function (req, res, next) {
        try {
            return res.send('ok');
        } catch (err) {
            next(err);
        }
    }
}