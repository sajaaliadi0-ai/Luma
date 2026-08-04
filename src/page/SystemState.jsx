import { useCallback, useEffect, useState } from "react";
import {
  FiCpu,
  FiDatabase,
  FiServer,
  FiActivity,
  FiRefreshCw,
  FiCheckCircle,
  FiAlertTriangle,
  FiXCircle
} from "react-icons/fi";

import { useTranslation } from "../i18n";

import Sidebar from "../components/Sidebar/Sidebar";

import "../css/SystemState.css";



const SystemState = () => {


const { t } = useTranslation();



const [stats,setStats] = useState(null);

const [loading,setLoading] = useState(true);





const fetchStats = useCallback(async ()=>{

  try {

    setLoading(true);


    const response = await fetch(
      "/api/superadmin/system-stats"
    );


    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }


    const data = await response.json();


    setStats(data);


  }

  catch(error){

    console.log(error);

  }

  finally{

    setLoading(false);

  }


},[]);





useEffect(() => {

  const load = async () => {
    await fetchStats();
  };

  load();

}, [fetchStats]);






if(loading)
{

return (

<div className="loading-page">

{t("loadingSystemData")}

</div>

);

}








const statusIcon=(status)=>{


if(status==="Running")

return <FiCheckCircle/>;


if(status==="Warning")

return <FiAlertTriangle/>;


return <FiXCircle/>;


};









return (


<div className="dashboard-layout">



<Sidebar active={t("systemState")}/>





<div className="page-content">



<div className="system-page">







<div className="system-header">


<div>


<h1>
{t("systemState")}
</h1>


<p>
{t("systemStateDescription")}
</p>


</div>





<button

className="refresh-btn"

onClick={fetchStats}

>


<FiRefreshCw/>

{t("refresh")}


</button>




</div>









<div className="system-cards">







<div className="system-card">


<div className="card-icon purple">

<FiServer/>

</div>


<div>

<span>
{t("totalServices")}
</span>


<h2>

{stats?.totalServices ?? 0}

</h2>


</div>


</div>










<div className="system-card">


<div className="card-icon green">

<FiActivity/>

</div>


<div>

<span>
{t("systemHealth")}
</span>


<h2>

{stats?.systemHealth ?? 0}%

</h2>


</div>


</div>










<div className="system-card">


<div className="card-icon orange">

<FiCpu/>

</div>


<div>

<span>
{t("cpuUsage")}
</span>


<h2>

{stats?.cpuUsage ?? 0}%

</h2>


</div>


</div>










<div className="system-card">


<div className="card-icon blue">

<FiDatabase/>

</div>


<div>

<span>
{t("memoryUsage")}
</span>


<h2>

{stats?.memoryUsage ?? 0}%

</h2>


</div>


</div>






</div>









<div className="resources-card">


<h2>

{t("systemResources")}

</h2>









<div className="progress-item">


<div>

<span>

{t("cpu")}

</span>


<b>

{stats?.cpuUsage ?? 0}%

</b>


</div>




<div className="progress">


<div

style={{

width:`${stats?.cpuUsage ?? 0}%`

}}


/>


</div>


</div>









<div className="progress-item">


<div>

<span>

{t("memory")}

</span>


<b>

{stats?.memoryUsage ?? 0}%

</b>


</div>




<div className="progress">


<div

style={{

width:`${stats?.memoryUsage ?? 0}%`

}}


/>


</div>


</div>









<div className="progress-item">


<div>

<span>

{t("storage")}

</span>


<b>

{stats?.storageUsage ?? 0}%

</b>


</div>




<div className="progress">


<div

style={{

width:`${stats?.storageUsage ?? 0}%`

}}


/>


</div>


</div>






</div>









<div className="services-table">


<h2>

{t("servicesStatus")}

</h2>







<table>


<thead>


<tr>

<th>
{t("service")}
</th>


<th>
{t("status")}
</th>


<th>
{t("uptime")}
</th>


<th>
{t("load")}
</th>


</tr>


</thead>









<tbody>


{

stats?.services?.map(service=>(



<tr key={service.id}>


<td>

{service.name}

</td>






<td>


<span

className={

`service-status ${service.status?.toLowerCase()}`

}


>


{statusIcon(service.status)}


{

service.status === "Running"

? t("running")

: service.status === "Warning"

? t("warning")

: service.status

}



</span>


</td>







<td>

{service.uptime}

</td>







<td>

{service.load}

</td>






</tr>



))


}



</tbody>



</table>





</div>









</div>



</div>



</div>



);


};



export default SystemState;