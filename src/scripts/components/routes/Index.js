var React = require('react');

var codeActions = require('../../actions/code');
var appsActions = require('../../actions/apps');

var { watchStoreMixin } = require('flux-base');
var codeStore = require('../../stores/code');
var eventsStore = require('../../stores/events');
var playgroundStore = require('../../stores/playground');
var appsStore = require('../../stores/apps');

var { Navigation } = require('react-router');

var { Grid, Row, Col } = require('react-bootstrap');
var Brand = require('../Brand');
var Apps = require('../Apps');
var AppHeader = require('../AppHeader');
var Editor = require('../Editor');
var Output = require('../Output');
var Toolbar = require('../Toolbar');

module.exports = React.createClass({

    mixins: [
        watchStoreMixin(codeStore, appsStore, eventsStore, playgroundStore),
        Navigation,
    ],

    getInitialState: function getInitialState() {
        return this.getState();
    },

    getState: function getState() {
        return {
            code: codeStore.getCode(),
            loadCode: codeStore.getLoadCode(),
            lang: codeStore.getLang(),
            codeStatus: codeStore.getStatus(),
            codeError: codeStore.getError(),
            shareID: codeStore.getShareID(),
            events: eventsStore.getEvents(),
            archivedEvents: eventsStore.getArchivedEvents(),
            apps: appsStore.getApps(),
            appsStatus: appsStore.getStatus(),
            appsError: appsStore.getError(),
            windowHeight: window.innerHeight,
            playgroundStatus: playgroundStore.getStatus(),
            playgroundApp: playgroundStore.getApp(),
        };
    },

    handleResize: function(e) {
        this.setState({windowHeight: window.innerHeight});
    },

    componentWillUnmount: function() {
        window.removeEventListener('resize', this.handleResize);
    },

    componentDidMount: function() {
        // code ID from URL, eg, `/p/abc123`
        if (this.props.params.codeID) {
            codeActions.load(this.props.params.codeID);
        }

        window.addEventListener('resize', this.handleResize);

        // load apps
        appsActions.fetch();
    },

    componentDidUpdate: function(prevProps, prevState) {
        // If a share ID is set, update the URL
        if (prevState.shareID != this.state.shareID) {
            this.transitionTo('code', { codeID: this.state.shareID });
        }
    },

    render() {
        var appContainerStyle = {
            height: (this.state.windowHeight) + 'px'
        };
        return (
            <Grid className="main-layout playground-container" fluid>
                <Row>
                    <Col className="sidebar-layout" sm={3} lg={2}>
                        <Brand />
                        <Apps
                            playgroundApp={ this.state.playgroundApp }
                            playgroundStatus={ this.state.playgroundStatus }
                            apps={ this.state.apps }
                            appsError={ this.state.appsError }
                            appsStatus={ this.state.appsStatus }
                        />
                    </Col>
                    <Col className="main-layout app" sm={9} lg={10} style={appContainerStyle}>
                        <Row>
                            <Col sm={12}>
                                <AppHeader
                                    playgroundApp={ this.state.playgroundApp }
                                    playgroundStatus={ this.state.playgroundStatus }
                                    lang={ this.state.lang }
                                    codeStatus={ this.state.codeStatus }
                                    shareID={ this.state.shareID }
                                    apps={ this.state.apps }
                                    appsStatus={ this.state.appsStatus }
                                    appsError={ this.state.appsError }
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Editor
                                    playgroundApp={ this.state.playgroundApp }
                                    playgroundStatus={ this.state.playgroundStatus }
                                    shareID={ this.state.shareID }
                                    loadCode={ this.state.loadCode }
                                    lang={ this.state.lang }
                                    code={ this.state.code }
                                    codeStatus={ this.state.codeStatus }
                                    codeError={ this.state.codeError }
                                    windowHeight={ this.state.windowHeight }
                                />
                            </Col>
                            <Col sm={6}>
                                <Toolbar
                                    playgroundApp={ this.state.playgroundApp }
                                    playgroundStatus={ this.state.playgroundStatus }
                                    lang={ this.state.lang }
                                    codeStatus={ this.state.codeStatus }
                                    shareID={ this.state.shareID }
                                    apps={ this.state.apps }
                                    status={ this.state.appsStatus }
                                    error={ this.state.appsError }
                                />
                                <Output
                                    events={ this.state.events }
                                    archivedEvents={ this.state.archivedEvents }
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row> 
            </Grid>
        )
    }
});
