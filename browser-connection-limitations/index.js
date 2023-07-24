const express = require('express')
const app = express()
const port = 3000

app.get('/foo', (req, res) => {
    res.send("bar")
})

app.get('/example', (req, res) => {
})

const index = ({ title = "sample" }) => `
<html>
    <head>
        <meta charset="utf-8">
        <link href="./css/style.css" rel="stylesheet">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <title>${title}</title>
    </head> 
    <body>
        <button type="button" id="notworking" onclick="fetchData('/example')">Not Working</button>
        <button type="button" id="foo" onclick="fetchData('/foo')">Foo</button>
    </body>
    <script type="text/javascript">
    function fetchData(path) {
        fetch('http://localhost:3000' + path)
          .then(function (response) {
            if (response.status !== 200) {
              console.log(
                'Looks like there was a problem. Status Code: ' + response.status
              );
              return;
            }
            return response.text()
          })
          .then(function (text) {
            console.log(text)
          })
          .catch(function (err) {
            console.log('Fetch Error :-S', err);
          });
      }
    </script>
</html>
`
app.get('/home', (_, res) => {
    const page = index(
        { 
            title: "Home", 
        }
    )
    res.status(200);
    res.send(page);    

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})