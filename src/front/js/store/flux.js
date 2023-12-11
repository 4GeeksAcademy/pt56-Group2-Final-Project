const apiUrl = process.env.BACKEND_URL;
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			user: null,
			users: [],
			posts: [],
			comments: [],
			friends:[],
			loggedInAs: [],
			feed: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getUsers: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(apiUrl + "/api/users")
					const data = await resp.json()
					setStore({ users: data })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			//do we use this function:
			goPrivate: async ()=> {
				try{
				  let response = await fetch(apiUrl+"/api/private",{
				  headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}		
				})
				let data = await response.json()
				if (data && data != undefined) {
					  setStore({loggedInAs:data.logged_in_as})
						console.log("congrats user "+data.logged_in_as+" you have access")
						return true;
					  }
		  
				}catch(error){
				  console.log(error);
				}
				  
				},
			//do we use this function:
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			authenticateEditProfile: (form, navigate) => {
				const store = getStore();
				const url = apiUrl + "/api/editprofile"
				fetch(url, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + store.token
					},
					body: JSON.stringify({
						"first_name": form.first_name,
						"last_name": form.last_name,
						"perm_location": form.permanent_location,
					})
				})
				.then(resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					if(!resp.ok){
						navigate("/login");
						alert("Please login to continue");
												
					}
					
					//console.log(resp.text()); // will try return the exact result as string
					return resp.json();
				})
				.then(data => {
					getActions().authenticateUser(navigate)
					console.log(data);
					
				})
				.catch(error => {
					//error handling
					console.log(error);
				})
			},

			authenticateAddPlace: (typeOfList, input_value, navigate) => {
				const store = getStore();
				const url = apiUrl + "/api/addplaceprofile"
				console.log("VAR:", typeOfList )
				console.log("INPUT:", input_value)
				fetch(url, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + store.token
					},
					body: JSON.stringify({
						[typeOfList]: input_value
					})
				})
				.then(resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					if(!resp.ok){
						navigate("/login");
						alert("Please login to continue");
												
					}
					
					//console.log(resp.text()); // will try return the exact result as string
					return resp.json();
				})
				.then(data => {
					getActions().authenticateUser(navigate)
					console.log(data);
					
				})
				.catch(error => {
					//error handling
					console.log(error);
				})
			},

			signUp: async (form, navigate) => {
				const url = apiUrl+"/api/signup";
				await fetch(url, {
					method: "Post",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						"first_name": form.first_name,
						"last_name": form.last_name,					
						"email": form.email,
                      	"password": form.password,
					})					
				})
				.then(async resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					if(!resp.ok) {
						alert("user already exists");
						return false;
					}
					await resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
					navigate('/login');														
				})
				.catch(error => {
					//error handling
					console.log(error);
				})
			},

			login: (form, navigate) => {
				const store = getStore();
				const url = apiUrl+"/api/token";
				fetch(url, {
					method: "Post",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({						
						"email": form.email,
                      	"password": form.password
					})					
				})
				.then(async resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					if(!resp.ok){
						alert("Wrong email or password");
						return false;						
					}
					//console.log(resp.text()); // will try return the exact result as string
					const data = await resp.json();
					sessionStorage.setItem("token", data.token);
					setStore({token: data.token});
					
					console.log(store.token);
					navigate('/profile');
				})				
				.catch(error => {
					//error handling
					console.log(error);
				})
			},

			logout: (navigate) => {			
				setStore({user:null});
				sessionStorage.removeItem("token");
				setStore({token: null});
				navigate("/");
			},

			authenticateUser: (navigate) => {
				const store = getStore();
				console.log(store.token);
				const url = apiUrl+"/api/private"
				fetch(url, {
					method: "GET",
					headers: {
						"Authorization": "Bearer " + store.token
					}
				})
				.then(resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					if(!resp.ok){
						navigate("/login");
						alert("Please login to continue");
												
					}
					
					//console.log(resp.text()); // will try return the exact result as string
					return resp.json();
				})
				.then(data => {
					setStore({user: data});
					console.log(data);
					
				})
				.catch(error => {
					//error handling
					console.log(error);
				})
			},

			tokenFromStore: () => {
				let store = getStore();
				const token = sessionStorage.getItem("token");
				if (token && token!= null && token!=undefined) setStore({token: token});
			},

			authenticateFeed: (navigate) => {
				const store = getStore();
				console.log(store.token);
				const url = apiUrl + "/api/feed"
				fetch(url, {
					method: "GET",
					headers: {
						"Authorization": "Bearer " + store.token
					}
				})
				.then(resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					if(!resp.ok){
						navigate("/login");
						alert("Please login to continue");
												
					}
					
					//console.log(resp.text()); // will try return the exact result as string
					return resp.json();
				})
				.then(data => {
					setStore({feed: data});
					console.log(data);
					
				})
				.catch(error => {
					//error handling
					console.log(error);
				})
			},
			
			addNewPost: async (post, navigate) => {
				const store = getStore();
			  
				// Ensure the user is logged in
				if (!store.token) {
				  alert("Please log in to add a new post.");
				  navigate("/login"); // Navigate to the login page
				  return;
				}

				for (let key of post.keys()) {
				  console.log(key, post.get(key));
				}
			  
				try {
				  const response = await fetch(apiUrl + "/api/createpost", {
					method: "POST",
					headers: {
					  Authorization: `Bearer ${store.token}`,
					},
					body: post,
				  });
			  
				  if (response.ok) {
					alert("Post added successfully!");
					navigate("/myposts");
					// Update the posts in the store, if needed
					getActions().getPosts();
				  } else {
					alert("Error adding post. Please try again.");
				  }
				} catch (error) {
				  console.error("Error adding post:", error);
				}
			  },

			getPosts: async () => {
				try {
					const response = await fetch(apiUrl + "/api/posts");
					if (response.ok) {
					const data = await response.json();
					setStore({ posts: data });
					} else {
					console.error("Error fetching posts:", response.statusText);
					}
				} catch (error) {
					console.error("Error fetching posts:", error);
				}
			},

			authenticateFriends: (navigate) => {
				const store = getStore();
				console.log(store.token);
				const url = apiUrl + "/api/friends"
				fetch(url, {
					method: "GET",
					headers: {
						"Authorization": "Bearer " + store.token
					}
				})
				.then(resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					if(!resp.ok){
						navigate("/login");
						alert("Please login to continue");
												
					}
					
					//console.log(resp.text()); // will try return the exact result as string
					return resp.json();
				})
				.then(data => {
					setStore({friends: data});					
				})
				.catch(error => {
					//error handling
					console.log(error);
				})
			},
			authenticatePosts: (navigate) => {
				const store = getStore();
				console.log(store.token);
				const url = apiUrl + "/api/posts"
				fetch(url, {
					method: "GET",
					headers: {
						"Authorization": "Bearer " + store.token
					}
				})
				.then(resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					if(!resp.ok){
						navigate("/login");
						alert("Please login to continue");
												
					}
					
					//console.log(resp.text()); // will try return the exact result as string
					return resp.json();
				})
				.then(data => {
					setStore({posts: data});
					console.log("DATA:", data);
					
				})
			  },
      
			  addFriend: (form, navigate) => {
				const store = getStore();
				const url = apiUrl+"/api/addfriend";
				fetch(url, {
					method: "Post",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + store.token
					},
					body: JSON.stringify({						
						"email": form.email,
						"first_name": form.first_name,
						"last_name": form.last_name,
					})					
				})
				.then(async resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					if(!resp.ok){
						alert("User doesn't exist");
						return false;						
					}
					//console.log(resp.text()); // will try return the exact result as string
					await resp.json();					
					navigate('/friends');
				})				
				.catch(error => {
					//error handling
					console.log(error);
				})
			},
			removeFriend: (friend, i, navigate) => {
				const store = getStore();
				const url = apiUrl+"/api/removefriend";
				fetch(url, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + store.token
					},
					body: JSON.stringify({						
						"friend": friend
					})					
				})
				.then(async resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					if(!resp.ok){
						alert("User doesn't exist");
						return false;						
					}
					//console.log(resp.text()); // will try return the exact result as string
					await resp.json();
					let newList = store.friends.filter((item)=> item != friend);
					setStore({friends: newList});
					navigate('/friends');
				})				
				.catch(error => {
					//error handling
					console.log(error);
				})
			},
			sendResetPasswordLink: async (email) => {
				const url = `${apiUrl}/api/forgotpassword`;
			  
				try {
				  const response = await fetch(url, {
					method: 'POST',
					headers: {
					  'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email }),
				  });
			  
				  if (response.ok) {
					const data = await response.json();
					console.log('Reset link sent successfully:', data);
				  } else {
					console.error('Error sending reset link:', response.statusText);
				  }
				} catch (error) {
				  console.error('Fetch error:', error);
				}
			  },
			  resetPassword: async (token, password) => {
				const url = `${apiUrl}/api/resetpassword`;
			  
				try {
				  const response = await fetch(url, {
					method: 'POST',
					headers: {
					  'Content-Type': 'application/json',
					},
					body: JSON.stringify({ token, password }),
				  });
			  
				  if (response.ok) {
					const data = await response.json();
					console.log('Password reset successful:', data);
				  } else {
					console.error('Error resetting password:', response.statusText);
				  }
				} catch (error) {
				  console.error('Fetch error:', error);
				}
			  },
			  validateResetToken: async (token) => {
				const url = `${apiUrl}/api/validatepasswordresettoken`;
			
				try {
				  const response = await fetch(url, {
					method: 'POST',
					headers: {
					  'Content-Type': 'application/json',
					},
					body: JSON.stringify({ token }),
				  });
			
				  if (response.ok) {
					const data = await response.json();
					console.log('Token validation successful:', data);
					return true; 
				  } else {
					console.error('Error validating reset token:', response.statusText);
					return false; 
				  }
				} catch (error) {
				  console.error('Fetch error:', error);
				  return false; 
				}
			  },
			
			
			  
						  
		}
	};
};

export default getState;
