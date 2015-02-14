var React = require('react');

var { Button, Modal } = require('react-bootstrap');

module.exports = React.createClass({

    getDefaultProps: function() {
        return {
            title: 'Confirm',
            text: 'Are you sure?',
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
        };
    },

    render: function () {
        return (
            <Modal { ...this.props } title={ this.props.title } animation={false}>
                <div className="modal-body">
                <p>{ this.props.text }</p>
                </div>
                <div className="modal-footer">
                    <Button onClick={ this.props.onRequestHide }>{ this.props.cancelButtonText }</Button>
                    <Button onClick={ this.confirm } bsStyle="primary">{ this.props.confirmButtonText }</Button>
                </div>
            </Modal>
        );
    },

    confirm: function(e) {
        e.nativeEvent.stopImmediatePropagation();
        this.props.onConfirm();
        this.props.onRequestHide();
    }
});
