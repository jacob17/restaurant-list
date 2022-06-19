const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const shopList = require('./restaurant.json')

// start project
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// render shop list
app.get('/', (req, res) => {
  res.render('index', { shops: shopList.results })
})

app.get('/restaurants/:id', (req, res) => {
  const shop = shopList.results.find(shop => shop.id.toString() === req.params.id)
  res.render('show', { shop })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const shops = shopList.results.filter(shop => {
    // see if properties(name, ...) of each shop contain keyword
    return ['name', 'category'].some(prop => shop[prop].toLowerCase().includes(keyword.trim().toLowerCase()))
  })
  res.render('index', { shops, keyword })
})

app.listen(port, () => {
  console.log(`Running, port:${port}`)
})
