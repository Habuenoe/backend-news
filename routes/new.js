let express = require('express');
let app = express();


// IMPORT NEWS MODEL
let News = require('../models/news');


// =========================================
// GET ALL NEWS
// =========================================
app.get('/', (req, res, next) => {

    News.find({}, 'title description createDate content author archiveDate archived')
        .exec(
            (err, news) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error loading news!',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    news

                });
            })
});

module.exports = app;


// =========================================
// ADD NEWS
// =========================================

app.post('/', (req, res) => {

    let body = req.body;
    let news = new News({
        title: body.title,
        description: body.description,
        createDate: body.createDate,
        content: body.content,
        author: body.author,
        archiveDate: body.archiveDate,
        archived: body.archived
    });

    news.save((err, newsSaved) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error to ad news!',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            news: newsSaved
        });
    });

});

// =========================================
// UPDATE NEWS
// =========================================

app.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    News.findById(id, (err, news) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error searching news!',
                errors: err
            });
        }

        if (!news) {
            return res.status(400).json({
                ok: false,
                message: 'The new with id' + id + 'not exist',
                errors: {message: 'News with that id not exist'}
            });
        }

        news.title = body.title;
        news.description = body.description;
        news.createDate = body.createDate;
        news.contet = body.content;
        news.author = body.author;
        news.archiveDate = body.archiveDate;
        news.archived = body.archived;
        news.save((err, newsSaved) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'Error to update news',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                news: newsSaved
            });
        })
    });

});

// =========================================
// DELETE NEWS BY ID
// =========================================
app.delete('/:id', (req, res) => {
    let id = req.params.id;

    News.findByIdAndRemove(id, (err, newsDeleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error to delete news',
                errors: err
            });
        }

        if (!newsDeleted) {
            return res.status(400).json({
                ok: false,
                message: 'News with that id not exists',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            news: newsDeleted
        });
    })
});
