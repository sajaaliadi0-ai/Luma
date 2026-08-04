import { useEffect, useState } from "react";

import api from "../api/api";

import Sidebar from "../components/Sidebar/Sidebar";

import "../css/Users.css";



function User({ dark }) {


const [users,setUsers] = useState([]);

const [loading,setLoading] = useState(true);

const [error,setError] = useState("");

const [search,setSearch] = useState("");

const [selectedUser,setSelectedUser] = useState(null);






// ================= GET USERS =================


const fetchUsers = async()=>{


try{


setLoading(true);

setError("");



const response = await api.get("/users");



const data = response?.data;



if(Array.isArray(data)){

setUsers(data);

}

else if(Array.isArray(data?.users)){

setUsers(data.users);

}

else if(Array.isArray(data?.data)){

setUsers(data.data);

}

else{

setUsers([]);

}



}

catch(err){


console.error(
"Failed to fetch users:",
err
);



setError(

err?.response?.data?.message ||

"Failed to load users. Please try again."

);


}


finally{


setLoading(false);


}


};







useEffect(()=>{

  const loadUsers = async()=>{

    await fetchUsers();

  };


  loadUsers();


},[]);








// ================= HELPERS =================



const filteredUsers = users.filter((user)=>{


const value = search.toLowerCase();



return (

String(user?.name || "")

.toLowerCase()

.includes(value)


||

String(user?.email || "")

.toLowerCase()

.includes(value)


||

String(user?.role || "")

.toLowerCase()

.includes(value)


);


});







const getUserName=(user)=>{


return (

user?.name ||

user?.username ||

`${user?.firstName || ""} ${user?.lastName || ""}`.trim()

||

"Unknown User"

);


};






const getUserRole=(user)=>{


return (

user?.role ||

user?.userRole ||

"User"

);


};






const getUserStatus=(user)=>{


return (

user?.status ||

(user?.isActive ? "Active":"Inactive")

);


};






const getInitial=(user)=>{


return getUserName(user)

.charAt(0)

.toUpperCase();


};








return (

<div className={`dashboard-layout ${dark ? "dark":""}`}>



{/* ================= SIDEBAR ================= */}


<Sidebar active="Users"/>





{/* ================= PAGE CONTENT ================= */}



<div className="page-content">





<header className="user-header">


<div>


<h1>

Users

</h1>


<p>

Manage and monitor LUMA users.

</p>


</div>





<button

className="user-refresh-button"

onClick={fetchUsers}

disabled={loading}

>


↻

<span>

{
loading
?
"Loading..."
:
"Refresh"
}

</span>


</button>



</header>








{/* ================= STATS ================= */}



<section className="user-stats">



<div className="user-stat-card">


<div className="user-stat-icon user-purple">

♙

</div>



<div>

<span>

Total Users

</span>


<h2>

{users.length}

</h2>


</div>


</div>






<div className="user-stat-card">


<div className="user-stat-icon user-green">

✓

</div>



<div>


<span>

Active Users

</span>



<h2>

{

users.filter(

user=>

String(getUserStatus(user))

.toLowerCase()

==="active"

).length

}

</h2>


</div>


</div>






<div className="user-stat-card">


<div className="user-stat-icon user-orange">

◉

</div>



<div>


<span>

Inactive Users

</span>



<h2>

{

users.filter(

user=>

String(getUserStatus(user))

.toLowerCase()

!=="active"

).length

}

</h2>


</div>


</div>






<div className="user-stat-card">


<div className="user-stat-icon user-blue">

⌕

</div>



<div>


<span>

Search Results

</span>



<h2>

{filteredUsers.length}

</h2>


</div>


</div>





</section>
{/* ================= USERS TABLE ================= */}


<section className="user-content-card">



<div className="user-content-header">


<div>

<h2>

All Users

</h2>


<p>

View registered users and their information.

</p>


</div>





<div className="user-search-wrapper">


<span className="user-search-icon">

⌕

</span>



<input

type="text"

placeholder="Search users..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>



</div>



</div>








{error && (


<div className="user-error">


<span>

{error}

</span>



<button onClick={fetchUsers}>

Try Again

</button>


</div>


)}








{

loading ? (



<div className="user-loading">


<div className="user-spinner"></div>


<p>

Loading users...

</p>


</div>



)

:

filteredUsers.length===0 ? (



<div className="user-empty">


<div className="user-empty-icon">

♙

</div>



<h3>

No users found

</h3>



<p>

{

search

?

"No users match your search."

:

"There are no users to display."

}

</p>



</div>




)

:

(



<div className="user-table-wrapper">



<table className="user-table">



<thead>


<tr>

<th>

User

</th>


<th>

Email

</th>


<th>

Role

</th>


<th>

Status

</th>


<th>

Action

</th>


</tr>


</thead>






<tbody>



{

filteredUsers.map((user,index)=>{


const name=getUserName(user);

const role=getUserRole(user);

const status=getUserStatus(user);



return (



<tr key={user?.id || user?._id || index}>


<td>


<div className="user-info">


<div className="user-avatar">


{getInitial(user)}


</div>




<div>


<strong>

{name}

</strong>



{

user?.username &&

(

<small>

@{user.username}

</small>

)

}


</div>



</div>



</td>






<td>


<span className="user-email">


{

user?.email || "—"

}


</span>


</td>







<td>


<span className="user-role">


{role}

</span>


</td>







<td>


<span


className={

`user-status

${

String(status)

.toLowerCase()

==="active"

?

"user-status-active"

:

"user-status-inactive"

}`

}



>


<span className="user-status-dot"></span>


{status}


</span>



</td>








<td>



<button


className="user-view-button"


onClick={()=>setSelectedUser(user)}


>


View


</button>



</td>







</tr>



)


})


}




</tbody>



</table>



</div>




)

}




</section>







</div>









{/* ================= USER DETAILS MODAL ================= */}



{

selectedUser && (



<div


className="user-modal-overlay"


onClick={()=>setSelectedUser(null)}


>



<div


className="user-modal"


onClick={(e)=>e.stopPropagation()}


>





<div className="user-modal-header">


<div>


<h2>

User Details

</h2>



<p>

View user information.

</p>



</div>




<button


className="user-modal-close"


onClick={()=>setSelectedUser(null)}


>


×

</button>



</div>








<div className="user-modal-profile">



<div className="user-modal-avatar">


{getInitial(selectedUser)}


</div>




<div>


<h3>

{getUserName(selectedUser)}

</h3>


<p>

{selectedUser?.email || "—"}

</p>



</div>



</div>








<div className="user-details-grid">





<div className="user-detail-item">


<span>

ID

</span>


<strong>


{

selectedUser?.id ||

selectedUser?._id ||

"—"

}


</strong>



</div>








<div className="user-detail-item">


<span>

Role

</span>


<strong>

{getUserRole(selectedUser)}

</strong>



</div>








<div className="user-detail-item">


<span>

Status

</span>


<strong>

{getUserStatus(selectedUser)}

</strong>



</div>








<div className="user-detail-item">


<span>

Username

</span>


<strong>


{

selectedUser?.username || "—"

}


</strong>



</div>






</div>









<button


className="user-modal-done"


onClick={()=>setSelectedUser(null)}


>


Close


</button>






</div>



</div>



)

}






</div>

);


}



export default User;