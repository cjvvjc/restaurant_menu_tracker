const schemas = require('../models/schemas.js')

module.exports = {
    getHome: async (req, res) => {
        let menu = schemas.menu
        let sesh = req.session

        let menuResult = await menu.find({}) // change to "find" to include user id to find data related to specific user
        .then((menuData) => {
            res.render('index', {title: 'Menu Tracker', data: menuData, search: '', loggedIn: sesh.loggedIn})
        })
    },
    getSearch: async (req, res) => {
        let menu = schemas.menu
        let sesh = req.session
        let q = req.body.searchInput
        let menuData = null
        let qry = {name:{$regex: '^' + q, $options: 'i'}}

            //if there's something to search for, search for it
        if (q != null){
            let menuResult = await menu.find(qry)
            .then((data) =>{
                menuData = data
            })
        } else { //if not, return everything
            q = 'Search'
            let menuResult = await menu.find({})
            .then((data) => {
                menuData = data
            })
        }
        res.render('index', {title: 'Menu Tracker', data: menuData, search: q, loggedIn: sesh.loggedIn})
    }
}