import React, { Component } from 'react';
import firebase from '../Config/Firebase/firebase'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import Hidden from '@material-ui/core/Hidden';
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import History from '../History/History';
// import { mailFolderListItems, otherMailFolderListItems } from './tileData';


const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class Container extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    mobileOpen: false,
    request: []
  };

  componentDidMount() {
    const { request } = this.state
    const user = localStorage.getItem('userUid')

    firebase.database().ref('/meeting/').on('value', (snapShot) => {
      for (var key in snapShot.val()) {
        firebase.database().ref('/meeting/' + key + '/').on('child_added', (snaps) => {
          // console.log(snaps.key)
          if (key === user) {
            // console.log(key, 'key1')
            // console.log(user, 'user1')
            console.log(snaps.val().userUid)
            firebase.database().ref('/users/' + snaps.val().userUid + '/').on('value', (value) => {
              // console.log(value.val().profile, 'images')
              const obj = {
                User1Profile : value.val().profile,
                request: snaps.val()
              }
              request.push(obj)
              this.setState({ request }, () => {
                // console.log(this.state.request,'request here')
              })
            })
          }
        })
      }
    })
  }

  notificaton() {
    const { request } = this.state

    console.log(request)
    History.push({
      pathname: '/requests',
      state: {
        request: request
      }
    })
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  home() {
    History.push('/dashboard')
  }

  render() {
    const { anchorEl, mobileMoreAnchorEl, updatedProfile, homepage, request } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleClose}>Logout</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        {/* <MenuItem>
          <IconButton color="inherit">
            <Badge className={classes.margin} badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem> */}
        <MenuItem onClick={() => this.notificaton()}>
          <IconButton color="inherit">
            {
              request.length > 0 ?
                <Badge color="secondary" badgeContent={request && request.length}>
                  <NotificationsIcon />
                </Badge> :
                // <Badge color="secondary" badgeContent={request && request.length}>
                <NotificationsIcon />
              // </Badge>
            }
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        {/* <List>{mailFolderListItems}</List> */}
        <Divider />
        {/* <List>{otherMailFolderListItems}</List> */}
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={this.handleDrawerToggle} className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography onClick={() => this.home()} style={{ cursor: 'pointer' }} className={classes.title} variant="h6" color="inherit" noWrap>
              {this.props.name}
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {/* <IconButton color="inherit">
                <Badge className={classes.margin} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton> */}
              <IconButton color="inherit" onClick={() => this.notificaton()}>
                {
                  request.length > 0 ?
                    <Badge color="secondary" badgeContent={request && request.length}>
                      <NotificationsIcon />
                    </Badge> :
                    // <Badge color="secondary" badgeContent={request && request.length}>
                    <NotificationsIcon />
                  // </Badge>
                }
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
        {this.props.children}
      </div>
    );
  }
}
Container.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Container);