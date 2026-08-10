import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiSearch,
  FiLoader,
  FiAlertCircle,
} from "react-icons/fi";

import api from "../api/api";
import { useTranslation } from "../i18n";
import "../css/Resources.css";

function Resources() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [blueprints, setBlueprints] = useState([]);
  const [resourceFilter, setResourceFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH COMPLETED BLUEPRINTS
  // =====================================================

  useEffect(() => {
    const fetchBlueprints = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          "/blueprints?status=completed&limit=12"
        );

        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.blueprints ||
            response.data?.data ||
            response.data?.items ||
            [];

        setBlueprints(data);
      } catch (err) {
        console.error("Failed to fetch blueprints:", err);

        setError(
          err?.response?.data?.message ||
            t("resourcesErrorMessage")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlueprints();
  }, []);

  // =====================================================
  // BACK TO DUAL WORKSPACE
  // =====================================================

  const handleBack = () => {
    navigate("/DualWorkspace");
  };

  // =====================================================
  // USE THIS IDEA
  // =====================================================

  const handleUseIdea = (blueprint) => {
    if (!blueprint?.ideaText) {
      return;
    }

    sessionStorage.setItem(
      "blueprintPrompt",
      blueprint.ideaText
    );

    navigate("/DualWorkspace");
  };

  // =====================================================
  // GET BLUEPRINT DATA
  // =====================================================

  const getTitle = (blueprint) => {
    return (
      blueprint?.title ||
      blueprint?.name ||
      blueprint?.projectName ||
      t("resourcesUntitled")
    );
  };

  const getProjectType = (blueprint) => {
    return (
      blueprint?.projectType ||
      blueprint?.project_type ||
      blueprint?.type ||
      t("resourcesUnknown")
    );
  };

  const getComplexity = (blueprint) => {
    return (
      blueprint?.complexity ||
      blueprint?.difficulty ||
      t("resourcesUnknown")
    );
  };

  const getCreationDate = (blueprint) => {
    const date =
      blueprint?.createdAt ||
      blueprint?.created_at ||
      blueprint?.creationDate ||
      blueprint?.creation_date;

    if (!date) {
      return t("resourcesUnknownDate");
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString();
  };

  const getTone = (blueprint, index) => {
    const type = getProjectType(blueprint).toLowerCase();

    if (type.includes("ai")) {
      return "resources-green";
    }

    if (type.includes("website")) {
      return "resources-purple";
    }

    if (
      type.includes("e-commerce") ||
      type.includes("ecommerce")
    ) {
      return "resources-dark";
    }

    if (type.includes("data")) {
      return "resources-wallet";
    }

    if (type.includes("game")) {
      return "resources-fantasy";
    }

    return index % 2 === 0
      ? "resources-purple"
      : "resources-dark";
  };

  // =====================================================
  // SEARCH + FILTER
  // =====================================================

  const filteredBlueprints = useMemo(() => {
    const filtered = blueprints.filter((blueprint) => {
      const title = getTitle(blueprint).toLowerCase();

      const projectType = getProjectType(blueprint);

      // Search by TITLE only
      const matchesSearch = title.includes(
        searchQuery.trim().toLowerCase()
      );

      // Project type filter
      const matchesFilter =
        resourceFilter === "All" ||
        resourceFilter === "Latest" ||
        projectType.toLowerCase() ===
          resourceFilter.toLowerCase();

      return matchesSearch && matchesFilter;
    });

    // Latest
    if (resourceFilter === "Latest") {
      return [...filtered].sort((a, b) => {
        const dateA = new Date(
          a?.createdAt ||
            a?.created_at ||
            a?.creationDate ||
            a?.creation_date ||
            0
        );

        const dateB = new Date(
          b?.createdAt ||
            b?.created_at ||
            b?.creationDate ||
            b?.creation_date ||
            0
        );

        return dateB - dateA;
      });
    }

    return filtered;
  }, [
    blueprints,
    searchQuery,
    resourceFilter,
  ]);

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section className="resources-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="resources-header">
        <button
          type="button"
          className="resources-back-button"
          onClick={handleBack}
        >
          <FiArrowLeft />
          <span>{t("resourcesBack")}</span>
        </button>

        <h2>{t("resources")}</h2>
      </header>

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div className="resources-search-container">
        <FiSearch />

        <input
          type="text"
          value={searchQuery}
          onChange={(event) =>
            setSearchQuery(event.target.value)
          }
          placeholder={t("resourcesSearchPlaceholder")}
          aria-label={t("resourcesSearchAriaLabel")}
        />

        {searchQuery && (
          <button
            type="button"
            className="resources-search-clear"
            onClick={() => setSearchQuery("")}
            aria-label={t("resourcesClearSearchAriaLabel")}
          >
            ×
          </button>
        )}
      </div>

    
 

      {/* =====================================================
          FILTERS
      ===================================================== */}

      <div className="resources-filters">
        {[
          { value: "All", label: t("resourcesFilterAll") },
          { value: "E-commerce", label: t("resourcesFilterEcommerce") },
          { value: "Website", label: t("resourcesFilterWebsite") },
          { value: "Game", label: t("resourcesFilterGame") },
          { value: "Productivity", label: t("resourcesFilterProductivity") },
          { value: "Data Analysis", label: t("resourcesFilterDataAnalysis") },
          { value: "AI", label: t("resourcesFilterAI") },
          { value: "Latest", label: t("resourcesFilterLatest") },
        ].map((filter) => (
          <button
            type="button"
            key={filter.value}
            className={
              resourceFilter === filter.value
                ? "filter-active"
                : ""
            }
            onClick={() =>
              setResourceFilter(filter.value)
            }
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (
        <div className="resources-state">
          <FiLoader className="resources-loading-icon" />

          <p>{t("resourcesLoading")}</p>
        </div>
      )}

      {/* =====================================================
          ERROR
      ===================================================== */}

      {!loading && error && (
        <div className="resources-state resources-error-state">
          <FiAlertCircle />

          <p>{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
          >
            {t("resourcesTryAgain")}
          </button>
        </div>
      )}

      {/* =====================================================
          BLUEPRINTS
      ===================================================== */}

      {!loading && !error && (
        <div className="resources-grid">
          {filteredBlueprints.length === 0 ? (
            <p className="resources-no-projects">
              {searchQuery
                ? t("resourcesNoSearchResults")
                : t("resourcesNoCompleted")}
            </p>
          ) : (
            filteredBlueprints.map(
              (blueprint, index) => {
                const title = getTitle(blueprint);
                const projectType =
                  getProjectType(blueprint);
                const complexity =
                  getComplexity(blueprint);
                const creationDate =
                  getCreationDate(blueprint);

                const tone = getTone(
                  blueprint,
                  index
                );

                return (
                  <article
                    className="resources-card"
                    key={
                      blueprint?.id ||
                      blueprint?._id ||
                      `${title}-${index}`
                    }
                  >
                    {/* =====================================================
                        PREVIEW
                    ===================================================== */}

                    <div
                      className={`resources-card-image ${tone}`}
                    >
                      <span>{title}</span>
                    </div>

                    {/* =====================================================
                        CARD CONTENT
                    ===================================================== */}

                    <div className="resources-card-content">
                      <div className="resources-card-title-row">
                        <b className="resources-card-avatar">
                          {title
                            .charAt(0)
                            .toUpperCase()}
                        </b>

                        <div>
                          <strong>
                            {title}
                          </strong>
                        </div>
                      </div>

                      {/* =====================================================
                          DETAILS
                      ===================================================== */}

                      <div className="resources-card-details">
                        <div>
                          <span>
                            {t("resourcesProjectType")}
                          </span>

                          <strong>
                            {projectType}
                          </strong>
                        </div>

                        <div>
                          <span>
                            {t("resourcesComplexity")}
                          </span>

                          <strong>
                            {complexity}
                          </strong>
                        </div>

                        <div>
                          <span>
                            {t("resourcesCreated")}
                          </span>

                          <strong>
                            {creationDate}
                          </strong>
                        </div>
                      </div>

                      {/* =====================================================
                          USE THIS IDEA
                      ===================================================== */}

                     <button
  type="button"
  className="resources-use-button"
  onClick={() => {
    sessionStorage.setItem(
      "blueprintPrompt",
      blueprint.ideaText
    );

    navigate("/DualWorkspace");
  }}
>
  {t("resourcesUseIdea")}
</button>
                     
                    </div>
                  </article>
                );
              }
            )
          )}
        </div>
      )}
    </section>
  );
}

export default Resources;