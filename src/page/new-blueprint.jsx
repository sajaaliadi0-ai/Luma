import "../css/newBlueprint.css";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function NewBlueprint() {

  const navigate = useNavigate();

  return (

    <div className="new-page">

      <div className="new-card">

        <button
  className="new-blueprint-back"
  onClick={() => navigate(-1)}
>
  <FiArrowLeft />
  Back
</button>
        <h1>Create New Blueprint</h1>

        <p>
          Start creating your next software project.
        </p>

        <button className="create-btn">

          <FiPlus />

          Create Blueprint

        </button>

      </div>

    </div>

  );

}

export default NewBlueprint;