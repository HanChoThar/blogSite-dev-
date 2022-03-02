import { createStore } from 'vuex'
import {  doc ,query,orderBy, getDocs,deleteDoc, getDoc, updateDoc,  collection } from 'firebase/firestore'
import db from '../../firebase/firebaseInit'
import { getAuth } from 'firebase/auth'

export default createStore({
  state: {
    blogPosts: [],
    postLoaded: null,
    user: null,
    blogHTML: "Write your blog title here...",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUserName: null,
    profileId: null,
    profileInitials: null
  },
  getters: {
    blogPostsFeed(state) {
      return state.blogPosts.slice(0,2)
    },
    blogPostsCards(state) {
      return state.blogPosts.slice(2, 6)
    }
  },
  mutations: {
    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview
    },
    newBlogPost(state, payloa) {
      state.blogHTML = payloa
    },
    updateBlogTitle(state, payload) {
      state.blogTitle = payload
    },
    fileNameChange(state, payload) {
      state.blogPhotoName = payload
    },
    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload
    },
    filterBlogPost(state, payload) {
      state.blogPosts = state.blogPosts.filter(post => {
        return post.blogID !== payload
      })
    },
    setBlogState(state, payload) {
      state.blogTitle = payload.blogTitle,
      state.blogHTML = payload.blogHTML,
      state.blogPhotoFileURL = payload.blogCoverPhoto,
      state.blogPhotoName = payload.blogCoverPhotoName
    },
    toggleEditPost(state, payload) {
      state.editPost = payload
    },
    updateUser(state, payload) {
      state.user = payload
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id
      state.profileEmail = doc.data().email
      state.profileFirstName = doc.data().firstname
      state.profileLastName = doc.data().lastname
      state.profileUserName = doc.data().username
      // console.log(state.profileFirstName)
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") + 
        state.profileLastName.match(/(\b\S)?/g).join("");
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload
    },
    changeLastName(state, payload) {
      state.profileLastName = payload
    },
    changeUserName(state, payload) {
      state.profileUserName = payload
    },
  },
  actions: {
    async getCurrentUser({commit}){
      const dataBase = await doc(db, 'users', getAuth().currentUser.uid )
      const dbResults = await getDoc(dataBase)
      commit('setProfileInfo', dbResults)
      commit('setProfileInitials')
    },
    async updatePost({commit, dispatch}, payload) {
      commit('filterBlogPost', payload)
      await dispatch('getPost')
    },
    async delete({commit}, payload ) {
      const getData = await doc(db, 'blogPosts', payload)
      await deleteDoc(getData)
      commit('filterBlogPost', payload)
    },
    
    async getPost({state}) {
      const dataBase = await collection(db, 'blogPosts')
      const q = query(dataBase, orderBy('date', 'desc'))
      // const order = await orderBy(dataBase, 'date', 'desc')
      const dbResults = await getDocs(q)
      dbResults.forEach((doc) => {
        if(!state.blogPosts.some((post) => post.blogID === doc.id)) {
          const data = {
            blogID: doc.data().blogID,
            blogHTML: doc.data().blogHTML,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogTitle: doc.data().blogTitle,
            blogDate: doc.data().date,
            blogCoverPhotoName: doc.data().blogCoverPhotoName
          }
          state.blogPosts.push(data)
        }

        state.postLoaded = true
      }) 
    },
    async updateUserSetting({commit, state}) {
      const dataBase = await doc(db, 'users', state.profileId)
      await updateDoc(dataBase, {
        firstname: state.profileFirstName,
        lastname: state.profileLastName,
        username: state.profileUserName
      })
      commit('setProfileInitials')
    }
  },
  modules: {
  }
})
