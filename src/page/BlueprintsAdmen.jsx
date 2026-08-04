import { useEffect, useState } from "react";

import {
  FiSearch,
  FiPlus,
  FiMoreVertical,
  FiChevronLeft,
  FiChevronRight,
  FiBox,
  FiCheckCircle,
  FiClock,
  FiAlertCircle
} from "react-icons/fi";


import Sidebar from "../components/Sidebar/Sidebar";

import { useTranslation } from "../i18n";
import "../css/BlueprintsAdmen.css";


const Blueprints = () => {


const { t } = useTranslation();


const [blueprints,setBlueprints] = useState([]);

const [activeTab,setActiveTab] = useState("All");

const [search,setSearch] = useState("");

const [setShowModal] = useState(false);

const [currentPage,setCurrentPage] = useState(1);


const itemsPerPage = 5;



const tabs = [
  {
    value:"All",
    label:t("all")
  },
  {
    value:"Active",
    label:t("active")
  },
  {
    value:"Building",
    label:t("building")
  },
  {
    value:"Completed",
    label:t("completed")
  },
  {
    value:"Failed",
    label:t("failed")
  }
];




// Get Blueprints From Backend

useEffect(()=>{


const role = localStorage.getItem("role");


const api =
role === "superadmin"
?
"/api/superadmin/blueprints"
:
"/api/admin/blueprints";



fetch(api)

.then(res=>res.json())

.then(data=>{

setBlueprints(data);

})

.catch(err=>{

console.log(err);

});


},[]);







const deleteBlueprint=(id)=>{


setBlueprints(

blueprints.filter(

item=>item.id !== id

)

);


};








const filteredBlueprints = blueprints.filter(item=>{


const searchMatch =

item.name
?.toLowerCase()
.includes(

search.toLowerCase()

);



const tabMatch =

activeTab==="All"

||

item.status===activeTab;



return searchMatch && tabMatch;


});








const indexOfLastItem =
currentPage * itemsPerPage;


const indexOfFirstItem =
indexOfLastItem - itemsPerPage;



const currentBlueprints =

filteredBlueprints.slice(

indexOfFirstItem,

indexOfLastItem

);




const totalPages = Math.ceil(

filteredBlueprints.length /

itemsPerPage

);








return (


<div className="dashboard-layout">


<Sidebar active="Blueprints"/>



<div className="page-content">


<div className="blueprints-page">





<div className="blueprints-header">


<div>


<h1>

{t("blueprints")}

</h1>



<p>

{t("blueprintsDescription")}

</p>


</div>





<button

className="new-blueprint-btn"

onClick={()=>setShowModal(true)}

>

<FiPlus/>

{t("newBlueprint")}

</button>


</div>









<div className="stats-container">





<div className="stat-card">


<div className="stat-icon purple">

<FiBox/>

</div>



<div>


<span>

{t("totalBlueprints")}

</span>


<h2>

{blueprints.length}

</h2>


</div>


</div>








<div className="stat-card">


<div className="stat-icon green">

<FiCheckCircle/>

</div>



<div>


<span>

{t("active")}

</span>



<h2>


{

blueprints.filter(

b=>b.status==="Active"

).length

}


</h2>



</div>


</div>









<div className="stat-card">


<div className="stat-icon orange">

<FiClock/>

</div>



<div>


<span>

{t("building")}

</span>



<h2>


{

blueprints.filter(

b=>b.status==="Building"

).length

}


</h2>



</div>


</div>








<div className="stat-card">


<div className="stat-icon red">

<FiAlertCircle/>

</div>



<div>


<span>

{t("failed")}

</span>



<h2>


{

blueprints.filter(

b=>b.status==="Failed"

).length

}


</h2>



</div>


</div>






</div>







<div className="blueprint-toolbar">





<div className="search-box">


<FiSearch/>



<input


placeholder={t("searchBlueprints")}


value={search}


onChange={(e)=>{

setSearch(e.target.value);

setCurrentPage(1);

}}


/>


</div>









<div className="tabs">


{

tabs.map(tab=>(


<button


key={tab.value}



className={

activeTab===tab.value

?

"active-tab"

:

""

}



onClick={()=>{

setActiveTab(tab.value);

setCurrentPage(1);

}}


>


{tab.label}


</button>


))


}



</div>



</div>
<div className="blueprints-table-wrapper">


<table className="blueprints-table">


<thead>

<tr>

<th>
{t("blueprint")}
</th>


<th>
{t("owner")}
</th>


<th>
{t("status")}
</th>


<th>
{t("updated")}
</th>


<th>
{t("action")}
</th>


</tr>

</thead>





<tbody>


{

currentBlueprints.map(item=>(


<tr key={item.id}>


<td>


<div className="blueprint-info">



<div className="blueprint-logo">


{

item.name?.charAt(0)

}


</div>





<div>


<h4>

{item.name}

</h4>



<p>

{item.description}

</p>



</div>



</div>


</td>






<td>

{item.owner}

</td>






<td>



<span

className={

`status ${item.status?.toLowerCase()}`

}


>


{t(item.status?.toLowerCase())}


</span>



</td>






<td>

{item.updated}

</td>






<td>



<button


className="action-btn"


onClick={()=>deleteBlueprint(item.id)}


>


<FiMoreVertical/>


</button>



</td>





</tr>


))


}



</tbody>



</table>



</div>









<div className="pagination">





<button


onClick={()=>{


if(currentPage > 1)

setCurrentPage(currentPage - 1)


}}



>


<FiChevronLeft/>


</button>








{

Array.from(

{length:totalPages},

(_,index)=>(



<span


key={index}


className={


currentPage === index + 1

?

"page-active"

:

""


}



onClick={()=>setCurrentPage(index + 1)}


>


{index + 1}



</span>



)


)



}








<button



onClick={()=>{


if(currentPage < totalPages)

setCurrentPage(currentPage + 1)



}}



>


<FiChevronRight/>


</button>






</div>







</div>


</div>


</div>


);


};



export default Blueprints;