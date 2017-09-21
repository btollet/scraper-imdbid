const express = require('express')
const request = require('request')
const cheerio = require('cheerio')
const app = express()

app.get('/:name', function (req, res) {
  request(`http://www.imdb.com/find?ref_=nv_sr_fn&q=${req.params.name}&s=tt`, function(error, response, html){
        if(!error){
            let regex = /(^\/title\/+|\/\?[^]+$)/mg
            let $ = cheerio.load(html)
            let link = $('#main .result_text a').first().attr('href')
            let title = $('#main .result_text a').first().text()

            let imdbid = link.replace(regex, '')
            res.send(`Titre: ${title} </br>id: ${imdbid}`)

        }
    })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
