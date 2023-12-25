const express = require('express');
const router  = express.Router();
const { uuid } = require('uuidv4');
const db = require('../model/db.js');
const Op = db.Sequelize.Op;
const limit = 5
const dayjs = require('dayjs'); 
const today = dayjs().format('YYYY-MM-DD');

router.get('/list', async (req, res) => {
    let page = req.query.page;
    let limitRows = req.query.limit_rows;

    page = (!page || isNaN(page) || parseInt(page) < 0)? 0 : parseInt(page) - 1;
    limitRows = (isNaN(limitRows) || !limitRows) ? limit : limitRows
    let offset = page * limitRows;

    const data = await db.transactions.findAndCountAll({
      order: [['createdAt', 'DESC']],
      offset, limit: limitRows, 
      raw: true,
      logging: console.log
    });

    res.send({
        status: 200,
        data 
    })
})

router.post('/add', async (req, res) => {
    let { 
      desc, 
      type, 
      payment_method, 
      total_amt, 
      status, 
      upload_date, 
      assignedToUserId,
      name, 
      categories
    } = req.body

    if (!desc) return res.status(422).send({errMsg: 'Missing desc'})
    if (!type) return res.status(422).send({errMsg: 'Missing type'})
    if (!payment_method) return res.status(422).send({errMsg: 'Missing payment_method'})
    if (!total_amt) return res.status(422).send({errMsg: 'Missing total_amt'})
    // if (!status) return res.status(422).send({errMsg: 'Missing status'})
    // if (!upload_date) return res.status(422).send({errMsg: 'Missing upload_date'})
    // if (!assignedToUserId) return res.status(422).send({errMsg: 'Missing assignedToUserId'})
    if (!name) return res.status(422).send({errMsg: 'Missing name'})
    if (!categories) return res.status(422).send({errMsg: 'Missing categories'})

    try {
      await db.transactions.create({
          "id": uuid() ,
          "name": name,
          "desc": desc || '',
          "total_amt": total_amt || 0,
          "type": type,
          "categories": categories,
          "payment_method": payment_method,
          "status": status == false ? 'settled' : 'in debt',
          "upload_date": upload_date || today,
          "assignedToUserId": assignedToUserId || 'poweruser'
      });

    } catch (err){
      console.error(err)
      return res.status(500).send({errMsg: 'Failed to add new transaction'})
    }


    res.send({
        status: 200,
        message: 'Succesfully added new transaction'
    })
})

router.get('/delete/:id', async (req, res) => {
    let { id } = req.params

    if (!id) return res.status(422).send({errMsg: 'Missing id'})

    try {
      isRowExist = await db.transactions.findAll({
        where: {id}
      })

      if (isRowExist.length < 1) return res.status(422).send({errMsg: 'ID provided not exist.'})

      await db.transactions.destroy({
        where: { id }
      });
      
    } catch (err){
      console.error(err)
      return res.status(500).send({errMsg: 'Failed to delete transaction'})
    }

    return res.send({
        status: 200,
        message: 'Succesfully deleted transaction'
    })
})

module.exports = router