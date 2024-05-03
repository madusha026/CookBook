require('../models/database')
const Category = require('../models/Category')
const Recipe = require('../models/Recipe');


/**\
 * GET homepage
 */

exports.homepage = async(req,res) =>{


    try{
    const limitNumber = 5   ;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);

    const food = { latest };

    res.render('index', {title: 'CookBook - Home',food });
}
catch(error){
    res.status(500).send({message: error.message || "Error Occured"});
}
}

exports.exploreRecipe = async(req, res) => {
  try {
    let recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    res.render('recipe', { title: 'CookBook - Recipe', recipe } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 


exports.searchRecipe = async(req, res) => {
    try {
      let searchTerm = req.body.searchTerm;
      let recipe = await Recipe.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
      res.render('search', { title: 'CookBook - Search', recipe } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
    
  }

exports.exploreLatest = async(req, res) => {
    try {
      const limitNumber = 20;
      const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
      res.render('explore-latest', { title: 'CookBook - Explore Latest', recipe } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  } 

exports.submitRecipe = async(req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('submit-recipe', { title: 'CookBook - Submit Recipe', infoErrorsObj, infoSubmitObj  } );
  }


exports.submitRecipeOnPost = async(req, res) => {
    try {
  
      let imageUploadFile;
      let uploadPath;
      let newImageName;
  
      if(!req.files || Object.keys(req.files).length === 0){
        console.log('No Files where uploaded.');
      } else {
  
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;
  
        uploadPath = require('path').resolve('./') + '/client/uploads/' + newImageName;
  
        imageUploadFile.mv(uploadPath, function(err){
          if(err) return res.satus(500).send(err);
        })
  
      }
  
      const newRecipe = new Recipe({
        title: req.body.title,
        description: req.body.description,
        ingredients: req.body.ingredients,
        instruction: req.body.instruction,
        image: 'Chicken_Kottu.jpg',
        cooking_time: req.body.cooking_time
      });
    
      await newRecipe.save();
  
      req.flash('infoSubmit', 'Recipe has been added.')
      res.redirect('/submit-recipe');
    } catch (error) {
      // res.json(error);
      req.flash('infoErrors', error);
      res.redirect('/submit-recipe');
    }
  }


 /* async function updateRecipe(){
    try{
        const res = await Recipe.updateOne({});
    }catch(error){
      console.log(error);
    }
  }
  
  updateRecipe();*/

  /*async function deleteRecipe(){
       try {
        await Recipe.deleteOne({});
       } catch (error) {
        console.log(error);
     }
    }
     deleteRecipe();
     */












/*async function insertDymmyCategoryData(){
    try{
        await Category.insertMany([
            {
                    "name": "Thai",
                    "image": "thai-food.jpg"
                    },
            {
                    "name": "Indian",
                    "image": "indian-food.jpg"
                    },
        ])
        
    }catch(error){
        console.log('err', + error)
    }
}

insertDymmyCategoryData();*/
