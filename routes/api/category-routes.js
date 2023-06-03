const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// Tested, works
router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(categoryData); //post succesful status and return data.
  } catch (err) {
    res.status(500).json(err); //post unsuccesful status and return the error.
  }
});
//requires testing
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try{
    const categoryData = await Category.findByPk(req.params.id, { include: {model: Product }, })
    
    if (!categoryData) {
      res.status(404).json("No category found with that ID.");
      return;
    }
    
    res.status(200).json(categoryData);
  
  } catch (err) {
    res.status(500).json(err);
  }
});
//requires testing
router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
/*
 Updating a category fortunately does not require deleting anything.
*/
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(
      req.body,
      { where: {id: req.params.id }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(`Succesfully updated category ID #: ${categoryData}`);
  } catch (err) {
    res.status(500).json(err);
  }
});
/*
 Delete a category. Default behavior is 'onDelete: SET NULL'
 So products belonging to this category will now have a null value.
*/
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
