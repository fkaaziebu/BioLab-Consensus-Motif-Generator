import React, { useState } from "react";
import "./styles.css";
import settingsIcon from "./component/settings-icon.svg";
import accountIcon from "./component/account-icon.svg";
import sideImage from "./component/image1.jpg";
import Footer from "./scene/footer";
import SignIn from "./scene/signIn";
import "bootstrap/dist/css/bootstrap.css";
import {
  MDBBadge,
  MDBFile,
  MDBCard,
  MDBBtn,
  MDBCardText,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
} from "mdb-react-ui-kit";

function copyToClipboard(id) {
  const element = document.getElementById(id);
  const text = element.innerText;

  const textArea = document.createElement("textarea");
  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

function App() {
  const [predictedTherapies, setPredictedTherapies] = useState([]);
  const [geneticInsights, setGeneticInsights] = useState("");
  const [treatmentModels, setTreatmentModels] = useState("");
  const [sessionMotifs, setSessionMotifs] = useState("");
  const [sessionResults, setSessionResults] = useState(null);
  const [showTherapiesModal, setShowTherapiesModal] = useState(false);
  const [showGeneticInsightsModal, setShowGeneticInsightsModal] =
    useState(false);
  const [showTreatmentModelsModal, setShowTreatmentModelsModal] =
    useState(false);
  const [motifs, setMotifs] = useState("");
  const [results, setResults] = useState(null);
  const [currentPhase, setCurrentPhase] = useState("phase1"); // Default to Phase I

  const analyzeMotifs = async () => {
    try {
      const motifArrayRaw = motifs
        .replace(/[^A-Za-z0-9,]+/g, "")
        .split(",")
        .map((item) => item.trim());
      const response = await fetch("https://biolab-backend.onrender.com/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ motifs: motifArrayRaw }),
      });

      const data = await response.json();
      setResults(data);
      // Store Phase I data in the session
      setSessionMotifs(motifs);
      setSessionResults(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const resetResults = () => {
    setResults(null);
    setMotifs("");
  };

  let phaseContent;

  if (currentPhase === "phase1") {
    phaseContent = (
      <div>
        <div className="form-group mt-5">
          <label htmlFor="motifs">
            Enter Motifs (separate strings with comma):
          </label>
          <textarea
            id="motifs"
            className="form-control"
            rows="6"
            value={motifs}
            onChange={(e) => setMotifs(e.target.value)}
          ></textarea>
          <div>
            <MDBFile label="Upload file as .txt" id="customFile" />
          </div>
        </div>
        <div className="form-group d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={analyzeMotifs}
          >
            Analyze
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary mt-3"
            onClick={resetResults}
          >
            Reset
          </button>
        </div>
        {results && (
          <div className="results mt-4">
            <h2>Results:</h2>
            <div className="card">
              <div className="card-body">
                <p>
                  <strong>Count:</strong>
                  <span
                    className="copy-icon"
                    onClick={() => copyToClipboard("count")}
                  >
                    &#128203;
                  </span>
                </p>
                <pre id="count">{JSON.stringify(results.count, null, 2)}</pre>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <p>
                  <strong>Profile:</strong>
                  <span
                    className="copy-icon"
                    onClick={() => copyToClipboard("profile")}
                  >
                    &#128203;
                  </span>
                </p>
                <pre id="profile">
                  {JSON.stringify(results.profile, null, 2)}
                </pre>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <p>
                  <strong>Consensus:</strong> {results.consensus}
                  <span
                    className="copy-icon"
                    onClick={() => copyToClipboard("consensus")}
                  >
                    &#128203;
                  </span>
                </p>
                <pre id="consensus">{results.consensus}</pre>
              </div>
            </div>
          </div>
        )}
        <div style={{ textAlign: "center" }}>
          <button
            type="button"
            className="btn btn-secondary mt-5"
            onClick={() => setCurrentPhase("phase2")}
          >
            Go to Phase II
          </button>
        </div>
      </div>
    );
  } else if (currentPhase === "phase2") {
    phaseContent = (
      <div className="mt-5">
        {/* Phase II content goes here */}
        <p>This is Phase II content.</p>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={() => {
                  // Implement logic to predict therapies based on sessionResults
                  const predictedTherapies = ["Therapy A", "Therapy B"];
                  setPredictedTherapies(predictedTherapies);
                }}
              >
                Predict Therapies
              </button>
            </div>
            {predictedTherapies && (
              <div className="mt-4">
                <h2>Predicted Therapies:</h2>
                <ul>
                  {predictedTherapies.map((therapy, index) => (
                    <li key={index}>{therapy}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={() => {
                  // Implement logic to provide genetic insights based on sessionResults
                  const geneticInsights =
                    "Replace with actual genetic insights";
                  setGeneticInsights(geneticInsights);
                }}
              >
                Genetic Insights
              </button>
            </div>
            {geneticInsights && (
              <div className="mt-4">
                <h2>Genetic Insights:</h2>
                <p>{geneticInsights}</p>
              </div>
            )}
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={() => {
                  // Implement logic to describe treatment models based on sessionResults
                  const treatmentModels =
                    "Replace with actual treatment models description";
                  setTreatmentModels(treatmentModels);
                }}
              >
                Treatment Models
              </button>
            </div>
            {treatmentModels && (
              <div className="mt-4">
                <h2>Treatment Models:</h2>
                <p>{treatmentModels}</p>
              </div>
            )}
          </div>
        </div>
        <div className="text-center">
          <button
            type="button"
            className="btn btn-secondary mt-3"
            onClick={() => setCurrentPhase("phase1")}
          >
            Back to Phase I
          </button>
        </div>
        {/* Cards section */}
        <div className="row mt-5">
          <div className="col-md-4">
            <MDBCard>
              {/* Card content for Card 1 */}
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image hover-overlay"
              >
                <MDBCardImage
                  src="https://mdbootstrap.com/img/new/standard/nature/111.webp"
                  fluid
                  alt="..."
                />
                <a>
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </a>
              </MDBRipple>
              <MDBCardBody>
                <MDBCardTitle>Card title</MDBCardTitle>
                <MDBCardText>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </MDBCardText>
                <MDBBtn className="btn-secondary" href="#">
                  Button
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </div>
          <div className="col-md-4">
            <MDBCard>
              {/* Card content for Card 2 */}
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image hover-overlay"
              >
                <MDBCardImage
                  src="https://mdbootstrap.com/img/new/standard/nature/111.webp"
                  fluid
                  alt="..."
                />
                <a>
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </a>
              </MDBRipple>
              <MDBCardBody>
                <MDBCardTitle>Card title</MDBCardTitle>
                <MDBCardText>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </MDBCardText>
                <MDBBtn className="btn-secondary" href="#">
                  Button
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </div>
          <div className="col-md-4">
            <MDBCard>
              {/* Card content for Card 3 */}
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image hover-overlay"
              >
                <MDBCardImage
                  src="https://mdbootstrap.com/img/new/standard/nature/111.webp"
                  fluid
                  alt="..."
                />
                <a>
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </a>
              </MDBRipple>
              <MDBCardBody>
                <MDBCardTitle>Card title</MDBCardTitle>
                <MDBCardText>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </MDBCardText>
                <MDBBtn className="btn-secondary" href="#">
                  Button
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <nav className="navbar bg-primary">
        <div className="container">
          <a className="navbar-brand" href="#">
            <h1 className="text-logo d-flex justify-content-center">M-Lab</h1>
          </a>
        </div>
        <div className="m-4">
          <SignIn />
        </div>
      </nav>
      <div className="container mt-5" style={{ flex: 1 }}>
        <div className="row">
          <div className="col">
            <div
              className="btn-group d-flex justify-content-center"
              role="group"
              aria-label="Phase Tabs"
            >
              <button
                type="button"
                className={`btn btn-outline-primary ${
                  currentPhase === "phase1" ? "active" : ""
                }`}
                onClick={() => setCurrentPhase("phase1")}
              >
                Phase I
              </button>
              <button
                type="button"
                className={`btn btn-outline-secondary ${
                  currentPhase === "phase2" ? "active" : ""
                }`}
                onClick={() => setCurrentPhase("phase2")}
              >
                Phase II
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          {/* Left Column for Motifs Operations */}
          <div className="col">{phaseContent}</div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
