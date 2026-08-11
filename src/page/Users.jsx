import { useEffect, useState } from "react";

import api from "../api/api";
import Sidebar from "../components/Sidebar/Sidebar";

import { useTranslation } from "../i18n";

import "../css/Users.css";


function User({ dark }) {

  const { t } = useTranslation();


  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);


  // ================= GET USERS =================


  const fetchUsers = async () => {

    try {

      setLoading(true);

      setError("");


      const response = await api.get("/admin/users");


      const data = response?.data;


      if (Array.isArray(data)) {

        setUsers(data);

      } else if (Array.isArray(data?.users)) {

        setUsers(data.users);

      } else if (Array.isArray(data?.data)) {

        setUsers(data.data);

      } else {

        setUsers([]);

      }


    } catch (err) {


      console.error(
        "Failed to fetch users:",
        err
      );


      setError(
        err?.response?.data?.message ||
        t("usersLoadError")
      );


    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    const init = async () => {

      await fetchUsers();

    };


    void init();


    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);




  // ================= ACTIVATE =================



  const activateUser = async (id) => {

    try {


      await api.patch(
        `/admin/users/${id}/activate`
      );


      await fetchUsers();


    } catch (err) {


      console.error(
        "Activate failed:",
        err
      );


      setError(
        err?.response?.data?.message ||
        t("usersActionError")
      );


    }

  };





  // ================= DEACTIVATE =================



  const deactivateUser = async (id) => {

    try {


      await api.patch(
        `/admin/users/${id}/deactivate`
      );


      await fetchUsers();


    } catch (err) {


      console.error(
        "Deactivate failed:",
        err
      );


      setError(
        err?.response?.data?.message ||
        t("usersActionError")
      );


    }

  };





  // ================= HELPERS =================



  const getUserName = (user) => {

    return (

      user?.name ||

      user?.username ||

      `${user?.firstName || ""} ${
        user?.lastName || ""
      }`.trim() ||

      t("usersUnknownUser")

    );

  };





 const getUserRole = (user) => {
  const rawRole =
    user?.role ||
    user?.userRole ||
    "User";

  // إذا كان role object مثل { id, name }
  const role =
    typeof rawRole === "object"
      ? rawRole?.name || "User"
      : rawRole;

  const normalizedRole = String(role).toLowerCase().trim();

  const roles = {
    user: t("usersUserRole"),
    admin: t("usersAdminRole"),
    "super admin": t("usersSuperAdminRole"),
    superadmin: t("usersSuperAdminRole"),
    super_admin: t("usersSuperAdminRole"),
  };

  return roles[normalizedRole] || String(role);
};





  const isUserActive = (user) => {

    return user?.is_active === true;

  };





  const getTranslatedStatus = (user) => {


    return isUserActive(user)

      ? t("usersActiveStatus")

      : t("usersInactiveStatus");


  };





  const getInitial = (user) => {


    return getUserName(user)
      .charAt(0)
      .toUpperCase();


  };





  // ================= SEARCH =================


  const filteredUsers = users.filter(
    (user) => {


      const value =
        search.toLowerCase();



      return (


        String(user?.name || "")

          .toLowerCase()

          .includes(value)



        ||

        String(user?.email || "")

          .toLowerCase()

          .includes(value)



      );


    }

  );
  // ================= RENDER =================

  return (

    <div className={`dashboard-layout ${dark ? "dark" : ""}`}>


      {/* ================= SIDEBAR ================= */}

      <Sidebar active="Users" />



      {/* ================= PAGE CONTENT ================= */}


      <div className="page-content">



        {/* ================= HEADER ================= */}


        <header className="user-header">


          <div>


            <h1>
              {t("usersTitle")}
            </h1>


            <p>
              {t("usersDescription")}
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
                  ? t("usersLoading")
                  : t("usersRefresh")
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
                {t("usersTotal")}
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
                {t("usersActive")}
              </span>


              <h2>

                {
                  users.filter(
                    (user)=>
                      isUserActive(user)
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
                {t("usersInactive")}
              </span>


              <h2>

                {
                  users.filter(
                    (user)=>
                      !isUserActive(user)
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
                {t("usersSearchResults")}
              </span>


              <h2>
                {filteredUsers.length}
              </h2>


            </div>


          </div>



        </section>






        {/* ================= USERS CARD ================= */}



        <section className="user-content-card">



          <div className="user-content-header">


            <div>


              <h2>
                {t("usersAll")}
              </h2>


              <p>
                {t("usersAllDescription")}
              </p>


            </div>




            <div className="user-search-wrapper">


              <span className="user-search-icon">

                ⌕

              </span>



              <input

                type="text"

                placeholder={
                  t("usersSearchPlaceholder")
                }

                value={search}

                onChange={
                  (e)=>
                    setSearch(
                      e.target.value
                    )
                }

              />


            </div>



          </div>





          {/* ================= ERROR ================= */}



          {
            error && (

              <div className="user-error">


                <span>
                  {error}
                </span>



                <button
                  onClick={fetchUsers}
                >

                  {
                    t("usersTryAgain")
                  }

                </button>


              </div>


            )
          }







          {/* ================= LOADING SKELETON ================= */}




          {
            loading ? (



              <div className="user-loading-skeleton">


                {
                  Array.from({
                    length:5
                  }).map(
                    (_,index)=>(


                      <div

                        key={index}

                        className="user-skeleton-row"

                      ></div>


                    )
                  )
                }


              </div>



            )



            :

            filteredUsers.length === 0 ? (




              <div className="user-empty">



                <div className="user-empty-icon">

                  ♙

                </div>



                <h3>

                  {t("usersNoUsers")}

                </h3>




                <p>

                  {
                    search

                    ?

                    t(
                      "usersNoSearchResults"
                    )

                    :

                    t(
                      "usersNoUsersToDisplay"
                    )

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
                        {t("usersUser")}
                      </th>



                      <th>
                        {t("usersEmail")}
                      </th>



                      <th>
                        {t("usersRole")}
                      </th>



                      <th>
                        {t("usersStatus")}
                      </th>



                      <th>
                        {t("usersAction")}
                      </th>



                    </tr>



                  </thead>





                  <tbody>



                    {
                      filteredUsers.map(
                        (user,index)=>{


                          const name =
                            getUserName(user);



                          return (



                            <tr

                              key={
                                user?.id ||
                                user?._id ||
                                index
                              }

                            >



                              {/* USER */}



                              <td>


                                <div className="user-info">


                                  <div className="user-avatar">


                                    {
                                      getInitial(user)
                                    }


                                  </div>



                                  <div>


                                    <strong>

                                      {name}

                                    </strong>



                                    {
                                      user?.username &&

                                      (

                                        <small>

                                          @
                                          {
                                            user.username
                                          }

                                        </small>

                                      )

                                    }



                                  </div>


                                </div>


                              </td>






                              {/* EMAIL */}



                              <td>


                                <span className="user-email">

                                  {
                                    user?.email ||
                                    "—"
                                  }

                                </span>


                              </td>






                              {/* ROLE */}



                              <td>


                                <span className="user-role">


                                  {
                                    getUserRole(user)
                                  }


                                </span>


                              </td>





                              {/* STATUS */}



                              <td>


                                <span

                                  className={
                                    `user-status ${
                                      isUserActive(user)

                                      ?

                                      "user-status-active"

                                      :

                                      "user-status-inactive"
                                    }`
                                  }

                                >



                                  <span className="user-status-dot"></span>



                                  {
                                    getTranslatedStatus(user)
                                  }



                                </span>


                              </td>

                              {/* ACTIONS */}


                              <td>


                                <div className="user-actions">



                                  <button

                                    className="user-view-button"

                                    onClick={() =>
                                      setSelectedUser(user)
                                    }

                                  >

                                    {
                                      t("usersView")
                                    }

                                  </button>





                                  {
                                    user?.is_active === false ?



                                    (

                                      <button

                                        className="user-activate-button"

                                        onClick={() =>
                                          activateUser(
                                            user.id ||
                                            user._id
                                          )
                                        }

                                      >

                                        {
                                          t("usersActivate")
                                        }

                                      </button>


                                    )



                                    :



                                    (

                                      <button

                                        className="user-deactivate-button"

                                        onClick={() =>
                                          deactivateUser(
                                            user.id ||
                                            user._id
                                          )
                                        }

                                      >

                                        {
                                          t("usersDeactivate")
                                        }

                                      </button>


                                    )

                                  }



                                </div>


                              </td>




                            </tr>


                          );


                        }

                      )
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

            onClick={() =>
              setSelectedUser(null)
            }

          >




            <div

              className="user-modal"

              onClick={
                (e)=>
                  e.stopPropagation()
              }

            >





              <div className="user-modal-header">



                <div>


                  <h2>

                    {
                      t("usersDetails")
                    }

                  </h2>



                  <p>

                    {
                      t(
                        "usersDetailsDescription"
                      )
                    }

                  </p>



                </div>




                <button

                  className="user-modal-close"

                  onClick={() =>
                    setSelectedUser(null)
                  }

                >

                  ×

                </button>



              </div>







              <div className="user-modal-profile">



                <div className="user-modal-avatar">


                  {
                    getInitial(selectedUser)
                  }


                </div>




                <div>


                  <h3>

                    {
                      getUserName(
                        selectedUser
                      )
                    }

                  </h3>



                  <p>

                    {
                      selectedUser?.email ||
                      "—"
                    }

                  </p>



                </div>



              </div>







              <div className="user-details-grid">





                <div className="user-detail-item">


                  <span>
                    {t("usersId")}
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
                    {t("usersRole")}
                  </span>


                  <strong>

                    {
                      getUserRole(
                        selectedUser
                      )
                    }

                  </strong>


                </div>






                <div className="user-detail-item">


                  <span>
                    {t("usersStatus")}
                  </span>


                  <strong>

                    {
                      getTranslatedStatus(
                        selectedUser
                      )
                    }

                  </strong>


                </div>







                <div className="user-detail-item">


                  <span>

                    {t("usersUsername")}

                  </span>


                  <strong>

                    {
                      selectedUser?.username ||
                      "—"
                    }

                  </strong>


                </div>






              </div>







              <button

                className="user-modal-done"

                onClick={() =>
                  setSelectedUser(null)
                }

              >

                {
                  t("usersClose")
                }


              </button>





            </div>




          </div>



        )
      }



    </div>


  );


}



export default User;