import React, { 
  PropTypes, 
} from 'react';
import Paper from 'material-ui/Paper';
import { 
  connect, 
} from 'react-redux';

const styles = {
  sidebarOpen: {
    flex: '0 0 200px',
    marginLeft: 0,
    order: -1,
    transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    background: "#222",
    color: "#fff",
    borderRadius: 0
  },
  sidebarClosed: {
    flex: '0 0 12em',
    marginLeft: '-8.5em',
    order: -1,
    transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    background: "#222",
    color: "#fff",
    borderRadius: 0
  },
};

const SideBar = (props) => {
  const { open, children } = props;
  return (
    <Paper style={open ? styles.sidebarOpen : styles.sidebarClosed} zDepth={3}>
      { children }
    </Paper>
  );
};

SideBar.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node,
}

const mapStateToProps = (state) => ({
  open: state.ui.sidebarOpen,
});

export default connect(
  mapStateToProps
)(SideBar);
