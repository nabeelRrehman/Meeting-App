import React, { Component } from 'react';
import firebase from '../../Config/Firebase/firebase'
import { Checkbox, Button } from '@material-ui/core';
import './profile.css'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class Profile extends Component {
    constructor() {
        super()

        this.state = {
            data: ['Juice', 'Coffee', 'Cocktail'],
            timeDuration: ['20 min', '60 min', '120 min'],
            beverages: [],
            checkTimeDuration: []
        }
    }


    handleCheck(x) {
        const { beverages } = this.state
        if (beverages.indexOf(x) !== -1) {
            beverages.splice(beverages.indexOf(x), 1)
            this.setState({ beverages }, () => {
                console.log(this.state.beverages)
            })
        } else {
            beverages.push(x);
            this.setState({ beverages }, () => {
                console.log(this.state.beverages)
            })
        }
    }

    handleCheckTime(x) {
        const { checkTimeDuration } = this.state
        if (checkTimeDuration.indexOf(x) !== -1) {
            checkTimeDuration.splice(checkTimeDuration.indexOf(x), 1)
            this.setState({ checkTimeDuration }, () => {
                console.log(this.state.checkTimeDuration)
            })
        } else {
            checkTimeDuration.push(x)
            this.setState({ checkTimeDuration }, () => {
                console.log(this.state.checkTimeDuration)
            })
        }
    }

    next() {
        const user = localStorage.getItem('userUid')
        const {beverages,checkTimeDuration} = this.state
        if(!beverages.length || !checkTimeDuration.length){
            console.log('please select')
        }else{
            const profile = {
                beverages : beverages,
                timeDuration : checkTimeDuration
            }
            firebase.database().ref('/users/'+user+'/profile/').set(profile)
            .then(()=>{
                console.log('profile added')
            })
        }
    }

    render() {
        const { classes } = this.props

        const { data, timeDuration } = this.state
        return (
            <div>
                <h1>Choose Beverages</h1>
                {
                    data.map(x => {
                        return (
                            <div className='checkbox'>
                                <Checkbox label={x} key={x.toString()} onChange={() => this.handleCheck(x)} />
                                <p>{x}</p>
                            </div>
                        )
                    })
                }
                <h1>Duration Of Meeting</h1>
                {
                    timeDuration.map(items => {
                        return (
                            <div className='checkbox'>
                                <Checkbox label={items} key={items.toString()} onChange={() => this.handleCheckTime(items)} />
                                <p>{items}</p>
                            </div>
                        )
                    })
                }
                <Button color='primary' onClick={()=>this.next()} variant={'contained'} className={classes.button}>Next</Button>
            </div>
        );
    }
}


Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);  
