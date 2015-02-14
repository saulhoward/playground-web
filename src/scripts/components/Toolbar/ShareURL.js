var React = require('react');
var { State } = require('react-router');

var { Input } = require('react-bootstrap');

var { CodeStatus } = require('../../constants');

var URIjs = require('URIjs');

module.exports = React.createClass({

    mixins: [
        State,
    ],

    render: function () {
        var params = this.getParams();
        var shareID;
        if (this.props.shareID) {
            shareID = this.props.shareID;
        } else if (params.codeID) {
            shareID = params.codeID;
        }

        if (shareID) {
            var url = new URIjs();
            url.path('/p/'+shareID);
            return (
                <form className="form-inline">
                    <Input ref="url" type="text" label="URL" value={ url.toString() } readOnly={ true } onClick={ this.selectInput } />
                </form>
            );
        }
        return <span />
    },

    selectInput: function(e) {
        e.nativeEvent.stopImmediatePropagation();
        var target = e.target;
        setTimeout(function() {
            target.select();
        }, 0);
    }
});
