// routing
import Link from 'next/link'
// material-ui components
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
// material-ui icons
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
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

class TableToolbar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes, selectedUsers, searchTerm, setSearchTerm, handleDelete } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    /* MOBILE CRUD MENU */
    const renderMobileMenu = (selectedUsers) => (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <PersonAddIcon />
          </IconButton>
          <p>Add</p>
        </MenuItem>
        {selectedUsers.length === 1 ?
          <MenuItem>
            <IconButton color="inherit">
              <EditIcon />
            </IconButton>
            <p>Edit</p>
          </MenuItem> : ''
        }
        {selectedUsers.length >= 1 ?
          <MenuItem>
            <IconButton color="inherit">
              <DeleteIcon />
            </IconButton>
            <p>Delete</p>
          </MenuItem> : ''
        }
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              W3-Users
            </Typography>
            {/* NAME FILTER INPUT */}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase /* search how to handle onSubmit */
                placeholder="Search by name…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.grow} />
            {/* DESKTOP CRUD ICONS*/}
            <div className={classes.sectionDesktop}>
              <Link href={`userCrud`}
                as={`/user/create`}>
                <IconButton color="inherit">
                  <PersonAddIcon />
                </IconButton>
              </Link>
              {selectedUsers.length === 1 ?
                <Link href={`/user/userCrud?id=${selectedUsers[0]}`}
                  as={`/user/edit/${selectedUsers[0]}`}>
                  <IconButton color="inherit">
                    <EditIcon />
                  </IconButton>
                </Link> : ''
              }
              {selectedUsers.length >= 1 ?
                <IconButton color="inherit" onClick={(e) => handleDelete(selectedUsers)}>
                  <DeleteIcon />
                </IconButton> : ''
              }
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu(selectedUsers)}
      </div>
    );
  }
}

TableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableToolbar);
