import  {  } from "react";

import {
  FiHome,
  FiUsers,
  FiBox,
  FiActivity,
  FiFileText,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import "./Sidebar.css";


const Sidebar = ({ active }) => {


  const items = [
    {
      name:"Overview",
      icon:<FiHome/>
    },
    {
      name:"Users",
      icon:<FiUsers/>
    },
    {
      name:"Blueprints",
      icon:<FiBox/>
    },
    {
      name:"System State",
      icon:<FiActivity/>
    },
    {
      name:"Logs",
      icon:<FiFileText/>
    },
    {
      name:"Settings",
      icon:<FiSettings/>
    }
  ];



  return (

    <aside className="sidebar">


      {/* Logo */}

      <div className="sidebar-logo">

        <div className="logo-circle">
          L
        </div>

        <span>
          Luma
        </span>

      </div>





      {/* Menu */}

      <div className="sidebar-menu">


        {
          items.map((item)=>(


            <div

              key={item.name}

              className={
                active === item.name
                ?
                "sidebar-link active"
                :
                "sidebar-link"
              }

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






      {/* Bottom */}

      <div className="sidebar-footer">


        <div className="sidebar-link logout">


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
