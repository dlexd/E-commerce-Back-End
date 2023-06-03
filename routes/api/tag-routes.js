const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  // Finds all tags
  try{
    const tagData = await Tag.findAll({include: [{ model: Product }]});
    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // Find a tag by its ID
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product}]
    });
    if(!tagData){
      res.status(404).json({ message: 'There is no tag with this ID.'});
    }
  }catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  //tag request should look like:
  //{
  //  "tag_name": "tag_name"
  // }
  try{
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // Updates a tag's name by its ID
  try {
    const tagData = await Tag.update(req.body, { where: {id: req.params.id} });
    if(!tagData) {
      res.status(404).json({ message: "There is no tag with this ID."});
      return;
    }
    res.status(200).json(tagData);
  }catch (err) {
    res.status(500).json(err);
  }

});

router.delete('/:id', async (req, res) => {
  // Delete a tag by its ID
  try{
    const tagData = await Tag.destroy({ where: {id: req.params.id} });
    if(!tagData) {
      res.status(404).json({ message:"There is no tag with this ID."});
    }
    res.status(200).json({ message: "Tag deleted."});
  }catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;