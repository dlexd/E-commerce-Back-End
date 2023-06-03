const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // Finds all categories
  try {
    const categoryData = await Category.findAll({include: [{ model: Product }] });
    res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // Finds a category based on its ID
  try {
    const categoryData = await Category.findByPk(req.params.id, {include : [{model: Product}] });
    if (!categoryData) {
      res.status(404).json({ message: 'There is no category with this ID.'})
      return;
    }
    res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json(err);
  }
 
});

router.post('/', async (req, res) => {
  // Creates new category
  try { 
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // Updates a category based on its ID
  try {
    const categoryData = await Category.update(req.body, {where: {id: req.params.id}});
    if(!categoryData) {
      res.status(404).json({ message: "There is no category with this ID."});
      return;
    }
    res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async  (req, res) => {
  // Deletes category based on its ID
  try {
    const categoryData =await Category.destroy({
      where: { id: req.params.id }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'There is no category with this ID.'});
      return
    }
    res.status(200).json({message: "Category deleted"});
  }catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;