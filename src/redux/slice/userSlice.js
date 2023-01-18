import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";

const initialState = {
  userInfo: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    })

    builder.addCase(setUsernameAndFullname.fulfilled, (state, action) => {
      state.userInfo.username = action.payload.newUsername;
      state.userInfo.fullname = action.payload.newFullname;
    })
  }
});

const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo', 
  async (payload) => {
    const userUid = getAuth().currentUser.uid;
    const userDocRef = doc(getFirestore(), 'users', userUid);
    const snapshot = await getDoc(userDocRef);
    return snapshot.data();
  }
)

const setUsernameAndFullname = createAsyncThunk(
  'user/setUsernameAndFullname',
  async (payload) => {
    const userUid = getAuth().currentUser.uid;
    const userDocRef = doc(getFirestore(), 'users', userUid);    
    await updateDoc(userDocRef, {
      username: payload.newUsername,
      fullname: payload.newFullname
    });

    return payload
  }
)

// Action creators are generated for each case reducer function
// export const { setUserUid } = userSlice.actions;

// Export selectors for every attribute
export const selectUserInfo = (state) => state.user.userInfo;

// Export the reducer
export default userSlice.reducer;

// Export asynchronous actions
export { fetchUserInfo, setUsernameAndFullname }
