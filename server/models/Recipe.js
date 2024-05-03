const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'This field is required'
    },
    description: {
        type: String,
        required: 'This field is required'
    },
    ingredients: {
        type: Array,
        required: 'This field is required'
    },
    image: {
        type: String,
        required: 'This field is required.'
      },
    instruction: {
        type: String,
        required: 'This field is required'
    },
    cooking_time: {
        type: String,
        required: 'This field is required'
    },
    
});


recipeSchema.index({ name: 'text', description: 'text' });


module.exports = mongoose.model('Recipe', recipeSchema)