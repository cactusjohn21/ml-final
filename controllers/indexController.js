const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		 let visited = products.filter(function (visita) {
			if(visita.category == 'visited') {
				visita.price = toThousand(visita.price)
				return visita
			} 
		})

		let ofertas = products.filter(function (oferta) {
			if(oferta.category == 'in-sale') {
				oferta.price = toThousand(oferta.price)
				return oferta
			} 
		})

		res.render('index', {visited: visited, ofertas: ofertas})
	},
	search: (req, res) => {
		res.render('results')
	},
};

module.exports = controller;