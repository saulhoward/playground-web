var React = require('react');

var {
    Button, Modal, Input, TabbedArea, TabPane, Alert
} = require('react-bootstrap');

var appsActions = require('../../actions/apps');
var { AppsStatus } = require('../../constants');

var codeStore = require('../../stores/code');

module.exports = React.createClass({

    getDefaultProps: function() {
        return {
            status: AppsStatus.PENDING,
            error: '',
        };
    },

    getInitialState: function() {
        return {
            selectedTabKey: 1,
        };
    },

    onTabSelect: function(key) {
        this.setState({ selectedTabKey: key });
    },

    getStatusAlert: function() {
        if (this.props.status == AppsStatus.CREATE_ERROR) {
            var content, style;
            switch (this.props.status) {
                case AppsStatus.CREATE_ERROR:
                    style = 'danger';
                    content = this.props.error;
                break;
            }
            return (
                <Alert bsStyle={ style }>
                    <p>{ content }</p>
                </Alert>
            );
        } else {
            return <div />;
        }
    },

    render: function () {
        var statusAlert = this.getStatusAlert(this.props.status);
        var disabledState = !!(this.props.status == AppsStatus.CREATING);

        return (
            <Modal { ...this.props } title="Create an app" animation={false}>
                <div className="modal-body">
                    { statusAlert }
                    <form>
                        <fieldset disabled={ disabledState }>
                            <Input ref="name" type="text" label='Name' />
                            <Input ref="description" type="text" label='Description' />

                            <TabbedArea activeKey={this.state.selectedTabKey} onSelect={this.onTabSelect} animation={false}>
                                <TabPane eventKey={1} tab="Code">
                                    <p>Will create an app from the code in the scratchpad</p>
                                </TabPane>
                                <TabPane eventKey={2} tab="Dockerfile">
                                    <Input ref="dockerfile" type="textarea" label='Dockerfile' />
                                </TabPane>
                                <TabPane eventKey={3} tab="Git repo">
                                    <Input ref="gitUrl" type="text" label='URL' />
                                    <Input ref="gitBranch" type="text" label='Branch' />
                                </TabPane>
                                <TabPane eventKey={4} tab="Image">
                                    <Input ref="image" type="text" label='Image' />
                                </TabPane>
                            </TabbedArea>

                            <Input ref="deploy" type="checkbox" label="Deploy now" />
                        </fieldset>
                    </form>
                </div>
                <div className="modal-footer">
                    <Button onClick={ this.props.onRequestHide }>Cancel</Button>
                    <Button disabled={disabledState} onClick={ this.submitForm } bsStyle="primary">Create app</Button>
                </div>
            </Modal>
        );
    },

    submitForm: function(e) {
        e.nativeEvent.stopImmediatePropagation();

        var appParams = {};
        appParams.id = this.refs.name.getValue();
        appParams.description = this.refs.description.getValue();

        var source = {};
        switch (this.state.selectedTabKey) {
            case 1: // code
                source.code = {
                    text: codeStore.getCode().join('\n'),
                    lang: codeStore.getLang()
                };
                break;
            case 2: // docker
                source.dockerfile = this.refs.dockerfile.getValue();
                break;
            case 3: // git
                source.gitrepo = {
                    url: this.refs.gitUrl.getValue(),
                    branch: this.refs.gitBranch.getValue() 
                };
                break;
            case 4: // image
                source.image = this.refs.image.getValue();
                break;
            default:
                console.log('No tab key selected!');
        }

        appParams.source = source;

        var params = {
            deploy: !!this.refs.deploy.getValue(),
            app: appParams
        }

        appsActions.createApp(params);
    },

    componentDidUpdate: function() {
        switch (this.props.status) {
            case AppsStatus.CREATE_END:
                this.props.onRequestHide();
            break;
        }
    }
});
