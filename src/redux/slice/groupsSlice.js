import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDoc, doc, getFirestore } from "firebase/firestore";
import { useSelector } from 'react-redux'
import { selectUserInfo } from './userSlice'
import { getAuth } from "firebase/auth";

const initialState = {
  groups: {},
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGroups.fulfilled, (state, action) => {
      state.groups = action.payload;
    })
  }
});


const fetchGroups = createAsyncThunk(
  'groups/fetchGroups',
  async (payload) => {
    try {
      console.log('executing fetchGroups')
      const userUid = getAuth().currentUser.uid;
      const userDocRef = doc(getFirestore(), 'users', userUid);
      const snapshot = await getDoc(userDocRef);
      const userInfo = snapshot.data();
      
      const groupsIds = userInfo.groups;
      const groupsDocRefs = groupsIds.map(groupId => doc(getFirestore(), 'groups', groupId));
      const groupsPromises = groupsDocRefs.map(async(groupDocRef) => {
        const snapshot = await getDoc(groupDocRef);
        return snapshot.data(); 
      })

      const groupsData = await Promise.all(groupsPromises);
      const groups = Object.assign(...groupsIds.map((groupId, i) => ({[groupId]: groupsData[i]})));
      return groups

    } catch(error) {
      console.log(error)
      return {}
    }
  } 
)

// Export selectors for every attribute
export const selectGroups = (state) => state.groups.groups;

// Export the reducer
export default groupsSlice.reducer;

// Export asynchronous actions
export { fetchGroups }