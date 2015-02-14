var React = require('react');

var { AppsStatus } = require('../../constants');

module.exports = React.createClass({

    getDefaultProps: function() {
        return {
            status: AppsStatus.PENDING,
            error: '',
        };
    },

    render: function () {
        if (this.props.status != AppsStatus.PENDING || this.props.status == AppsStatus.FETCH_END) {
            var content, style;
            switch (this.props.status) {
                case AppsStatus.FETCHING:
                    style = 'info';
                    content = 'Fetching apps...';
                break;
                case AppsStatus.ERROR:
                    style = 'danger';
                    content = 'Error fetching apps ' + this.props.error;
                break;
                case AppsStatus.EMPTY:
                    style = 'info';
                    content = 'No apps found';
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
