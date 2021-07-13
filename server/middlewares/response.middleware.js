const responseMiddleware = (req, res, next) => {
    if (res.error) {
        res.json({
            error: true,
            message: res.error
        });
    }

    if (res.data) {
        res.json(res.data); 
    }

    next();
}

exports.responseMiddleware = responseMiddleware;