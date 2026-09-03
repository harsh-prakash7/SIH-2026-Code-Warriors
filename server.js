const express = require("express");
const cors = require("cors");

const {
  projects,
  cases,
  grievances,
  appointments,
  analytics
} = require("./data");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());


// ===============================
// HOME
// ===============================

app.get("/", (req, res) => {
  res.json({
    message: "BhoomiSetu API is running",
    version: "1.0.0"
  });
});


// ===============================
// DASHBOARD
// ===============================

app.get("/api/dashboard", (req, res) => {
  res.json({
    activeProjects: 1284,
    parcelsUnderProcess: 72460,
    compensationTracked: "₹18,420 Cr",
    grievancesResolved: "94.2%",
    digitalVerification: "91.7%",
    processingImprovement: "31%"
  });
});


// ===============================
// PROJECTS
// ===============================

app.get("/api/projects", (req, res) => {
  res.json(projects);
});


// ===============================
// LAND STATUS
// ===============================

app.get("/api/land/:reference", (req, res) => {

  const reference = req.params.reference.toUpperCase();

  const landCase = cases.find(
    item => item.reference.toUpperCase() === reference
  );

  if (!landCase) {
    return res.status(404).json({
      success: false,
      message: "Land acquisition case not found"
    });
  }

  res.json({
    success: true,
    case: landCase
  });
});


// ===============================
// ANALYTICS
// ===============================

app.get("/api/analytics", (req, res) => {
  res.json(analytics);
});


// ===============================
// COMPENSATION CALCULATOR
// ===============================

app.post("/api/compensation/calculate", (req, res) => {

  let {
    landValue,
    multiplier,
    additionalBenefits
  } = req.body;

  landValue = Number(landValue);
  multiplier = Number(multiplier);
  additionalBenefits = Number(additionalBenefits || 0);

  if (
    !Number.isFinite(landValue) ||
    !Number.isFinite(multiplier) ||
    !Number.isFinite(additionalBenefits) ||
    landValue < 0 ||
    multiplier < 0 ||
    additionalBenefits < 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid compensation values"
    });
  }

  const estimatedAmount =
    landValue * multiplier + additionalBenefits;

  res.json({
    success: true,
    estimatedAmount
  });
});


// ===============================
// GRIEVANCES
// ===============================

app.get("/api/grievances", (req, res) => {

  res.json({
    total: grievances.length,
    grievances
  });

});


app.post("/api/grievances", (req, res) => {

  const {
    name,
    mobile,
    category,
    description
  } = req.body;

  if (!name || !mobile || !category || !description) {

    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });

  }

  const reference =
    "GRV-2026-" +
    Math.floor(100000 + Math.random() * 900000);

  const grievance = {
    reference,
    name,
    mobile,
    category,
    description,
    status: "Under Review",
    createdAt: new Date().toISOString()
  };

  grievances.push(grievance);

  res.status(201).json({
    success: true,
    message: "Grievance submitted successfully",
    grievance
  });

});


// ===============================
// APPOINTMENTS
// ===============================

app.post("/api/appointments", (req, res) => {

  const {
    service,
    date,
    time,
    office
  } = req.body;

  if (!service || !date || !time || !office) {

    return res.status(400).json({
      success: false,
      message: "All appointment fields are required"
    });

  }

  const reference =
    "APT-2026-" +
    Math.floor(100000 + Math.random() * 900000);

  const appointment = {
    reference,
    service,
    date,
    time,
    office,
    status: "Confirmed"
  };

  appointments.push(appointment);

  res.status(201).json({
    success: true,
    appointment
  });

});


// ===============================
// CHATBOT
// ===============================

app.post("/api/chatbot", (req, res) => {

  const {
    message,
    language = "en"
  } = req.body;

  if (!message) {
    return res.status(400).json({
      success: false,
      message: "Message is required"
    });
  }

  const text = message.toLowerCase();

  let reply;

  if (language === "hi") {

    if (
      text.includes("स्थिति") ||
      text.includes("स्टेटस") ||
      text.includes("track")
    ) {
      reply =
        "भूमि की स्थिति देखने के लिए Land Status डैशबोर्ड खोलें और अपना आवेदन या भूखंड संदर्भ नंबर दर्ज करें।";

    } else if (
      text.includes("मुआवज़ा") ||
      text.includes("मुआवजा") ||
      text.includes("compensation")
    ) {
      reply =
        "Compensation Calculator में भूमि मूल्य और लागू multiplier दर्ज करके अनुमानित मुआवज़ा देखा जा सकता है।";

    } else if (
      text.includes("दस्तावेज़") ||
      text.includes("दस्तावेज") ||
      text.includes("document")
    ) {
      reply =
        "Citizen Services में Secure Document Upload विकल्प से आवश्यक दस्तावेज़ जमा किए जा सकते हैं।";

    } else if (
      text.includes("शिकायत") ||
      text.includes("grievance")
    ) {
      reply =
        "Grievance Redressal डैशबोर्ड से शिकायत दर्ज करें और प्राप्त reference number सुरक्षित रखें।";

    } else {

      reply =
        "कृपया भूमि स्थिति, मुआवज़ा, दस्तावेज़, शिकायत, पुनर्वास या अपॉइंटमेंट के बारे में पूछें।";
    }

  } else {

    if (
      text.includes("status") ||
      text.includes("track") ||
      text.includes("land")
    ) {

      reply =
        "Open Land Status from the sidebar and enter your application or parcel reference number.";

    } else if (
      text.includes("compensation") ||
      text.includes("money")
    ) {

      reply =
        "Use the Compensation Calculator under Citizen Services. It provides an illustrative estimate.";

    } else if (
      text.includes("document") ||
      text.includes("upload")
    ) {

      reply =
        "Open Secure Document Upload under Citizen Services and submit the required paperwork.";

    } else if (
      text.includes("grievance") ||
      text.includes("complaint")
    ) {

      reply =
        "Open Grievance Redressal and submit your complaint. Keep the generated reference number.";

    } else {

      reply =
        "Please ask about land status, compensation, documents, grievances, R&R or appointments.";

    }

  }

  res.json({
    success: true,
    reply
  });

});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {

  console.log(
    `BhoomiSetu server running at http://localhost:${PORT}`
  );

});
