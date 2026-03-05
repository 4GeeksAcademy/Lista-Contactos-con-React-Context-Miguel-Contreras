export const initialStore = () => {
  const saved = localStorage.getItem("mis_contactos");
  return {
    contacts: saved ? JSON.parse(saved) : []
  };
};

export const storeReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case "add_contact":
      newState = { ...state, contacts: [...state.contacts, action.payload] };
      break;
    case "delete_contact":
      newState = { ...state, contacts: state.contacts.filter((_, i) => i !== action.payload) };
      break;
    case "update_contact":
  newState = { 
    ...state, 
    contacts: state.contacts.map((c, i) => 
      i === action.payload.index ? action.payload.contact : c
    ) 
  };
  break;
  case "load_contacts":
    newState = { ...state, contacts: action.payload };
    break;
    default:
      return state;
  }
  localStorage.setItem("mis_contactos", JSON.stringify(newState.contacts));
  return newState;
};

export default storeReducer; 