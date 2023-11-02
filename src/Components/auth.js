// import {LocalStorageService} from "./base/LocalStorageService";
 
// let observers = [];
// const USER_KEY = 'user';
 
// function notifyObservers(user) {
//     // const cart = JSON.parse(StorageService.get(CART_KEY));
//     observers.forEach(o => {
//         o(user);
//     });
// }
 
// export const UsersService = {
 
//     subscribe(observer, receiveFirstState = true) {
//         // no more than one subscription
//         if (!observers.includes(observer)) {
//             observers.push(observer);
//             if (receiveFirstState) {
//                 const user = JSON.parse(LocalStorageService.get(USER_KEY)) || {};
//                 observer(user);
//             }
//         }
//     },
 
//     unsubscribe(observer) {
//         const index = observers.indexOf(observer);
//         if (index > -1)
//             observers.splice(index, 1);
//     },
 
//     isAuthenticated() {
//         if (typeof window === "undefined")
//             return false;
//         const user = LocalStorageService.get(USER_KEY);
//         return !!user;
//     },
 
//     authenticate(userObj) {
//         if (typeof window !== 'undefined') {
//             LocalStorageService.set(USER_KEY, JSON.stringify(userObj));
//         }
//         notifyObservers(userObj);
//     },
 
//     getToken() {
//         const user = LocalStorageService.get('user');
//         return user ? user.token : null;
//     },
 
//     saveUser(user) {
//         LocalStorageService.save('user', JSON.stringify(user));
//         notifyObservers(user);
//     },
 
//     getUser() {
//         return JSON.parse(LocalStorageService.get('user'));
//     },
 
//     clearSession() {
//         LocalStorageService.clear('user');
//         notifyObservers({});
//     },
 
//     isNotAuthenticated() {
//         return !this.isAuthenticated();
//     },
// };


// useEffect(() => {
    
//     axios.get("https://intra-deco.onrender.com/AssetCategories")
//       .then((response) => {
//         const assetCategories = response.data;
//         setAssetCategories(assetCategories);
//       })
//       .catch((error) => {
//       });
  
//     axios.get("https://intra-deco.onrender.com/Assets")
//       .then((response) => {
//         const assets = response.data;
//         setAssets(assets);
//       })
//       .catch((error) => {
        
//       });
//   }, []);

  

//   const handleCheckboxChange = (option, isAssetCategory) => {
//     console.log("Clicked option:", option);
  
//     if (isAssetCategory) {
//       setSelectedAssetCategory(option);
//     } else {
//       setSelectedAsset(option);
//     }
  
//     setUserData({
//       ...userData
//     });
//   };

  

//   <div className="assetCategoryCheckboxes">
//   {assetCategories.map((category) => (
//     <Checkbox
//       key={category.id}
//       checked={selectedAssetCategory === category.id}
//       onChange={() => handleCheckboxChange(category.id, true)}
//     />
//     <label>{category.assetCategoryName}</label>
//   ))}
// </div>

// <div className="assetCheckboxes">
//   {assets.map((asset) => (
//     <Checkbox
//       key={asset.id}
//       checked={selectedAsset === asset.id}
//       onChange={() => handleCheckboxChange(asset.id, false)}
//     />
//     <label>{asset.assetName}</label>
//   ))}
// </div>
