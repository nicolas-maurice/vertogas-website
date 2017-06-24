import React, { 
  PropTypes 
} from 'react';
import {
  connect,
} from 'react-redux';
import {
  Link,
} from 'react-router';
import {setOwner} from '../../../redux/actions'
import MenuItem from 'material-ui/MenuItem';

const styles = {
  menu: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
  }
}

const Menu = ({items, open,owner,setOwner}) => {
  return (<div style={styles.menu}>
      {
        items.map(item => (
          <MenuItem 
            key={item.name}
            className={item.type === owner.ownerType ? 'menu_item_selected':'menu_item'}
            primaryText={open ? item.name : null}
            leftIcon={open ? <item.icon /> : null}
            rightIcon={!open ? <item.icon /> : null}
            onClick={()=>{
               setOwner(owner.address,item.type)
            }}
            containerElement={<Link to={item.path} />}
            style={{
              color: "#fff"
            }}
          />
        )
      )
    }
  </div>
  )
}

Menu.propTypes = {
  open: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  open: state.ui.sidebarOpen,
  owner: state.owner
});

let actions = {
  setOwner
}

export default connect(
  mapStateToProps,
  actions
)(Menu);
