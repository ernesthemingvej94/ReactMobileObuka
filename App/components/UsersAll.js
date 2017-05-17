/**
 * Created by basskibo on 10.5.17..
 */
/**
 * Created by basskibo on 26.4.17..
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUsers} from '../actions/AppActions';

import {loginRestCall} from '../actions/AppActions';
import {
    StyleSheet,
    Text, View, TextInput,
    Image, TouchableHighlight,
    Icon, Button, ListView
} from 'react-native';

class UsersAll extends Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.goOneStepBack = this.goOneStepBack.bind(this);
        this.goToHomeScreen = this.goToHomeScreen.bind(this);
        this.state = {
            dataSource: ds.cloneWithRows(this.props.users)
        }
    }

    componentWillMount() {

        this.props.getUsers();

    }


    componentWillReceiveProps(nextProps) {

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.users)
        }, function () {
            console.log('Sacekao podatke pre rendera');
            //bez ovoga ne radi...
        });
    }


    renderRow(rowData, sectionID, rowID) {

        return <TouchableHighlight onPress={this.onPressRow.bind(this, rowData)}>
            <View style={styles.row}>
                        <Text style={{fontWeight: 'bold',flex:1}}>
                            {rowData.firstName} {rowData.lastName}
                        </Text>
                        <Text style={{fontWeight: 'normal',flex: 1}}>
                            {rowData.email}
                        </Text>
                        <Text style={{fontStyle: 'italic',flex: 1}}>
                            {rowData.username}
                        </Text>
            </View>
        </TouchableHighlight>
    }

    onPressRow(rowData) {
        console.log('onPressRow: rowData.id: ' + rowData.id);
        // let selectedMachine = {id_pogonska_masina: rowData.id, naziv: rowData.naziv};
        // this.props.setSelectedMachine(selectedMachine);
        this.props.navigator.push({
            title: 'Spisak kupaca',
            component: 'userDetails',
            passProps: {user: rowData}
        });
    }


    goOneStepBack() {
        // this.props.navigator.push({
        //     component: 'login'
        // });
        this.props.navigator.pop();
    };

    goToHomeScreen() {
        this.props.navigator.push({
        component: 'home'
         });
        //this.props.navigator.pop();
    };


    render() {
        return (
            <View style={styles.container}>
            <View
                    style={{
                        flexDirection: 'row',
                        backgroundColor: '#841584',
                        justifyContent: 'space-between',
                        height: 40
                    }}>
                       <TouchableHighlight onPress={this.goToHomeScreen.bind(this)} style={styles.rowElement}>

                            <View style={{padding: 13}}>
                                <Text style={{color: '#FFF'}}> Nazad </Text>
                            </View>
                        </TouchableHighlight>

                    <View>
                        <Text style={{fontSize: 19, padding: 10, color: '#fff'}}>UsersAll.js</Text>
                    </View>              


            </View>

                <ListView
                    style={styles.listView}
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData, sectionID, rowID) => this.renderRow(rowData, sectionID, rowID)}
                    //renderRow={(data) => <View><Text>{data}</Text></View>}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
                />


            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.appReducer.users,
        machinesFetching: state.appReducer.machinesFetching,
        machinesFetchingFailed: state.appReducer.machinesFetchingFailed
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUsers: () => dispatch(getUsers())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersAll);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    row: {
        flexDirection: 'row',
        marginRight: 10,
        padding: 15
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E'
    }
});