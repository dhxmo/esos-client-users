export const OriginReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ORIGIN':
      return {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    default:
      return state;
  }
};
