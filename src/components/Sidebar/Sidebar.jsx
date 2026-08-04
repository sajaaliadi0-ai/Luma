import {} from "react";
import { useNavigate } from "react-router-dom";

import {
  FiHome,
  FiUsers,
  FiBox,
  FiActivity,
  FiFileText,
  FiSettings,
  FiLogOut
} from "react-icons/fi";

import "./Sidebar.css";


const Sidebar = ({ active }) => {


  const navigate = useNavigate();


  // قراءة صلاحية المستخدم
  const role = localStorage.getItem("role");



  const adminItems = [

    {
      name:"Overview",
      path:"/Overview",
      icon:<FiHome/>
    },


    {
      name:"Users",
      path:"/Users",
      icon:<FiUsers/>
    },


    {
      name:"Blueprints",
      path:"/BlueprintsAdmen",
      icon:<FiBox/>
    },


    {
      name:"Logs",
      path:"/Logs",
      icon:<FiFileText/>
    },

     {
 name:"System State",
      path:"/",
      icon:<FiActivity/>
    },

    {
      name:"Settings",
      path:"/Settings",
      icon:<FiSettings/>
    }  

  ];






  const superAdminItems = [

    {
      name:"Overview",
      path:"/",
      icon:<FiHome/>
    },


    {
      name:"Users",
      path:"/Users",
      icon:<FiUsers/>
    },


    {
      name:"Blueprints",
      path:"/BlueprintsAdmen",
      icon:<FiBox/>
    },


   

    {
      name:"Logs",
      path:"/Logs",
      icon:<FiFileText/>
    },
 {
      name:"System State",
      path:"/",
      icon:<FiActivity/>
    },


    {
      name:"Settings",
      path:"/Settings",
      icon:<FiSettings/>
    }

  ];





  const menuItems =
  role === "superadmin"
  ?
  superAdminItems
  :
  adminItems;







  const logout = ()=>{


    localStorage.removeItem("token");

    localStorage.removeItem("role");


    navigate("/login");


  };







return (


<aside className="sidebar">



<div className="sidebar-logo">


<div className="logo-circle">

L

</div>


<span>

Luma

</span>


</div>







<div className="sidebar-menu">



{

menuItems.map(item=>(


<div


key={item.name}


className={

active === item.name

?

"sidebar-link active"

:

"sidebar-link"

}



onClick={()=>navigate(item.path)}


>


<span className="icon">

{item.icon}

</span>



<span>

{item.name}

</span>



</div>


))


}



</div>








<div className="sidebar-footer">


<div

className="sidebar-link logout"

onClick={logout}

>


<span className="icon">

<FiLogOut/>

</span>


<span>

Logout

</span>


</div>


</div>





</aside>


);


};


export default Sidebar;