import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, onSnapshot } from "firebase/firestore";

const initialState = {
  userUid: null,
  userInfo: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserUid: (state, action) => {
      state.userUid = action.payload;
    },
  }

});

// Action creators are generated for each case reducer function
export const { setUserUid } = userSlice.actions;

// Export selectors for every attribute
export const selectUserUid = (state) => state.user.userUid;
export const selectUserInfo = (state) => state.user.userInfo;

// Export the reducer
export default userSlice.reducer;


/*
// Export asynchronous actions
export { fetchUserInfo };

extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    })
  }

// Asynchronous Thunk actions
const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (payload, { getState }) => {
    const uid = getState().user.userUid;
    const docRef = doc(getFirestore(), 'users', uid);
    const response = await getDoc(docRef);
    return response.data();
  }
)
*/