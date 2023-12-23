const express = require('express');
const router  = express.Router();

const db = require('../model/db.js');
const Op = db.Sequelize.Op;
const limit = 20

router.get('/list', async (req, res) => {
    let page = req.query.page;
    let limitRows = req.query.limit_rows;

    page = (!page || isNaN(page) || parseInt(page) < 0)? 0 : parseInt(page) - 1;
    limitRows = (isNaN(limitRows) || !limitRows) ? limit : limitRows
    let offset = page * limitRows;

    const data = await db.transactions.findAndCountAll({
      offset, limit: limitRows, 
      raw: true,
      logging: console.log
    });

    res.send({
        status: 200,
        data 
    })
})

module.exports = router