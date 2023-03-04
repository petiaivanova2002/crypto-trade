exports.getHomePage = (req, res) => {
    console.log(req.user);
    res.render('home');
};

exports.getCatalogPage = (req, res) => {
    res.render('home/catalog');
}

