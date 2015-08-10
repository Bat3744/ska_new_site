'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Validation
 */
function validateLength (v) {
  // a custom validation function for checking string length
  return v.length <= 255;
}

/**
 * News Schema
 */
var NewsSchema = new Schema({

	// Date de création
    created: {
        type: Date,
        default: Date.now
    },

    // Titre (obligatoire)
    titre: {
        type: String,
        default: '',
        trim: true,     
        required: 'Le titre ne peut pas être vide',
        validate: [validateLength, 'Le tire ne doit pas faire plus de 255 caractères']
    },

    // Texte
    texte: {
        type: String,
        default: '',
        trim: true
    },

    // Image
    image: {
        type: String,
        default: '',
        trim: true
    }
});

mongoose.model('News', NewsSchema);