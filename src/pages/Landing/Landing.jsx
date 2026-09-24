import { Link } from "react-router-dom";

const features = [
  {
    icon: "psychology",
    title: "AI Failure Prediction",
    description:
      "Predict machine failure up to 14 days before breakdown with deep sensor telemetry forecasting and neural vibration spectrum analysis.",
    link: "Explore Telemetry Engine",
    color: "primary",
  },
  {
    icon: "analytics",
    title: "Cost-Aware Scheduling",
    description:
      "Prioritize maintenance actions dynamically by balancing failure probabilities against downtime losses and replacement part economics.",
    link: "View ROI Calculations",
    color: "secondary",
  },
  {
    icon: "autorenew",
    title: "Dynamic Re-Scheduling",
    description:
      "Automatically shuffle maintenance work-queues and notify technician dispatch in real time as critical anomalies surface across plant clusters.",
    link: "Explore Autonomous Dispatch",
    color: "tertiary",
  },
];

const steps = [
  {
    number: "STEP 01",
    title: "Sensor Data",
    description:
      "Continuous 100Hz IoT ingestion: thermal, triaxial vibration, and hydrodynamic pressure.",
    icon: "sensors",
    color: "primary",
  },
  {
    number: "STEP 02",
    title: "AI Prediction",
    description:
      "Deep autoencoder neural models pinpoint micro-anomalies against asset baseline models.",
    icon: "neurology",
    color: "secondary",
  },
  {
    number: "STEP 03",
    title: "Risk Analysis",
    description:
      "Asset degradation curves predict Remaining Useful Life (RUL) with probabilistic confidence.",
    icon: "query_stats",
    color: "neutral",
  },
  {
    number: "STEP 04",
    title: "Optimization",
    description:
      "Algorithm evaluates component inventory and optimal technician scheduling windows.",
    icon: "balance",
    color: "primary",
  },
  {
    number: "STEP 05",
    title: "Maintenance",
    description:
      "Instant automated ERP ticket emission and dynamic shift-level field dispatch.",
    icon: "build_circle",
    color: "secondary",
  },
];

function MaterialIcon({ children, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`}>
      {children}
    </span>
  );
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 w-full max-w-[1440px] mx-auto px-margin flex items-center justify-between">
        <div className="flex items-center gap-space-sm">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <MaterialIcon className="text-white text-[20px]">
              precision_manufacturing
            </MaterialIcon>
          </div>

          <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">
            MACHINOVA
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-space-lg">
          <a
            href="#features"
            className="transition-colors text-primary font-semibold"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
          >
            How It Works
          </a>

          <a
            href="#about"
            className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
          >
            About
          </a>
        </nav>

        <div className="flex items-center gap-space-md">
          <div className="hidden lg:flex items-center gap-space-xs px-3 py-1 rounded-full bg-surface-container-low">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
              AI System Online
            </span>
          </div>

          <Link
            to="/login"
            className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface px-3 py-2 transition-colors"
          >
            Login
          </Link>

          <Link
            to="/login"
            className="font-label-md text-label-md text-on-primary bg-primary-container hover:bg-primary px-space-md py-2 rounded-lg transition-colors"
          >
            Get Started
          </Link>

          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <MaterialIcon className="text-on-primary text-[18px]">
              person
            </MaterialIcon>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeroTelemetry() {
  return (
    <div className="lg:col-span-6 relative w-full flex flex-col">
      <div className="relative w-full rounded-2xl bg-surface-container-low/60 p-6 shadow-xl border border-outline-variant/50 backdrop-blur-md overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-surface-container">
          <div className="flex items-center gap-space-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping" />

            <span className="font-label-md text-label-md text-on-surface font-bold">
              CNC-TURBINE-09A // DIGITAL TWIN
            </span>
          </div>

          <span className="px-2.5 py-0.5 rounded-full bg-surface-container-lowest text-secondary font-label-sm text-label-sm font-semibold border border-outline-variant/40">
            STREAM ACTIVE (100 Hz)
          </span>
        </div>

        <div className="relative h-[340px] w-full my-4 flex items-center justify-center bg-surface-container-lowest rounded-xl border border-surface-container-high overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                height="24"
                id="industrial-grid"
                patternUnits="userSpaceOnUse"
                width="24"
              >
                <circle cx="1" cy="1" fill="#00288e" r="1" />
              </pattern>
            </defs>

            <rect
              fill="url(#industrial-grid)"
              height="100%"
              width="100%"
            />
          </svg>

          <div className="relative flex items-center justify-center">
            <div className="absolute w-44 h-44 rounded-full border border-secondary/30 animate-ping opacity-25" />

            <div className="absolute w-36 h-36 rounded-full border border-primary-container/40 animate-pulse" />

            <div className="relative z-10 w-28 h-28 rounded-full bg-surface-container-lowest shadow-lg border-2 border-primary flex flex-col items-center justify-center p-2 text-center">
              <MaterialIcon className="text-primary text-[24px]">
                hub
              </MaterialIcon>

              <span className="font-label-sm text-label-sm font-bold text-primary tracking-tight mt-0.5">
                AI ENGINE
              </span>

              <span className="font-label-sm text-label-sm text-secondary font-bold">
                92% OK
              </span>
            </div>

            <svg
              className="absolute w-[360px] h-[300px] pointer-events-none -z-0"
              viewBox="0 0 360 300"
            >
              <line
                opacity="0.6"
                stroke="#00687a"
                strokeDasharray="3 3"
                strokeWidth="1.5"
                x1="40"
                x2="140"
                y1="50"
                y2="120"
              />

              <line
                opacity="0.6"
                stroke="#00687a"
                strokeDasharray="3 3"
                strokeWidth="1.5"
                x1="320"
                x2="220"
                y1="50"
                y2="120"
              />

              <line
                opacity="0.6"
                stroke="#00687a"
                strokeDasharray="3 3"
                strokeWidth="1.5"
                x1="40"
                x2="140"
                y1="250"
                y2="180"
              />

              <line
                opacity="0.6"
                stroke="#00687a"
                strokeDasharray="3 3"
                strokeWidth="1.5"
                x1="320"
                x2="220"
                y1="250"
                y2="180"
              />
            </svg>
          </div>

          {/* Temperature */}
          <div className="absolute top-4 left-4 bg-surface-container-lowest/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm border border-outline-variant/40 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary" />

            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                Temperature
              </span>

              <span className="font-label-md text-label-md text-on-surface font-bold">
                68.4°C{" "}
                <span className="font-normal text-secondary font-label-sm">
                  (Normal)
                </span>
              </span>
            </div>
          </div>

          {/* Vibration */}
          <div className="absolute top-4 right-4 bg-surface-container-lowest/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm border border-outline-variant/40 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary" />

            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                Vibration
              </span>

              <span className="font-label-md text-label-md text-on-surface font-bold">
                2.1 mm/s{" "}
                <span className="font-normal text-secondary font-label-sm">
                  (Stable)
                </span>
              </span>
            </div>
          </div>

          {/* Pressure */}
          <div className="absolute bottom-4 left-4 bg-surface-container-lowest/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm border border-outline-variant/40 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary" />

            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                Pressure
              </span>

              <span className="font-label-md text-label-md text-on-surface font-bold">
                4.2 bar{" "}
                <span className="font-normal text-secondary font-label-sm">
                  (Optimal)
                </span>
              </span>
            </div>
          </div>

          {/* RPM */}
          <div className="absolute bottom-4 right-4 bg-surface-container-lowest/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm border border-outline-variant/40 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-container" />

            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                Spindle RPM
              </span>

              <span className="font-label-md text-label-md text-on-surface font-bold">
                3,450 RPM
              </span>
            </div>
          </div>

          {/* Alert */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-surface-container-lowest/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-error/30 flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-error animate-ping" />

            <div className="flex flex-col text-left">
              <span className="font-label-sm text-label-sm font-bold text-error tracking-tight">
                CRITICAL SIGNAL DETECTED
              </span>

              <span className="font-body-sm text-body-sm text-on-surface">
                Failure Risk: 91% • Bearing Fault
              </span>
            </div>

            <span className="px-2 py-0.5 rounded bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
              Auto-Dispatched ✓
            </span>
          </div>
        </div>

        {/* State ribbon */}
        <div className="mt-3 p-3 bg-surface-container-lowest rounded-xl border border-surface-container flex flex-col gap-2">
          <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
            <span className="font-semibold text-on-surface">
              LIVE SYSTEM STATE EVOLUTION
            </span>

            <span className="font-mono">
              CYCLE 084 // RECOVERY 0.4s
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 items-center">
            <div className="px-2 py-1 bg-surface-container rounded text-center font-label-sm text-label-sm text-secondary font-bold">
              HEALTHY
            </div>

            <div className="px-2 py-1 bg-surface-container rounded text-center font-label-sm text-label-sm text-on-surface-variant font-medium">
              WARNING
            </div>

            <div className="px-2 py-1 bg-error-container/40 text-error rounded text-center font-label-sm text-label-sm font-bold border border-error/20">
              CRITICAL
            </div>

            <div className="px-2 py-1 bg-primary-fixed rounded text-center font-label-sm text-label-sm text-primary font-bold">
              ANALYZING
            </div>

            <div className="px-2 py-1 bg-surface-container rounded text-center font-label-sm text-label-sm text-secondary font-bold">
              RESTORED
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-on-surface-variant font-body-sm text-body-sm">
            <span>Machine Sensors</span>
            <MaterialIcon className="text-[14px]">
              chevron_right
            </MaterialIcon>

            <span>Real-Time Data</span>
            <MaterialIcon className="text-[14px]">
              chevron_right
            </MaterialIcon>

            <span>AI Diagnostics</span>
            <MaterialIcon className="text-[14px]">
              chevron_right
            </MaterialIcon>

            <span className="text-primary font-semibold">
              Failure Prediction
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute -top-40 right-0 w-[550px] h-[550px] bg-secondary-container/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="absolute top-80 left-10 w-[420px] h-[420px] bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <section className="max-w-[1440px] mx-auto px-margin pt-space-xl pb-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-6 flex flex-col items-start space-y-space-md">
            <div className="inline-flex items-center gap-space-xs px-3.5 py-1.5 rounded-full bg-surface-container shadow-sm border border-outline-variant/40">
              <MaterialIcon className="text-secondary text-[16px]">
                bolt
              </MaterialIcon>

              <span className="font-label-sm text-label-sm font-semibold tracking-wider text-secondary uppercase">
                AI-Powered Predictive Maintenance
              </span>
            </div>

            <div className="flex flex-col space-y-space-xs">
              <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight leading-none">
                Predict. Prevent
                <br />

                <span className="bg-gradient-to-r from-primary via-primary-container to-secondary bg-clip-text text-transparent">
                  Optimize.
                </span>
              </h1>

              <p className="font-headline-sm text-headline-sm text-on-surface font-semibold pt-space-xs">
                AI-powered predictive maintenance for smarter industrial
                operations.
              </p>
            </div>

            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              Monitor machine health, predict catastrophic failures, and
              automatically prioritize maintenance using high-frequency sensor
              telemetry and neural diagnostic models.
            </p>

            <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
              <Link
                to="/login"
                className="inline-flex items-center gap-space-xs bg-primary-container hover:bg-primary text-on-primary px-space-lg py-3 rounded-lg font-label-md text-label-md transition-all duration-150 shadow-md hover:shadow-lg"
              >
                <span>Get Started</span>

                <MaterialIcon className="text-[18px]">
                  arrow_forward
                </MaterialIcon>
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex items-center gap-space-xs bg-surface-container-lowest/90 hover:bg-surface-container-low text-on-surface px-space-lg py-3 rounded-lg font-label-md text-label-md transition-all duration-150 shadow-sm border border-outline-variant/50"
              >
                <MaterialIcon className="text-[18px] text-secondary">
                  explore
                </MaterialIcon>

                <span>Explore Platform</span>
              </a>
            </div>

            <div className="w-full pt-space-lg mt-space-sm border-t border-surface-container-high/80 grid grid-cols-3 gap-space-sm">
              <div className="flex flex-col">
                <span className="font-metric-val text-headline-sm text-primary font-bold">
                  99.4%
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Anomaly Accuracy
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-metric-val text-headline-sm text-secondary font-bold">
                  40%
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Downtime Cut
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-metric-val text-headline-sm text-on-surface font-bold">
                  500+
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Assets Connected
                </span>
              </div>
            </div>
          </div>

          <HeroTelemetry />
        </div>
      </section>
    </div>
  );
}

function Features() {
  return (
    <section
      id="features"
      className="w-full bg-surface-container-low/40 py-24 border-y border-surface-container"
    >
      <div className="max-w-[1440px] mx-auto px-margin">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-space-xs">
          <span className="px-3 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">
            Core Capabilities
          </span>

          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
            Intelligent Maintenance. Smarter Decisions.
          </h2>

          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Enterprise machine intelligence engineered to prevent catastrophic
            mechanical failure and eliminate operational blackouts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {features.map((feature) => {
            const iconBg =
              feature.color === "primary"
                ? "bg-surface-container text-primary"
                : feature.color === "secondary"
                ? "bg-secondary-container/30 text-secondary"
                : "bg-surface-variant text-tertiary-container";

            const linkColor =
              feature.color === "primary"
                ? "text-primary"
                : feature.color === "secondary"
                ? "text-secondary"
                : "text-tertiary-container";

            return (
              <div
                key={feature.title}
                className="p-8 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow duration-200 border border-outline-variant/40 flex flex-col justify-between"
              >
                <div className="space-y-space-md">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}
                  >
                    <MaterialIcon className="text-[28px]">
                      {feature.icon}
                    </MaterialIcon>
                  </div>

                  <div className="space-y-space-xs">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      {feature.title}
                    </h3>

                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <div
                  className={`pt-space-lg flex items-center gap-2 font-label-md text-label-md font-semibold ${linkColor}`}
                >
                  <span>{feature.link}</span>

                  <MaterialIcon className="text-[16px]">
                    arrow_forward
                  </MaterialIcon>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="max-w-[1440px] mx-auto px-margin py-24 w-full"
    >
      <div className="text-center max-w-2xl mx-auto mb-20 space-y-space-xs">
        <span className="px-3 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">
          Operational Architecture
        </span>

        <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
          Predictive Intelligence Pipeline
        </h2>

        <p className="font-body-lg text-body-lg text-on-surface-variant">
          End-to-end edge-to-cloud computing pipeline converting physical
          micro-disturbances into automated maintenance precision.
        </p>
      </div>

      <div className="relative w-full">
        <div className="hidden lg:block absolute top-12 left-16 right-16 h-0.5 border-t-2 border-dashed border-outline-variant/60 -z-0" />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-space-lg relative z-10">
          {steps.map((step) => {
            const borderColor =
              step.color === "primary"
                ? "border-primary-container"
                : step.color === "secondary"
                ? "border-secondary"
                : "border-outline";

            const iconColor =
              step.color === "primary"
                ? "text-primary"
                : step.color === "secondary"
                ? "text-secondary"
                : "text-on-surface";

            const numberColor =
              step.color === "primary"
                ? "text-primary"
                : step.color === "secondary"
                ? "text-secondary"
                : "text-on-surface-variant";

            return (
              <div
                key={step.number}
                className="flex flex-col items-center text-center space-y-space-sm group"
              >
                <div
                  className={`w-16 h-16 rounded-full bg-surface-container-lowest shadow-md border-2 ${borderColor} flex items-center justify-center transition-transform duration-200 group-hover:scale-110`}
                >
                  <MaterialIcon className={`${iconColor} text-[26px]`}>
                    {step.icon}
                  </MaterialIcon>
                </div>

                <div className="space-y-1">
                  <span
                    className={`font-label-sm text-label-sm font-bold uppercase tracking-wider ${numberColor}`}
                  >
                    {step.number}
                  </span>

                  <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    {step.title}
                  </h4>

                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        id="about"
        className="mt-20 p-8 rounded-2xl bg-surface-container border border-outline-variant/40 flex flex-col md:flex-row items-center justify-between gap-space-md shadow-sm"
      >
        <div className="space-y-1 text-center md:text-left">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
            Ready to safeguard industrial operations?
          </h3>

          <p className="font-body-md text-body-md text-on-surface-variant">
            Request a live telemetric audit of your existing plant
            infrastructure.
          </p>
        </div>

        <div className="flex items-center gap-space-sm">
          <Link
            to="/login"
            className="bg-primary text-on-primary px-space-lg py-3 rounded-lg font-label-md text-label-md shadow hover:bg-primary-container transition-colors"
          >
            Schedule Hardware Pilot
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-surface-container-low mt-auto py-space-xl">
      <div className="max-w-[1440px] mx-auto px-margin flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-sm">
          <span className="font-headline-sm text-headline-sm text-primary">
            MACHINOVA
          </span>

          <span className="font-body-sm text-body-sm text-on-surface-variant">
            | Industrial Asset Telemetry & Predictive Maintenance
          </span>
        </div>

        <div className="font-body-sm text-body-sm text-on-surface-variant text-center">
          © 2025 MACHINOVA Corporation. All rights reserved. Precision
          computational infrastructure.
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-surface-container-lowest font-body-md text-on-surface antialiased">
      <Header />

      <main className="w-full pt-16 bg-surface-container-lowest">
        <Hero />
        <Features />
        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}
