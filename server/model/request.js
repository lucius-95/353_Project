const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestingSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
    avatar: {
        type: String
    },
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
  staffRequest: {
      type:Boolean,
      required: false
  },
  customerRequest: {
      type:Boolean,
      required: false
  },

  company: { type: Schema.Types.ObjectId, ref: 'Company' },
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Request', requestingSchema);
