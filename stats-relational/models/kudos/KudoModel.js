let KudoModel = {
  fields:{
    id: 'text',
    source : 'text',
    target : 'text',
    topic : 'text',
    description : 'text',
    created : 'timestamp'
  },
  key:['id']
};

module.exports = KudoModel;