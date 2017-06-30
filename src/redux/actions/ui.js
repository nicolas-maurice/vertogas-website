/**
 * ui actions
 */

/* Actions related to sidebar visibility */
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR,
});

export const SET_SIDEBAR_VISIBILITY = 'SET_SIDEBAR_VISIBILITY';
export const setSidebarVisibility = (isOpen) => ({
  type: SET_SIDEBAR_VISIBILITY,
  payload: isOpen,
});

/* Actions related to userbox visibility */
export const TOGGLE_USER_BOX = 'TOGGLE_USER_BOX';
export const toggleUserBox = () => ({
  type: TOGGLE_USER_BOX,
});

export const SET_USER_BOX_VISIBILITY = 'SET_USER_BOX_VISIBILITY';
export const setUserBoxVisibility = (isOpen) => ({
  type: SET_USER_BOX_VISIBILITY,
  payload: isOpen,
});


export const SELECT_POWER_PLANT = "SELECT_POWER_PLANT";
export const selectPowerPlant=(powerPlant)=>({
  type:SELECT_POWER_PLANT,
  payload: powerPlant
})

export const OPEN_ADD_POWERPLANT_MODAL = "OPEN_ADD_POWERPLANT_MODAL";
export const openAddPowerPlantModal=()=>({
  type:OPEN_ADD_POWERPLANT_MODAL
})

export const CLOSE_ADD_POWERPLANT_MODAL = "CLOSE_ADD_POWERPLANT_MODAL";
export const closeAddPowerPlantModal=()=>({
  type:CLOSE_ADD_POWERPLANT_MODAL
})