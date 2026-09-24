import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Thermometer,
  Zap,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("operator@machinova.ai");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    setLoading(true);

    // Phase 1 mock authentication
    // Backend / Firebase / PostgreSQL will be connected later.
    setTimeout(() => {
      setLoading(false);
      setLoginSuccess(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-slate-900">
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-200/30 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#00288e 1px, transparent 1px), linear-gradient(90deg, #00288e 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
        {/* =========================================================
            LEFT SIDE - INDUSTRIAL AI SHOWCASE
        ========================================================== */}
        <section className="relative flex w-full flex-col justify-between overflow-hidden px-6 py-8 sm:px-10 lg:w-[58%] lg:px-16 lg:py-12">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00288e] text-white shadow-lg shadow-blue-900/20">
                <Cpu size={23} strokeWidth={2.2} />
              </div>

              <div>
                <h1 className="text-xl font-black tracking-[0.18em] text-[#00288e]">
                  MACHINOVA
                </h1>
                <p className="text-[9px] font-bold tracking-[0.28em] text-slate-500">
                  INDUSTRIAL NEURAL SUITE
                </p>
              </div>
            </div>
          </div>

          {/* Main Hero */}
          <div className="relative my-10 flex flex-1 flex-col justify-center">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-3 py-1.5 text-xs font-bold text-[#00288e] backdrop-blur">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                INDUSTRIAL INTELLIGENCE PLATFORM
              </div>

              <h2 className="text-4xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl xl:text-6xl">
                Intelligent
                <span className="block text-[#00288e]">
                  Maintenance
                </span>
                Starts Here.
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Monitor machine health, detect anomalies, predict failures,
                and prevent costly downtime with one intelligent industrial
                platform.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <div className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Platform
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-800">
                    Predictive Maintenance
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Intelligence
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-800">
                    Machine Learning
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Monitoring
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-800">
                    Real-Time Analytics
                  </p>
                </div>
              </div>
            </div>

            {/* =====================================================
                MACHINE AI VISUAL
            ====================================================== */}
            <div className="relative mt-12 h-[310px] w-full overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-5 shadow-xl shadow-slate-300/20 backdrop-blur-md">
              {/* Grid */}
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "linear-gradient(#00288e 1px, transparent 1px), linear-gradient(90deg, #00288e 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />

              {/* Central AI Ring */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-blue-200">
                  <div className="absolute h-28 w-28 animate-pulse rounded-full border-2 border-dashed border-[#00288e]/40" />

                  <div className="absolute h-20 w-20 rounded-full border border-cyan-300 bg-blue-50 shadow-inner" />

                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#00288e] text-white shadow-xl shadow-blue-900/30">
                    <Cpu size={27} />
                  </div>

                  {/* Orbit dots */}
                  <span className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-500 shadow-lg" />
                  <span className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-blue-600 shadow-lg" />
                  <span className="absolute -bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-indigo-500 shadow-lg" />
                  <span className="absolute -left-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-teal-500 shadow-lg" />
                </div>
              </div>

              {/* Machine Health Card */}
              <div className="absolute left-5 top-5 rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                    <Activity size={16} />
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Machine Health
                    </p>
                    <p className="text-sm font-black text-emerald-600">
                      94% Healthy
                    </p>
                  </div>
                </div>
              </div>

              {/* Temperature Card */}
              <div className="absolute bottom-5 left-5 rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-orange-50 p-2 text-orange-500">
                    <Thermometer size={16} />
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Temperature
                    </p>
                    <p className="text-sm font-black text-slate-800">
                      68.4°C
                    </p>
                  </div>
                </div>
              </div>

              {/* Vibration Card */}
              <div className="absolute right-5 top-5 rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                    <Activity size={16} />
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Vibration
                    </p>
                    <p className="text-sm font-black text-slate-800">
                      2.31 mm/s
                    </p>
                  </div>
                </div>
              </div>

              {/* Power Card */}
              <div className="absolute bottom-5 right-5 rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-cyan-50 p-2 text-cyan-600">
                    <Zap size={16} />
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Power Load
                    </p>
                    <p className="text-sm font-black text-slate-800">
                      72.8 kW
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Status */}
              <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-4 py-2 shadow-lg">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  AI Engine Online
                </span>
              </div>
            </div>

            {/* Value Pillars */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-slate-200 bg-white/70 p-3">
                <p className="text-xs font-black text-[#00288e]">
                  MONITOR
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  Track machine parameters
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white/70 p-3">
                <p className="text-xs font-black text-[#00288e]">
                  PREDICT
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  Identify possible failures
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white/70 p-3">
                <p className="text-xs font-black text-[#00288e]">
                  PREVENT
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  Reduce unexpected downtime
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-slate-200 pt-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span>MACHINOVA AI SYSTEM</span>
            <span>v1.0.0</span>
          </div>
        </section>

        {/* =========================================================
            RIGHT SIDE - LOGIN
        ========================================================== */}
        <section className="flex w-full items-center justify-center px-5 py-10 sm:px-8 lg:w-[42%] lg:px-12">
          <div className="w-full max-w-[480px]">
            {/* Auth Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-300/30 sm:p-8">
              {/* Auth Header */}
              <div className="mb-8">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black tracking-[0.25em] text-[#00288e]">
                      MACHINOVA
                    </p>

                    <p className="mt-1 text-[9px] font-bold tracking-[0.22em] text-slate-400">
                      INTELLIGENT OS
                    </p>
                  </div>

                  <div className="rounded-xl bg-blue-50 p-3 text-[#00288e]">
                    <ShieldCheck size={23} />
                  </div>
                </div>

                <h2 className="text-3xl font-black tracking-tight text-slate-950">
                  Welcome Back
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Sign in to access your industrial predictive maintenance
                  console.
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500"
                  >
                    Operator Email
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="operator@machinova.ai"
                      className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm font-medium outline-none transition focus:border-[#00288e] focus:bg-white focus:ring-4 focus:ring-blue-100"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500"
                  >
                    Security Key
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your security key"
                      className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-12 text-sm font-medium outline-none transition focus:border-[#00288e] focus:bg-white focus:ring-4 focus:ring-blue-100"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#00288e]"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 accent-[#00288e]"
                    />

                    <span className="text-xs font-medium text-slate-500">
                      Remember terminal
                    </span>
                  </label>

                  <button
                    type="button"
                    className="text-xs font-bold text-[#00288e] hover:underline"
                    onClick={() =>
                      alert(
                        "Password recovery will be connected in the authentication phase."
                      )
                    }
                  >
                    Forgot security key?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading || loginSuccess}
                  className="group relative flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#00288e] text-sm font-black tracking-wide text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#001f70] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-80"
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      AUTHENTICATING...
                    </>
                  ) : loginSuccess ? (
                    <>
                      <CheckCircle2 size={19} />
                      ACCESS GRANTED
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={19} />
                      AUTHENTICATE SESSION
                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* Authentication Pipeline */}
              <div className="my-7 h-px bg-slate-100" />

              <div>
                <p className="mb-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Authentication Pipeline
                </p>

                <div className="grid grid-cols-3 gap-2">
                  <PipelineItem
                    number="01"
                    label="IDENTITY"
                    active
                  />

                  <PipelineItem
                    number="02"
                    label="SECURITY"
                    active
                  />

                  <PipelineItem
                    number="03"
                    label="ACCESS"
                    active={loginSuccess}
                  />
                </div>
              </div>
            </div>

            {/* Security Alert */}
            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
              <div className="rounded-lg bg-amber-100 p-2 text-amber-600">
                <AlertTriangle size={16} />
              </div>

              <div>
                <p className="text-xs font-black text-amber-800">
                  Secure Industrial Access
                </p>

                <p className="mt-1 text-[11px] leading-5 text-amber-700">
                  This console is intended for authorized industrial
                  operators and maintenance teams.
                </p>
              </div>
            </div>

            {/* Bottom Text */}
            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              MACHINOVA SYSTEMS OPERATIONAL
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ===============================================================
   PIPELINE ITEM
================================================================ */

function PipelineItem({ number, label, active }) {
  return (
    <div
      className={`rounded-xl border p-3 transition ${
        active
          ? "border-blue-100 bg-blue-50/70"
          : "border-slate-100 bg-slate-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`text-[9px] font-black ${
            active ? "text-[#00288e]" : "text-slate-400"
          }`}
        >
          {number}
        </span>

        {active && (
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        )}
      </div>

      <p
        className={`mt-2 text-[9px] font-black tracking-wider ${
          active ? "text-slate-700" : "text-slate-400"
        }`}
      >
        {label}
      </p>
    </div>
  );
}
