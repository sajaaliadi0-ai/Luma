import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import NewBlueprint from "./new-blueprint";
import NewBlueprint2 from "./newblueprint2";
import "../css/dualWorkspace.css";

function DualWorkspace() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // If the page was opened directly with ?id=...
  const urlBlueprintId = searchParams.get("id");

  // Keep the blueprint ID in the parent
  const [blueprintId, setBlueprintId] = useState(
    urlBlueprintId || null
  );

  const message = location.state?.message || "";

  useEffect(() => {
    const token =
      localStorage.getItem("accessToken") ||
      localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // If URL changes, keep state synchronized
  useEffect(() => {
    if (urlBlueprintId) {
      setBlueprintId(urlBlueprintId);
    }
  }, [urlBlueprintId]);

  // Called by NewBlueprint2 after creating the blueprint
  const handleBlueprintCreated = (id) => {
    console.log("🎯 DualWorkspace received Blueprint ID:", id);

    setBlueprintId(id);

    // Keep the ID in the URL too
    navigate(`/DualWorkspace?id=${id}`, {
      replace: true,
      state: {
        message,
      },
    });
  };

  return (
    <div className="dual-workspace">

      {/* LEFT SIDE */}
      <section className="dual-workspace-left">
        <NewBlueprint2
          initialMessage={message}
          onBlueprintCreated={handleBlueprintCreated}
        />
      </section>

      {/* RIGHT SIDE */}
      <section className="dual-workspace-right">
        <NewBlueprint
          blueprintId={blueprintId}
        />
      </section>

    </div>
  );
}

export default DualWorkspace;
