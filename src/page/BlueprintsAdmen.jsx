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
  FiAlertCircle,
} from "react-icons/fi";

import api from "../api/api";
import Sidebar from "../components/Sidebar/Sidebar";

import { useTranslation } from "../i18n";
import "../css/BlueprintsAdmen.css";

const Blueprints = () => {

  const { t } = useTranslation();


  const [blueprints, setBlueprints] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  const [activeTab, setActiveTab] = useState("All");

  const [search, setSearch] = useState("");


  const [ setShowModal] = useState(false);


  const [currentPage, setCurrentPage] = useState(1);


  const itemsPerPage = 5;





  const tabs = [
    {
      value: "All",
      label: t("all")
    },
    {
      value: "Draft",
      label: t("draft")
    },
    {
      value: "Generating",
      label: t("generating")
    },
    {
      value: "Completed",
      label: t("completed")
    },
    {
      value: "Failed",
      label: t("failed")
    }
  ];



 useEffect(() => {
  const loadBlueprints = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);

      const response = await api.get("/admin/blueprints", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response?.data;

      if (Array.isArray(data)) {
        setBlueprints(data);
      } else if (Array.isArray(data?.blueprints)) {
        setBlueprints(data.blueprints);
      } else if (Array.isArray(data?.data)) {
        setBlueprints(data.data);
      } else {
        setBlueprints([]);
      }
    } catch (err) {
      console.error("Failed to load blueprints:", err);

      setError(
        err?.response?.data?.message ||
        err?.message ||
        t("blueprintsLoadError") ||
        "Failed to load blueprints"
      );
    } finally {
      setLoading(false);
    }
  };

  void loadBlueprints();
}, [t]);


 const reloadBlueprints = async () => {
  try {
    const response = await api.get("/admin/blueprints");

    const data = response?.data;

    if (Array.isArray(data)) {
      setBlueprints(data);
    } else if (Array.isArray(data?.blueprints)) {
      setBlueprints(data.blueprints);
    } else if (Array.isArray(data?.data)) {
      setBlueprints(data.data);
    } else {
      setBlueprints([]);
    }

  } catch (err) {
    console.error("Failed to reload blueprints:", err);

    setError(
      err?.response?.data?.message ||
      err?.message ||
      "Failed to reload blueprints"
    );
  }
};




  const cancelBlueprint = async (id) => {


    try {


      setBlueprints(prev =>
        prev.filter(
          item => item.id !== id
        )
      );



  
  try {
    setBlueprints((prev) =>
      prev.filter((item) => item.id !== id)
    );

    await api.post(`/blueprints/${id}/cancel`);

    await reloadBlueprints();

  } catch (err) {
    console.error("Cancel blueprint failed:", err);

    await reloadBlueprints();

    setError(
      err?.response?.data?.message ||
      err?.message ||
      "Failed to cancel blueprint"
    );
  }




      reloadBlueprints();



    } catch{

  reloadBlueprints();

}

  };




  const deleteBlueprint = async (id) => {


    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this blueprint?"
      );


    if (!confirmDelete)
      return;



    setBlueprints(prev =>
      prev.filter(
        item => item.id !== id
      )
    );



    try {


     
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this blueprint?"
  );

  if (!confirmDelete) return;

  setBlueprints((prev) =>
    prev.filter((item) => item.id !== id)
  );

  try {
    await api.delete(`/blueprints/${id}`);

    await reloadBlueprints();

  } catch (err) {
    console.error("Delete blueprint failed:", err);

    await reloadBlueprints();

    setError(
      err?.response?.data?.message ||
      err?.message ||
      "Failed to delete blueprint"
    );
  }




      reloadBlueprints();



    } catch{

  reloadBlueprints();

}


  };
    const filteredBlueprints = blueprints.filter((item) => {


    const title =
      item.title ||
      item.name ||
      "";


    const owner =
      item.owner?.name ||
      item.owner?.email ||
      item.owner ||
      "";



    const searchValue =
      search.toLowerCase();



    const searchMatch =
      title.toLowerCase().includes(searchValue)
      ||
      owner.toLowerCase().includes(searchValue);



    const statusMatch =
      activeTab === "All"
      ||
      item.status === activeTab;



    return searchMatch && statusMatch;


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



  const totalPages =
    Math.ceil(
      filteredBlueprints.length /
      itemsPerPage
    );





  return (

    <div className="dashboard-layout">


      <Sidebar active="Blueprints" />



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

              onClick={() =>
                setShowModal(true)
              }

            >

              <FiPlus />

              {t("newBlueprint")}


            </button>



          </div>





          <div className="stats-container">



            <div className="stat-card">


              <div className="stat-icon purple">

                <FiBox />

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

                <FiCheckCircle />

              </div>


              <div>


                <span>
                  {t("completed")}
                </span>



                <h2>

                  {
                    blueprints.filter(
                      item =>
                      item.status === "Completed"
                    ).length
                  }

                </h2>


              </div>


            </div>






            <div className="stat-card">


              <div className="stat-icon orange">

                <FiClock />

              </div>


              <div>


                <span>
                  {t("generating")}
                </span>



                <h2>

                  {
                    blueprints.filter(
                      item =>
                      item.status === "Generating"
                    ).length
                  }

                </h2>


              </div>


            </div>






            <div className="stat-card">


              <div className="stat-icon red">

                <FiAlertCircle />

              </div>


              <div>


                <span>
                  {t("failed")}
                </span>



                <h2>

                  {
                    blueprints.filter(
                      item =>
                      item.status === "Failed"
                    ).length
                  }

                </h2>


              </div>


            </div>



          </div>







          <div className="blueprint-toolbar">



            <div className="search-box">


              <FiSearch />



              <input

                placeholder={
                  t("searchBlueprints")
                }


                value={search}



                onChange={(e) => {


                  setSearch(
                    e.target.value
                  );


                  setCurrentPage(1);


                }}

              />


            </div>






            <div className="tabs">


              {
                tabs.map((tab) => (


                  <button

                    key={tab.value}


                    className={
                      activeTab === tab.value
                      ?
                      "active-tab"
                      :
                      ""
                    }



                    onClick={() => {


                      setActiveTab(
                        tab.value
                      );


                      setCurrentPage(1);


                    }}


                  >


                    {tab.label}


                  </button>


                ))
              }



            </div>



          </div>





          {
            loading &&

            <div className="loading-state">

              Loading blueprints...

            </div>

          }






          {
            error &&

            <div className="error-state">

              {error}

            </div>

          }






          {
            !loading &&
            !error &&
            filteredBlueprints.length === 0 &&


            <div className="empty-state">

              No blueprints found

            </div>

          }
          {
            !loading &&
            !error &&
            filteredBlueprints.length > 0 &&


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
                      {t("projectType")}
                    </th>


                    <th>
                      {t("complexity")}
                    </th>


                    <th>
                      {t("created")}
                    </th>


                    <th>
                      {t("action")}
                    </th>


                  </tr>

                </thead>




                <tbody>


                  {
                    currentBlueprints.map((item)=>(


                      <tr key={item.id}>


                        <td>


                          <div className="blueprint-info">


                            <div className="blueprint-logo">


                              {
                                (
                                  item.title ||
                                  item.name ||
                                  "B"
                                ).charAt(0)
                              }


                            </div>



                            <div>


                              <h4>

                                {
                                  item.title ||
                                  item.name
                                }

                              </h4>



                              <p>

                                {
                                  item.description ||
                                  "-"
                                }

                              </p>


                            </div>


                          </div>


                        </td>






                        <td>

                          {
                            item.owner?.name ||
                            item.owner?.email ||
                            item.owner ||
                            "-"
                          }

                        </td>






                        <td>


                          <span

                            className={
                              `status ${
                                item.status
                                ?.toLowerCase()
                              }`
                            }

                          >

                            {
                              t(
                                item.status
                                ?.toLowerCase()
                              )
                            }


                          </span>


                        </td>






                        <td>

                          {
                            item.projectType ||
                            "-"
                          }

                        </td>






                        <td>

                          {
                            item.complexity ||
                            "-"
                          }

                        </td>






                        <td>


                          {
                            item.createdAt

                            ?

                            new Date(
                              item.createdAt
                            )
                            .toLocaleDateString()

                            :

                            "-"
                          }


                        </td>






                        <td>


                          <div className="actions">


                            {
                              item.status === "Generating" &&


                              <button

                                className="cancel-btn"


                                onClick={() =>
                                  cancelBlueprint(
                                    item.id
                                  )
                                }

                              >

                                Cancel

                              </button>

                            }





                            <button

                              className="action-btn"


                              onClick={() =>
                                deleteBlueprint(
                                  item.id
                                )
                              }


                            >

                              <FiMoreVertical />

                            </button>



                          </div>


                        </td>




                      </tr>


                    ))
                  }



                </tbody>


              </table>


            </div>


          }






          {
            totalPages > 0 &&


            <div className="pagination">



              <button

                onClick={() => {


                  if(currentPage > 1){

                    setCurrentPage(
                      currentPage - 1
                    );

                  }


                }}

              >

                <FiChevronLeft />

              </button>






              {
                Array.from(
                  {
                    length: totalPages
                  },

                  (_, index) => (


                    <span

                      key={index}


                      className={
                        currentPage === index + 1
                        ?
                        "page-active"
                        :
                        ""
                      }



                      onClick={() =>
                        setCurrentPage(
                          index + 1
                        )
                      }


                    >

                      {
                        index + 1
                      }


                    </span>


                  )

                )
              }







              <button

                onClick={() => {


                  if(currentPage < totalPages){

                    setCurrentPage(
                      currentPage + 1
                    );

                  }


                }}

              >

                <FiChevronRight />


              </button>



            </div>


          }





        </div>


      </div>


    </div>


  );

};


export default Blueprints;