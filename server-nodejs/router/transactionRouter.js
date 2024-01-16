const express = require('express');
const router  = express.Router();
const { uuid } = require('uuidv4');
const db = require('../model/db.js');
const Op = db.Sequelize.Op;
const sq = db.sequelize;
const limit = 5
const dayjs = require('dayjs'); 
const today = dayjs().format('YYYY-MM-DD');

router.get('/list', async (req, res) => {
    let { user_id } = req.query;
    let page = req.query.page;
    let limitRows = req.query.limit_rows;

    page = (!page || isNaN(page) || parseInt(page) < 0)? 0 : parseInt(page) - 1;
    limitRows = (isNaN(limitRows) || !limitRows) ? limit : limitRows
    let offset = page * limitRows;

    const data = await db.transactions.findAndCountAll({
      where:{ assignedToUserId: {[Op.eq]: user_id} },
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
      user_id,
      name, 
      categories,
      file_uploaded
    } = req.body

    if (!desc) return res.status(422).send({errMsg: 'Missing desc'})
    if (!type) return res.status(422).send({errMsg: 'Missing type'})
    if (!payment_method) return res.status(422).send({errMsg: 'Missing payment_method'})
    if (!total_amt) return res.status(422).send({errMsg: 'Missing total_amt'})
    // if (!status) return res.status(422).send({errMsg: 'Missing status'})
    // if (!upload_date) return res.status(422).send({errMsg: 'Missing upload_date'})
    if (!user_id) return res.status(422).send({errMsg: 'Missing assignedToUserId'})
    if (!name) return res.status(422).send({errMsg: 'Missing name'})
    if (!categories) return res.status(422).send({errMsg: 'Missing categories'})
    if (!file_uploaded) return res.status(422).send({errMsg: 'Missing alt_direct_link'})

    let transactions_uuid = uuid()
    try {
      await db.transactions.create({
          "id": transactions_uuid ,
          "name": name,
          "desc": desc || '',
          "total_amt": total_amt || 0,
          "type": type,
          "categories": categories,
          "payment_method": payment_method,
          "status": status == false ? 'settled' : 'in debt',
          "upload_date": upload_date || today,
          "assignedToUserId": user_id ? user_id : 'system'
      });
      
      if(file_uploaded.ext_direct_link)  {
        await db.receipts.create({
            "id": uuid(),
            "transaction_id": transactions_uuid,
            "filename": file_uploaded.filename || '', 
            "image": Buffer.alloc(0), //empty for now
            "assignedToUserId": user_id ? user_id : 'system' || 'system',
            "file_ext": 'jpg',
            "alt_direct_link": file_uploaded.ext_direct_link || '' ,
        });
      }

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
      let transaction;
      transaction = await sq.transaction();

      isRowExist = await db.transactions.findAll({
        where: {id}
      })

      if (isRowExist.length < 1) return res.status(422).send({errMsg: 'ID provided not exist.'})

      await db.transactions.destroy({
        where: { id },
        transaction
      });

      await db.receipts.destroy({
        where: { transaction_id: id },
        transaction
      });
      
      await transaction.commit();
    } catch (err){
        if(transaction) await transaction.rollback();
        console.error(err)
        return res.status(500).send({errMsg: 'Failed to delete transaction'})
    }

    return res.send({
        status: 200,
        message: 'Succesfully deleted transaction'
    })
})

router.get('/dashboard', async (req, res) => {
  let { user_id } = req.query
  let data;
  let dashboard = {}

  try {
    data = await db.transactions.findAndCountAll({
      where:{ assignedToUserId: {[Op.eq]: user_id} },
      raw: true,
      logging: console.log
    });

    in_debt_data = await db.transactions.findAndCountAll({
      where: { 
        status: 'in debt',
        assignedToUserId: {[Op.eq]: user_id }
      },
      raw: true,
      logging: console.log
    });

    receipt_data = await db.receipts.findAndCountAll({
      where:{ assignedToUserId: {[Op.eq]: user_id} },
      order: [['createdAt', 'DESC']],
      limit: 3,
      raw: true,
      logging: console.log
    });

  
    dashboard.total_transactions = data.count
    dashboard.total_spending =  (data.rows).reduce((acc, row) => acc + row.total_amt, 0);
    dashboard.average_spending  = parseFloat((dashboard.total_spending / dashboard.total_transactions).toFixed(2));
    dashboard.total_in_debt = (in_debt_data.rows).reduce((acc, row) => acc + row.total_amt, 0);
    dashboard.receipts = 
      (receipt_data.rows).map(({ id, filename, image_data, file_ext, alt_direct_link }) => ({
        id,
        filename,
        image_data,
        file_ext,
        alt_direct_link
      }));

  } catch (err) {
    console.error(err)
    return res.status(500).send({errMsg: 'Unable to fetch dashboard data'})
  }

  return res.send({ status: 200, dashboard })
})

module.exports = router