var React = require('react');

var { CodeStatus } = require('../../constants');

module.exports = React.createClass({

    getDefaultProps: function() {
        return {
            codeStatus: CodeStatus.PENDING,
            codeError: '',
        };
    },

    render: function () {
        if (this.props.codeStatus != CodeStatus.PENDING) {
            var content, style;
            switch (this.props.codeStatus) {
                case CodeStatus.RUNNING:
                    style = 'info';
                    content = 'Running code...';
                break;
                case CodeStatus.ERROR:
                    style = 'danger';
                    content = 'Code stopped with error ' + this.props.codeError;
                break;
                case CodeStatus.RUN_END:
                    style = 'success';
                    content = 'Code completed run';
                break;
 
            }
            var className = 'status ' + style;
            return (
                <div className={ className }>
                    <p>{ content }</p>
                </div>
            );
        } else {
            return <div className="status" />;
        }
    }
});
