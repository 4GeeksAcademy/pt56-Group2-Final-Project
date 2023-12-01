const apiUrl = process.env.BACKEND_URL;
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			users: [],
			posts: [],
			comments: [],
			friends:[],
			loggedInAs: []
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

			login: async (email, password) => {
				try {
				  let response = await fetch(apiUrl + "/api/login", {
					method: "POST",
					headers: {
					  "Content-Type": "application/json",
					},
					body: JSON.stringify({ email: email, password: password }),
				  });
		
				  let data = await response.json();
		
				  if (data) {
					console.log(data.token);
					sessionStorage.setItem("token", data.token);
					sessionStorage.setItem("userID", data.user_id);
					return true;
				  }
				} catch (error) {
				  console.log(error);
				}
			  },

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
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
