const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  index: (req, res) => {
    res.render("products/products", {
      productos: products,
      convert : toThousand,
    });
  },

  detail: (req, res) => {
    let detalle = products.find(function (find) {
      if (find.id == req.params.id) {
        return find;
      }
    });

    res.render("products/detail", { detalle: detalle, convert : toThousand });
  },

  create: (req, res) => {
    res.render("products/product-create-form");
  },

  store: (req, res) => {
    let pathFile = path.join("data", "productsDataBase.json");

    let nuevoProduct = fs.readFileSync(pathFile, { encoding: "utf-8" });

    nuevoProduct = JSON.parse(nuevoProduct);

    if(req.files.length == []) {

      nuevoProduct.push({
        ...req.body,
        id: nuevoProduct[nuevoProduct.length - 1].id + 1,
        image: ""
      });      

    } else {

      nuevoProduct.push({
        ...req.body,
        id: nuevoProduct[nuevoProduct.length - 1].id + 1,
        image: req.files[0].filename

      });

    }
    nuevoProduct = JSON.stringify(nuevoProduct);

    fs.writeFileSync(pathFile, nuevoProduct);

    res.redirect('/products');
  },

  edit: (req, res) => {
    let edit = products.find(function (search) {
      if (search.id == req.params.id) {
        return search;
      }
    });
    res.render("products/product-edit-form", { edit: edit });
  },

  update: (req, res) => {
    
    let pathFile = path.join("data", "productsDataBase.json");

    let actualProduct = fs.readFileSync(pathFile, { encoding: "utf-8" });

    actualProduct = JSON.parse(actualProduct);

    find = [...actualProduct]

    for(let i = 0; i < find.length; i++) {

      if (find[i].id == req.params.id) {

        find[i].name = req.body.name,
        find[i].price = req.body.price,
        find[i].discount = req.body.discount,
        find[i].category = req.body.category,
        find[i].description = req.body.description

        if(req.files.length == []) {

          find[i].image = "";
        } else {
          find[i].image = req.files[0].filename;
        }
        break
      }

    } 
    actualProduct = JSON.stringify(actualProduct);

    fs.writeFileSync(pathFile, actualProduct);

    res.redirect('/products');
  },

  destroy: (req, res) => {
    let pathFile = path.join("data", "productsDataBase.json");

    let actualProduct = fs.readFileSync(pathFile, { encoding: "utf-8" });

    actualProduct = JSON.parse(actualProduct);

    actualProduct = actualProduct.filter(function (find) {
      if (find.id != req.params.id) {
        return find;
      }
    });

    actualProduct = JSON.stringify(actualProduct);

    fs.writeFileSync(pathFile, actualProduct);

    res.redirect('/');
  },
};
module.exports = controller;