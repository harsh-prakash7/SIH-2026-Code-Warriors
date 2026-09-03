import React, {
  useEffect,
  useState
} from "react";


const API = "http://localhost:5000/api";


function App() {

  const [page, setPage] = useState("home");

  const [language, setLanguage] =
    useState("en");

  const [dashboard, setDashboard] =
    useState(null);

  const [projects, setProjects] =
    useState([]);

  const [analytics, setAnalytics] =
    useState(null);

  const [trackReference, setTrackReference] =
    useState("");

  const [trackResult, setTrackResult] =
    useState(null);

  const [chatOpen, setChatOpen] =
    useState(false);

  const [chatMessages, setChatMessages] =
    useState([]);

  const [chatInput, setChatInput] =
    useState("");


  // =========================
  // LOAD DASHBOARD
  // =========================

  useEffect(() => {

    fetch(`${API}/dashboard`)
      .then(res => res.json())
      .then(data => setDashboard(data))
      .catch(err =>
        console.error(err)
      );

  }, []);


  // =========================
  // LOAD PROJECTS
  // =========================

  useEffect(() => {

    fetch(`${API}/projects`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err =>
        console.error(err)
      );

  }, []);


  // =========================
  // LOAD ANALYTICS
  // =========================

  useEffect(() => {

    fetch(`${API}/analytics`)
      .then(res => res.json())
      .then(data => setAnalytics(data))
      .catch(err =>
        console.error(err)
      );

  }, []);


  // =========================
  // TRANSLATIONS
  // =========================

  const t = {

    en: {

      brand:
        "Land Acquisition Transparency Portal",

      dashboard:
        "Dashboard",

      landStatus:
        "Land Status",

      projects:
        "Project Information",

      services:
        "Citizen Services",

      grievance:
        "Grievance Redressal",

      appointment:
        "Appointments",

      analytics:
        "Delay Analytics",

      reports:
        "Reports",

      audit:
        "Audit Trail",

      title:
        "Land Acquisition Command Centre",

      subtitle:
        "A unified platform for transparent land acquisition monitoring and citizen services.",

      activeProjects:
        "Active Projects",

      parcels:
        "Parcels Under Process",

      compensation:
        "Compensation Tracked",

      grievances:
        "Grievances Resolved",

      track:
        "Track My Land Status",

      search:
        "Search Case",

      chatbot:
        "BhoomiSetu Citizen Assistant"

    },

    hi: {

      brand:
        "भूमि अधिग्रहण पारदर्शिता पोर्टल",

      dashboard:
        "डैशबोर्ड",

      landStatus:
        "भूमि स्थिति",

      projects:
        "परियोजना जानकारी",

      services:
        "नागरिक सेवाएँ",

      grievance:
        "शिकायत निवारण",

      appointment:
        "अपॉइंटमेंट",

      analytics:
        "विलंब विश्लेषण",

      reports:
        "रिपोर्ट",

      audit:
        "ऑडिट ट्रेल",

      title:
        "भूमि अधिग्रहण कमांड सेंटर",

      subtitle:
        "पारदर्शी भूमि अधिग्रहण निगरानी और नागरिक सेवाओं के लिए एकीकृत मंच।",

      activeProjects:
        "सक्रिय परियोजनाएँ",

      parcels:
        "प्रक्रिया में भूखंड",

      compensation:
        "ट्रैक किया गया मुआवज़ा",

      grievances:
        "निस्तारित शिकायतें",

      track:
        "भूमि स्थिति ट्रैक करें",

      search:
        "केस खोजें",

      chatbot:
        "भूमि सेतु नागरिक सहायक"

    }

  };


  const text = t[language];


  // =========================
  // TRACK LAND
  // =========================

  async function trackLand(e) {

    e.preventDefault();

    if (!trackReference.trim()) {

      setTrackResult({
        error:
          language === "hi"
            ? "कृपया संदर्भ संख्या दर्ज करें।"
            : "Please enter a reference number."
      });

      return;
    }

    try {

      const response =
        await fetch(
          `${API}/land/${trackReference}`
        );

      const data =
        await response.json();

      if (!response.ok) {

        setTrackResult({
          error: data.message
        });

        return;
      }

      setTrackResult(data.case);

    } catch {

      setTrackResult({
        error:
          "Unable to connect to server."
      });

    }

  }


  // =========================
  // CHATBOT
  // =========================

  async function sendChat(message = chatInput) {

    if (!message.trim()) return;

    setChatMessages(prev => [

      ...prev,

      {
        sender: "user",
        text: message
      }

    ]);

    setChatInput("");

    try {

      const response =
        await fetch(
          `${API}/chatbot`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

              message,

              language

            })

          }
        );

      const data =
        await response.json();

      setChatMessages(prev => [

        ...prev,

        {
          sender: "bot",
          text: data.reply
        }

      ]);

    } catch {

      setChatMessages(prev => [

        ...prev,

        {
          sender: "bot",
          text:
            language === "hi"
              ? "सर्वर से कनेक्शन नहीं हो पाया।"
              : "Unable to connect to the server."
        }

      ]);

    }

  }


  // =========================
  // SIDEBAR
  // =========================

  function Sidebar() {

    const menu = [

      ["home", text.dashboard],

      ["track", text.landStatus],

      ["projects", text.projects],

      ["services", text.services],

      ["grievance", text.grievance],

      ["appointment", text.appointment],

      ["analytics", text.analytics],

      ["reports", text.reports],

      ["audit", text.audit]

    ];


    return (

      <aside className="sidebar">

        <div className="sidebar-heading">

          CITIZEN SERVICES

        </div>


        {menu.slice(0, 6).map(item => (

          <button

            key={item[0]}

            className={
              page === item[0]
                ? "side-button active"
                : "side-button"
            }

            onClick={() =>
              setPage(item[0])
            }

          >

            {item[1]}

          </button>

        ))}


        <div className="sidebar-heading">

          OFFICIAL MODULES

        </div>


        {menu.slice(6).map(item => (

          <button

            key={item[0]}

            className={
              page === item[0]
                ? "side-button active"
                : "side-button"
            }

            onClick={() =>
              setPage(item[0])
            }

          >

            {item[1]}

          </button>

        ))}

      </aside>

    );

  }


  // =========================
  // HEADER
  // =========================

  function Header() {

    return (

      <header className="header">

        <div className="logo">

          <div className="seal">

            ☼

          </div>

          <div>

            <strong>
              BHOOMISETU
            </strong>

            <small>
              {text.brand}
            </small>

          </div>

        </div>


        <button

          className="language-button"

          onClick={() =>
            setLanguage(
              language === "en"
                ? "hi"
                : "en"
            )
          }

        >

          {language === "en"
            ? "हिन्दी"
            : "English"}

        </button>

      </header>

    );

  }


  // =========================
  // HOME
  // =========================

  function Home() {

    return (

      <>

        <div className="page-title">

          <div>

            <h1>
              {text.title}
            </h1>

            <p>
              {text.subtitle}
            </p>

          </div>


          <button

            className="primary-button"

            onClick={() =>
              setPage("track")
            }

          >

            {text.track}

          </button>

        </div>


        <div className="stats">

          <Stat
            number={
              dashboard?.activeProjects
              || "..."
            }
            label={
              text.activeProjects
            }
          />

          <Stat
            number={
              dashboard?.parcelsUnderProcess
              || "..."
            }
            label={
              text.parcels
            }
          />

          <Stat
            number={
              dashboard?.compensationTracked
              || "..."
            }
            label={
              text.compensation
            }
          />

          <Stat
            number={
              dashboard?.grievancesResolved
              || "..."
            }
            label={
              text.grievances
            }
          />

        </div>


        <div className="two-column">

          <div className="card">

            <h2>
              Critical Stage Alerts
            </h2>

            <Alert
              name="NH-48 ownership verification"
              status="High"
              type="bad"
            />

            <Alert
              name="R&R approval — Package 3"
              status="Due Soon"
              type="warn"
            />

            <Alert
              name="Compensation review queue"
              status="Normal"
              type="ok"
            />

          </div>


          <div className="card">

            <h2>
              Executive Snapshot
            </h2>

            <Metric
              label="Projects on Track"
              value="78%"
            />

            <Metric
              label="Digital Verification"
              value="91.7%"
            />

            <Metric
              label="Processing Improvement"
              value="31%"
            />

          </div>

        </div>

      </>

    );

  }


  // =========================
  // TRACK PAGE
  // =========================

  function TrackPage() {

    return (

      <>

        <PageTitle
          title={text.landStatus}
          description="Track statutory and administrative stages."
        />


        <div className="card">

          <form
            onSubmit={trackLand}
            className="form"
          >

            <label>
              Application / Parcel Reference
            </label>

            <input

              value={trackReference}

              onChange={e =>
                setTrackReference(
                  e.target.value
                )
              }

              placeholder="BHS-RJ-2026-10482"

            />

            <button className="primary-button">

              {text.search}

            </button>

          </form>


          {trackResult && (

            <div className="result">

              {trackResult.error ? (

                <p className="error">

                  {trackResult.error}

                </p>

              ) : (

                <>

                  <h3>
                    {trackResult.reference}
                  </h3>

                  <p>
                    Project:
                    <strong>
                      {" "}
                      {trackResult.project}
                    </strong>
                  </p>

                  <p>
                    Current Stage:
                    <strong>
                      {" "}
                      {trackResult.stage}
                    </strong>
                  </p>

                  <p>
                    Next Stage:
                    <strong>
                      {" "}
                      {trackResult.nextStage}
                    </strong>
                  </p>

                  <p>
                    Ownership:
                    {" "}
                    {trackResult.ownership}
                  </p>

                  <p>
                    Compensation:
                    {" "}
                    {trackResult.compensation}
                  </p>

                  <p>
                    R&R:
                    {" "}
                    {trackResult.rr}
                  </p>

                </>

              )}

            </div>

          )}

        </div>

      </>

    );

  }


  // =========================
  // PROJECTS
  // =========================

  function ProjectsPage() {

    return (

      <>

        <PageTitle
          title={text.projects}
          description="Monitor projects, parcels, progress and risk."
        />


        <div className="card table-container">

          <table>

            <thead>

              <tr>

                <th>Project</th>
                <th>State</th>
                <th>Parcels</th>
                <th>Progress</th>
                <th>Risk</th>

              </tr>

            </thead>


            <tbody>

              {projects.map(project => (

                <tr key={project.id}>

                  <td>
                    {project.name}
                  </td>

                  <td>
                    {project.state}
                  </td>

                  <td>
                    {project.parcels}
                  </td>

                  <td>
                    {project.progress}%
                  </td>

                  <td>

                    <span className="status">

                      {project.risk}

                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </>

    );

  }


  // =========================
  // ANALYTICS
  // =========================

  function AnalyticsPage() {

    if (!analytics) {

      return <p>Loading analytics...</p>;

    }


    return (

      <>

        <PageTitle
          title={text.analytics}
          description="Primary causes of acquisition delays and predictive risk."
        />


        <div className="two-column">

          <div className="card">

            <h2>
              Primary Causes of Delay
            </h2>


            {analytics.causes.map(
              cause => (

                <div
                  key={cause.name}
                  className="cause"
                >

                  <div className="cause-header">

                    <span>
                      {cause.name}
                    </span>

                    <strong>
                      {cause.percentage}%
                    </strong>

                  </div>


                  <div className="progress">

                    <i
                      style={{
                        width:
                          `${cause.percentage}%`
                      }}
                    />

                  </div>

                </div>

              )
            )}

          </div>


          <div className="card">

            <h2>
              AI Predictive Risk
            </h2>

            <h3>
              {analytics.predictiveRisk.project}
            </h3>

            <div className="risk-number">

              {analytics.predictiveRisk.risk}%

            </div>

            <p className="error">

              {analytics.predictiveRisk.level}
              {" "}
              Delay Risk

            </p>

            <ul>

              <li>
                {analytics.predictiveRisk.affectedParcels}
                {" "}
                parcels awaiting verification
              </li>

              <li>
                {analytics.predictiveRisk.compensationCases}
                {" "}
                compensation cases
              </li>

              <li>
                {analytics.predictiveRisk.rrFamilies}
                {" "}
                families awaiting R&R approval
              </li>

            </ul>

          </div>

        </div>

      </>

    );

  }


  // =========================
  // SERVICES
  // =========================

  function ServicesPage() {

    return (

      <>

        <PageTitle
          title={text.services}
          description="Digital citizen services."
        />


        <div className="service-grid">

          <Service
            title="Secure Document Upload"
            description="Submit documents for verification."
          />

          <Service
            title="Compensation Calculator"
            description="Estimate land acquisition compensation."
          />

          <Service
            title="DBT / UPI Payment Tracker"
            description="Track compensation payment stages."
          />

          <Service
            title="R&R Tracking"
            description="Track rehabilitation and resettlement benefits."
          />

          <Service
            title="DigiLocker / Identity"
            description="Secure identity and document verification."
          />

          <Service
            title="3D / AR Project View"
            description="Preview proposed infrastructure."
          />

        </div>

      </>

    );

  }


  // =========================
  // GRIEVANCE
  // =========================

  function GrievancePage() {

    const [form, setForm] =
      useState({
        name: "",
        mobile: "",
        category: "Compensation",
        description: ""
      });


    const [message, setMessage] =
      useState("");


    async function submit(e) {

      e.preventDefault();


      const response =
        await fetch(
          `${API}/grievances`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify(form)

          }
        );


      const data =
        await response.json();


      if (data.success) {

        setMessage(
          `Grievance submitted: ${data.grievance.reference}`
        );

        setForm({
          name: "",
          mobile: "",
          category: "Compensation",
          description: ""
        });

      } else {

        setMessage(data.message);

      }

    }


    return (

      <>

        <PageTitle
          title={text.grievance}
          description="Register and track citizen complaints."
        />


        <div className="card">

          <form
            className="form"
            onSubmit={submit}
          >

            <label>Name</label>

            <input
              required
              value={form.name}
              onChange={e =>
                setForm({
                  ...form,
                  name: e.target.value
                })
              }
            />


            <label>Mobile</label>

            <input
              required
              value={form.mobile}
              onChange={e =>
                setForm({
                  ...form,
                  mobile: e.target.value
                })
              }
            />


            <label>Category</label>

            <select
              value={form.category}
              onChange={e =>
                setForm({
                  ...form,
                  category: e.target.value
                })
              }
            >

              <option>
                Compensation
              </option>

              <option>
                Document Verification
              </option>

              <option>
                Land Ownership
              </option>

              <option>
                R&R
              </option>

            </select>


            <label>Description</label>

            <textarea
              required
              value={form.description}
              onChange={e =>
                setForm({
                  ...form,
                  description: e.target.value
                })
              }
            />


            <button className="primary-button">

              Submit Grievance

            </button>


            {message && (

              <div className="success">

                {message}

              </div>

            )}

          </form>

        </div>

      </>

    );

  }


  // =========================
  // OTHER PAGES
  // =========================

  function GenericPage({ title, description }) {

    return (

      <>

        <PageTitle
          title={title}
          description={description}
        />


        <div className="card">

          <h2>
            BhoomiSetu Module
          </h2>

          <p>
            This dashboard is ready for
            integration with the Node.js
            backend and government data
            services.
          </p>

          <button
            className="primary-button"
            onClick={() =>
              alert(
                "Module action completed."
              )
            }
          >

            Open Module

          </button>

        </div>

      </>

    );

  }


  // =========================
  // PAGE ROUTER
  // =========================

  function MainPage() {

    switch (page) {

      case "track":
        return <TrackPage />;

      case "projects":
        return <ProjectsPage />;

      case "analytics":
        return <AnalyticsPage />;

      case "services":
        return <ServicesPage />;

      case "grievance":
        return <GrievancePage />;

      case "appointment":
        return (
          <GenericPage
            title={text.appointment}
            description="Book a physical government office appointment."
          />
        );

      case "reports":
        return (
          <GenericPage
            title={text.reports}
            description="Generate strategic project reports."
          />
        );

      case "audit":
        return (
          <GenericPage
            title={text.audit}
            description="Review immutable system activity records."
          />
        );

      default:
        return <Home />;

    }

  }


  return (

    <>

      <div className="topbar">

        Government of India •
        Citizen-Centric Digital Governance

      </div>


      <Header />


      <div className="layout">

        <Sidebar />


        <main className="content">

          <MainPage />


          <div className="assistant-card">

            <h2>
              🤖 {text.chatbot}
            </h2>

            <p>
              Ask questions about land acquisition services.
            </p>

            <button
              className="primary-button"
              onClick={() =>
                setChatOpen(true)
              }
            >

              Open Citizen Assistant

            </button>

          </div>

        </main>

      </div>


      {chatOpen && (

        <div className="chatbot">

          <div className="chat-header">

            <strong>
              {text.chatbot}
            </strong>

            <button
              onClick={() =>
                setChatOpen(false)
              }
            >

              ×

            </button>

          </div>


          <div className="chat-body">

            {chatMessages.length === 0 && (

              <div className="bot-message">

                {language === "hi"
                  ? "नमस्ते! मैं भूमि सेतु नागरिक सहायक हूँ।"
                  : "Namaste! I am the BhoomiSetu Citizen Assistant."}

              </div>

            )}


            {chatMessages.map(
              (message, index) => (

                <div
                  key={index}
                  className={
                    message.sender === "user"
                      ? "user-message"
                      : "bot-message"
                  }
                >

                  {message.text}

                </div>

              )
            )}

          </div>


          <div className="quick-buttons">

            <button
              onClick={() =>
                sendChat(
                  language === "hi"
                    ? "भूमि की स्थिति कैसे देखें?"
                    : "How can I track my land status?"
                )
              }
            >

              {language === "hi"
                ? "स्थिति"
                : "Status"}

            </button>


            <button
              onClick={() =>
                sendChat(
                  language === "hi"
                    ? "मुआवज़ा कैसे मिलेगा?"
                    : "How is compensation calculated?"
                )
              }
            >

              {language === "hi"
                ? "मुआवज़ा"
                : "Compensation"}

            </button>


            <button
              onClick={() =>
                sendChat(
                  language === "hi"
                    ? "दस्तावेज़ कैसे अपलोड करें?"
                    : "How do I upload documents?"
                )
              }
            >

              {language === "hi"
                ? "दस्तावेज़"
                : "Documents"}

            </button>

          </div>


          <form
            className="chat-input"
            onSubmit={e => {

              e.preventDefault();

              sendChat();

            }}
          >

            <input

              value={chatInput}

              onChange={e =>
                setChatInput(
                  e.target.value
                )
              }

              placeholder={
                language === "hi"
                  ? "अपना प्रश्न लिखें..."
                  : "Type your question..."
              }

            />

            <button>
              ➤
            </button>

          </form>

        </div>

      )}


      <button
        className="chat-launch"
        onClick={() =>
          setChatOpen(!chatOpen)
        }
      >

        💬

      </button>


      <footer>

        © 2026 BhoomiSetu Prototype •
        Government Land Acquisition Transparency Portal

      </footer>

    </>

  );

}


// =========================
// COMPONENTS
// =========================

function PageTitle({
  title,
  description
}) {

  return (

    <div className="page-title">

      <div>

        <h1>
          {title}
        </h1>

        <p>
          {description}
        </p>

      </div>

    </div>

  );

}


function Stat({
  number,
  label
}) {

  return (

    <div className="stat">

      <strong>
        {number}
      </strong>

      <span>
        {label}
      </span>

    </div>

  );

}


function Alert({
  name,
  status,
  type
}) {

  return (

    <div className="metric-row">

      <span>
        {name}
      </span>

      <strong className={type}>
        {status}
      </strong>

    </div>

  );

}


function Metric({
  label,
  value
}) {

  return (

    <div className="metric-row">

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>

  );

}


function Service({
  title,
  description
}) {

  return (

    <div className="service">

      <h3>
        {title}
      </h3>

      <p>
        {description}
      </p>

      <button
        className="secondary-button"
        onClick={() =>
          alert(
            `${title} module opened.`
          )
        }
      >

        Open

      </button>

    </div>

  );

}


export default App;
