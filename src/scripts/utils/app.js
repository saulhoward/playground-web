var debug = require('debug')('app:util:app');

var { isEmpty, find, defaults } = require('lodash-node');

module.exports = {
     
    getSourceType: function(app) {
        var type;
        find(app.Source, (v, k) => {
            if (!isEmpty(v)) {
                type = k
                return true;
            }
            return false;
        });
        return type;
    },
     
    getSourceCode: function(app) {
        var type = this.getSourceType(app);
        var sourceText;
        switch (type) {
            case 'Code':
                sourceText = app.Source.Code.Text;
                break;
            case 'Image':
            case 'Dockerfile':
                sourceText = app.Dockerfile.Source;
                break;
            case 'GitRepo':
                sourceText = app.Source.GitRepo.Url + ' ' + app.Source.GitRepo.Branch;
                break;
            default:
                sourceText = 'unknown source';
                break;
        }
        return sourceText;
    }
}
