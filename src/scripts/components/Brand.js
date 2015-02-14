var React = require('react');

module.exports = React.createClass({
    
    render: function() {
        var brandURL = 'http://myodc.io';
        return  (
            <div className="brand">
                <div className="brand__wrapper">
                    <a href={ brandURL }>
                    <span className="brand__my">my</span><span className="brand__odc">ODC</span>
                    </a>
                </div>
            </div>
        );
    }
});
