const mongoose = require('mongoose');
const config = require('config');
mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch((e) => console.log('MongoDB disconnected' + e))
