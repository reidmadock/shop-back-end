const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Tested, works
router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(tagData); //post succesful status and return data.
  } catch (err) {
    res.status(500).json(err); //post unsuccesful status and return the error.
  }
});

// Tested, works
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, 
      { include: [{ model: Product}], });
    res.status(200).json(tagData); //post succesful status and return data.
  } catch (err) {
    res.status(500).json(err); //post unsuccesful status and return the error.
  }
});

// Tested, works.
router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create({ tag_name: req.body.tag_name});
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Tested, works.
router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(
      req.body,
      { where: {id: req.params.id },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(`Succesfully updated tag ID #: ${tagData}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Tested, works.
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(`Succesfully deleted tag code: ${tagData}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
