const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProfileSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  profileusername: {
    type: String,
    required: true,
    max: 40,
  },
  location: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  githubusername: {
    type: String,
  },
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  companies:[
    {
      company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        }
    }
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Profile', ProfileSchema);
