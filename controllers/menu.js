const schemas = require('../models/schemas.js')
const { search } = require('../routes/index.js')

module.exports = {
    getIndex: function (req, res) {
        res.render('index', {title: 'Menu Items'})
    },
    editMenu: async(req, res) => {
        let sesh = req.session

        if(!sesh.loggenIn) {
            res.render('menu', {title: 'Edit', loggedIn: false, error: 'Invalid Request'})
        } else {
            let id = req.params.id
            let err = ''

            let menu = schemas.menu
            let qry = {_id:id}

            let itemResult = await menu.find(qry)
            .then((itemData)=> {
                if(itemData == null) {
                    err ='Invalid ID'
                }

                res.render('menu', {title: 'Edit Menu', loggedIn: sesh.loggedIn, error: err})
            })
        }
    },
    deleteMenu: async (req, res) => {
        let sesh = req.session

        if(!sesh.loggedIn) {
            res.redirect('/login')
        } else {
            let menu = schemas.menu
            let menuId = req.params.id
            let qry = {_id:id}
            let deleteResult = await menu.deleteOne(qry)
            res.redirect('/')
        }
    },
    saveMenu: async (req, res) => {
        let sesh = req.session

        if(!sesh.loggedIn) {
            res.redirect('/login')
        } else {
            let menuId = req.body.menuId
            let menuName = req.body.menuName
            let menuIcon = req.body.menuIcon
            let menuUrl = req.body.menuUrl
            let menu = schemas.menu

            let qry = {_id:menuId}

            let saveData = {
                $set: {
                    name: nemuName,
                    icon: menuIcon,
                    menuUrl: menuUrl
                }
            }

            let updateResult = await menu.updateOne(qry, saveData)
            res.redirect('/')
        }
    },
    // new menu added
    newMenu: async (req, res) => {
        let sesh = req.session
        
        //check if user is logged in
        if(!sesh.loggedIn) {
            res.redirect('/login')
        } else {
            //grab data entered in the form and drop it into variables
            let menuName = req.body.menuName
            let menuIcon = req.body.menuIcon
            let menuUrl = req.body.menuUrl
            let menu = schemas.menu

            let qry = {name: menuName}

            let searchResults = await menu.findOne(qry)
            .then(async (menuData) => {
                //check database to see if something with the same name doesn't already exist, then create new menu and save
                if(!menuData) {
                    let newMenu = new schemas.menu({
                        name: nemuName,
                        icon: menuIcon,
                        menuUrl: menuUrl
                    })
                    let saveMenu = await newMenu.save()
                }
            })
            res.redirect('/')
        }
    }
}