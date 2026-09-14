import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, BookOpen, CheckCircle2, Clock3, GraduationCap,
  LayoutDashboard, LogIn, Menu, ShieldCheck, Sparkles, Users,
  X, LockKeyhole, ChevronLeft, ChevronRight, Send, Trophy
} from "lucide-react";
import "./styles.css";

const demoQuestions = [
  { id: 1, q: "Which part of a plant carries water from the roots to the leaves?", options: ["Phloem", "Xylem", "Stomata", "Chlorophyll"], answer: 1 },
  { id: 2, q: "What is the main purpose of photosynthesis?", options: ["To produce glucose using light energy", "To absorb oxygen", "To digest proteins", "To produce soil"], answer: 0 },
  { id: 3, q: "Which organ pumps blood around the human body?", options: ["Liver", "Lung", "Heart", "Kidney"], answer: 2 },
  { id: 4, q: "Which gas is mainly used by plants during photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], answer: 2 },
  { id: 5, q: "DNA is best described as:", options: ["A type of sugar", "Genetic material", "A digestive enzyme", "A mineral"], answer: 1 }
];

const defaultExams = [
  { id: "english", title: "Grade 12 English Examination", subject: "English", grade: "Grade 12", duration: 30, questions: [
    { id: 101, q: "Choose the correct sentence.", options: ["She go to school every day.", "She goes to school every day.", "She going to school every day.", "She gone to school every day."], answer: 1 },
    { id: 102, q: "What is the opposite of 'ancient'?", options: ["Old", "Modern", "Historic", "Former"], answer: 1 },
    { id: 103, q: "Which word is a synonym of 'rapid'?", options: ["Slow", "Quick", "Weak", "Late"], answer: 1 },
    { id: 104, q: "Identify the noun in: 'Education changes lives.'", options: ["changes", "lives", "Education", "the"], answer: 2 },
    { id: 105, q: "Which punctuation mark ends a direct question?", options: [".", ",", "!", "?"], answer: 3 }
  ]},
  { id: "maths", title: "Grade 12 Mathematics Examination", subject: "Maths", grade: "Grade 12", duration: 40, questions: [
    { id: 201, q: "What is 12 × 8?", options: ["86", "96", "108", "88"], answer: 1 },
    { id: 202, q: "Solve: 2x + 6 = 16.", options: ["x = 4", "x = 5", "x = 6", "x = 8"], answer: 1 },
    { id: 203, q: "What is the derivative of x²?", options: ["x", "2x", "x²", "2"], answer: 1 },
    { id: 204, q: "What is √144?", options: ["10", "11", "12", "14"], answer: 2 },
    { id: 205, q: "What is 25% of 200?", options: ["25", "40", "50", "75"], answer: 2 }
  ]},
  { id: "economics", title: "Grade 12 Economics Examination", subject: "Economics", grade: "Grade 12", duration: 30, questions: [
    { id: 301, q: "What is scarcity in economics?", options: ["Unlimited resources", "Limited resources and unlimited wants", "Free goods only", "High prices only"], answer: 1 },
    { id: 302, q: "The law of demand generally states that when price rises, quantity demanded:", options: ["Rises", "Falls", "Stays exactly the same", "Doubles"], answer: 1 },
    { id: 303, q: "GDP measures the value of:", options: ["All imported goods only", "Final goods and services produced within an economy", "Only government spending", "Only exports"], answer: 1 },
    { id: 304, q: "Inflation is a sustained increase in the:", options: ["General price level", "Employment rate", "Population only", "Exchange reserves only"], answer: 0 },
    { id: 305, q: "Which is a factor of production?", options: ["Land", "Inflation", "Tax", "Price"], answer: 0 }
  ]},
  { id: "aptitude", title: "Grade 12 Aptitude Test", subject: "Aptitude Test", grade: "Grade 12", duration: 30, questions: [
    { id: 401, q: "Find the next number: 2, 4, 8, 16, ?", options: ["20", "24", "30", "32"], answer: 3 },
    { id: 402, q: "If all roses are flowers and some flowers are red, which statement is definitely true?", options: ["All roses are red.", "Some roses are not flowers.", "Roses are flowers.", "No flowers are red."], answer: 2 },
    { id: 403, q: "Which word does not belong?", options: ["Apple", "Mango", "Carrot", "Banana"], answer: 2 },
    { id: 404, q: "A clock shows 3:00. What is the angle between the hands?", options: ["45°", "60°", "90°", "180°"], answer: 2 },
    { id: 405, q: "If CAT is coded as DBU, how is DOG coded?", options: ["EPH", "EOG", "DPH", "FPI"], answer: 0 }
  ]},
  { id: "biology", title: "Grade 12 Biology Examination", subject: "Biology", grade: "Grade 12", duration: 30, questions: [
    { id: 501, q: "Which part of a plant carries water from roots to leaves?", options: ["Phloem", "Xylem", "Stomata", "Chlorophyll"], answer: 1 },
    { id: 502, q: "What is the main purpose of photosynthesis?", options: ["Produce glucose using light energy", "Absorb oxygen", "Digest proteins", "Produce soil"], answer: 0 },
    { id: 503, q: "Which organ pumps blood around the human body?", options: ["Liver", "Lung", "Heart", "Kidney"], answer: 2 },
    { id: 504, q: "Which gas is mainly used by plants during photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], answer: 2 },
    { id: 505, q: "DNA is best described as:", options: ["A type of sugar", "Genetic material", "A digestive enzyme", "A mineral"], answer: 1 }
  ]},
  { id: "physics", title: "Grade 12 Physics Examination", subject: "Physics", grade: "Grade 12", duration: 35, questions: [
    { id: 601, q: "What is the SI unit of force?", options: ["Joule", "Newton", "Watt", "Pascal"], answer: 1 },
    { id: 602, q: "What is the approximate acceleration due to gravity near Earth's surface?", options: ["4.9 m/s²", "9.8 m/s²", "19.6 m/s²", "98 m/s²"], answer: 1 },
    { id: 603, q: "Which quantity is measured in volts?", options: ["Electric current", "Resistance", "Potential difference", "Power"], answer: 2 },
    { id: 604, q: "What is the formula for speed?", options: ["Distance ÷ time", "Time ÷ distance", "Mass × acceleration", "Force ÷ area"], answer: 0 },
    { id: 605, q: "Which type of energy does a moving object possess?", options: ["Chemical", "Kinetic", "Nuclear", "Potential only"], answer: 1 }
  ]}
];

function getExams() {
  try { return JSON.parse(localStorage.getItem("exam_exams")) || defaultExams; }
  catch { return defaultExams; }
}
function saveResult(result) {
  const old = JSON.parse(localStorage.getItem("exam_results") || "[]");
  localStorage.setItem("exam_results", JSON.stringify([result, ...old]));
}
function getResults() {
  return JSON.parse(localStorage.getItem("exam_results") || "[]");
}

function App() {
  const [page, setPage] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [student, setStudent] = useState(null);
  const [activeExam, setActiveExam] = useState(null);
  const [results, setResults] = useState(getResults());
  const [exams, setExams] = useState(getExams());

  const openExam = (exam) => {
    setActiveExam(exam);
    setPage("student");
    setMobileOpen(false);
  };

  const refresh = () => {
    setResults(getResults());
    setExams(getExams());
  };

  return (
    <div className="app-shell">
      <header className="navbar">
        <div className="brand" onClick={() => setPage("home")}>
          <img src="/logo.jpg" alt="Education Bureau logo" />
          <div>
            <strong>Waxbarashada DDS</strong>
            <span>Online Examination Portal</span>
          </div>
        </div>
        <button className="menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22}/> : <Menu size={22}/>}
        </button>
        <nav className={mobileOpen ? "nav-links open" : "nav-links"}>
          <button onClick={() => {setPage("home");setMobileOpen(false)}}>Home</button>
          <button onClick={() => {setPage("exams");setMobileOpen(false)}}>Examinations</button>
          <button className="admin-link" onClick={() => {setPage("admin-login");setMobileOpen(false)}}><ShieldCheck size={16}/> Admin</button>
        </nav>
      </header>

      {page === "home" && <Home setPage={setPage} exams={exams} openExam={openExam}/>}
      {page === "exams" && <ExamList exams={exams} openExam={openExam} setPage={setPage}/>}
      {page === "student" && <StudentGate exam={activeExam} setStudent={setStudent} student={student} setPage={setPage}/>}
      {page === "take-exam" && <ExamRunner exam={activeExam} student={student} setPage={setPage} onResult={() => {refresh();setPage("submitted")}}/>}
      {page === "submitted" && <Submitted setPage={setPage}/>}
      {page === "admin-login" && <AdminLogin setPage={setPage}/>}
      {page === "admin" && <AdminDashboard results={results} exams={exams} setExams={setExams} refresh={refresh}/>}

      <footer className="footer">
        <div>© {new Date().getFullYear()} Waxbarashada DDS • Online Examination System</div>
        <div className="footer-dot">Secure • Responsive • Ready for API integration</div>
      </footer>
    </div>
  );
}

function Home({setPage, exams, openExam}) {
  return <main>
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><Sparkles size={15}/> DIGITAL EDUCATION</div>
        <h1>Smart online exams for <span>better learning.</span></h1>
        <p>Modern, simple and responsive examination platform for secondary school students. Students enter their details, start an exam and submit answers securely.</p>
        <div className="hero-actions">
          <button className="primary" onClick={() => setPage("exams")}>Start Examination <ArrowRight size={18}/></button>
          <button className="secondary" onClick={() => setPage("admin-login")}><LayoutDashboard size={17}/> Admin Portal</button>
        </div>
        <div className="mini-stats">
          <div><strong>{exams.length}</strong><span>Available subjects</span></div>
          <div><strong>24/7</strong><span>Access</span></div>
          <div><strong>100%</strong><span>Responsive</span></div>
        </div>
      </div>
      <div className="hero-card">
        <div className="card-glow"></div>
        <img src="/logo.jpg" alt="Waxbarashada DDS"/>
        <div className="hero-card-content">
          <span>EXAM PORTAL</span>
          <h3>Knowledge • Integrity • Progress</h3>
          <p>Digital assessment designed for schools and education offices.</p>
        </div>
        <div className="floating-card one"><Clock3 size={17}/><span>Timed exams</span></div>
        <div className="floating-card two"><ShieldCheck size={17}/><span>Admin controlled</span></div>
      </div>
    </section>

    <section className="feature-section">
      <div className="section-head"><span>WHY THIS SYSTEM</span><h2>Everything students need to take an exam.</h2></div>
      <div className="features">
        <Feature icon={<GraduationCap/>} title="Student friendly" text="Clean interface that works on phones, tablets and computers."/>
        <Feature icon={<Clock3/>} title="Timed examination" text="Countdown timer helps keep every examination within its duration."/>
        <Feature icon={<ShieldCheck/>} title="Admin controlled" text="Results and examination management stay inside the admin portal."/>
        <Feature icon={<BookOpen/>} title="Ready to expand" text="Designed so a real backend, database and payment/API services can be connected."/>
      </div>
    </section>

    <section className="preview">
      <div>
        <span className="section-kicker">AVAILABLE NOW</span>
        <h2>Choose an examination</h2>
        <p>Students can select an active examination and enter their full name and student ID before starting.</p>
      </div>
      <div className="exam-preview-grid">
        {exams.slice(0,2).map(e => <ExamCard key={e.id} exam={e} onStart={() => openExam(e)}/>)}
      </div>
    </section>
  </main>
}

function Feature({icon,title,text}) {
  return <div className="feature-card"><div className="icon-box">{icon}</div><h3>{title}</h3><p>{text}</p></div>
}

function ExamList({exams, openExam, setPage}) {
  return <main className="page">
    <div className="page-title"><div><span className="section-kicker">EXAMINATIONS</span><h1>Available examinations</h1><p>Select an exam to continue.</p></div><button className="secondary" onClick={()=>setPage("home")}><ChevronLeft size={17}/> Home</button></div>
    <div className="exam-grid">{exams.map(e=><ExamCard key={e.id} exam={e} onStart={()=>openExam(e)}/>)}</div>
  </main>
}

function ExamCard({exam,onStart}) {
  return <div className="exam-card">
    <div className="exam-top"><div className="subject-icon"><BookOpen size={20}/></div><span className="status-pill">ACTIVE</span></div>
    <span className="muted">{exam.grade} • {exam.subject}</span>
    <h3>{exam.title}</h3>
    <div className="exam-meta"><span><Clock3 size={15}/> {exam.duration} min</span><span><BookOpen size={15}/> {exam.questions.length} questions</span></div>
    <button className="primary full" onClick={onStart}>Continue <ArrowRight size={16}/></button>
  </div>
}

function StudentGate({exam,setStudent,student,setPage}) {
  const [name,setName]=useState(student?.name||"");
  const [id,setId]=useState(student?.id||"");
  const [error,setError]=useState("");

  const submit=(e)=>{
    e.preventDefault();
    if(name.trim().split(/\s+/).length < 2) return setError("Please enter your full name.");
    if(id.trim().length < 2) return setError("Please enter your student ID.");
    setStudent({name:name.trim(),id:id.trim()});
    setPage("take-exam");
  };

  return <main className="page narrow">
    <div className="gate-card">
      <img className="gate-logo" src="/logo.jpg" alt="Logo"/>
      <span className="section-kicker">STUDENT VERIFICATION</span>
      <h1>{exam?.title}</h1>
      <p>Enter your full name and student ID. Your result will be recorded for the administrator.</p>
      <form onSubmit={submit} className="form">
        <label>Full name<input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Ahmed Ali Hassan" /></label>
        <label>Student ID<input value={id} onChange={e=>setId(e.target.value)} placeholder="e.g. ST-2026-001" /></label>
        {error && <div className="error">{error}</div>}
        <button className="primary full" type="submit">Start Examination <ArrowRight size={17}/></button>
      </form>
      <button className="text-btn" onClick={()=>setPage("exams")}><ChevronLeft size={16}/> Back to exams</button>
    </div>
  </main>
}

function ExamRunner({exam,student,setPage,onResult}) {
  const [current,setCurrent]=useState(0);
  const [answers,setAnswers]=useState({});
  const [seconds,setSeconds]=useState(exam.duration*60);
  const [confirm,setConfirm]=useState(false);

  useEffect(()=>{
    const timer=setInterval(()=>setSeconds(s=>{
      if(s<=1){ clearInterval(timer); submit(); return 0; }
      return s-1;
    }),1000);
    return ()=>clearInterval(timer);
  },[]);

  const q=exam.questions[current];
  const answered=Object.keys(answers).length;
  const progress=Math.round((answered/exam.questions.length)*100);
  const time=`${String(Math.floor(seconds/60)).padStart(2,"0")}:${String(seconds%60).padStart(2,"0")}`;

  function choose(i){setAnswers(a=>({...a,[q.id]:i}))}
  function submit(){
    const score=exam.questions.reduce((n,x)=>n+(answers[x.id]===x.answer?1:0),0);
    saveResult({
      id:crypto.randomUUID?.()||String(Date.now()),
      studentName:student.name, studentId:student.id, examId:exam.id, examTitle:exam.title,
      score, total:exam.questions.length, percentage:Math.round(score/exam.questions.length*100),
      submittedAt:new Date().toISOString()
    });
    onResult();
  }

  return <main className="exam-page">
    <div className="exam-header">
      <div><span className="section-kicker">LIVE EXAMINATION</span><h2>{exam.title}</h2><p>{student.name} • {student.id}</p></div>
      <div className={seconds<60?"timer danger":"timer"}><Clock3 size={17}/>{time}</div>
    </div>
    <div className="progress-wrap"><div className="progress-bar"><span style={{width:`${progress}%`}}></span></div><span>{answered}/{exam.questions.length} answered</span></div>
    <div className="question-card">
      <div className="question-number">QUESTION {current+1} OF {exam.questions.length}</div>
      <h1>{q.q}</h1>
      <div className="options">{q.options.map((o,i)=><button key={o} className={answers[q.id]===i?"option selected":"option"} onClick={()=>choose(i)}><span>{String.fromCharCode(65+i)}</span>{o}{answers[q.id]===i&&<CheckCircle2 size={18}/>}</button>)}</div>
      <div className="question-actions">
        <button className="secondary" disabled={current===0} onClick={()=>setCurrent(c=>c-1)}><ChevronLeft size={17}/> Previous</button>
        {current<exam.questions.length-1
          ? <button className="primary" onClick={()=>setCurrent(c=>c+1)}>Next <ChevronRight size={17}/></button>
          : <button className="primary" onClick={()=>setConfirm(true)}><Send size={16}/> Submit exam</button>}
      </div>
    </div>
    {confirm && <div className="modal-backdrop"><div className="modal"><div className="modal-icon"><Send/></div><h2>Submit examination?</h2><p>You answered {answered} of {exam.questions.length} questions. Once submitted, your answers cannot be changed.</p><div className="modal-actions"><button className="secondary" onClick={()=>setConfirm(false)}>Continue exam</button><button className="primary" onClick={submit}>Submit now</button></div></div></div>}
  </main>
}

function Submitted({setPage}) {
  return <main className="page narrow"><div className="success-card"><div className="success-icon"><CheckCircle2/></div><span className="section-kicker">SUBMISSION COMPLETE</span><h1>Your examination has been submitted.</h1><p>Your answers have been recorded. Examination results are managed by the administrator.</p><button className="primary" onClick={()=>setPage("home")}>Return Home <ArrowRight size={17}/></button></div></main>
}

function AdminLogin({setPage}) {
  const [user,setUser]=useState(""); const [pass,setPass]=useState(""); const [error,setError]=useState("");
  const login=(e)=>{e.preventDefault(); if(user==="admin" && pass==="admin123"){setPage("admin")}else setError("Demo credentials: admin / admin123")};
  return <main className="page narrow"><div className="gate-card admin-gate"><div className="admin-lock"><LockKeyhole/></div><span className="section-kicker">ADMIN PORTAL</span><h1>Sign in to manage exams</h1><p>Results are not shown to students. They are available only in the administrator area.</p><form onSubmit={login} className="form"><label>Username<input value={user} onChange={e=>setUser(e.target.value)} placeholder="admin"/></label><label>Password<input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••"/></label>{error&&<div className="error">{error}</div>}<button className="primary full">Sign in <LogIn size={17}/></button></form></div></main>
}

function AdminDashboard({results,exams,setExams,refresh}) {
  const [tab,setTab]=useState("results");
  const [selectedStudent,setSelectedStudent]=useState("");
  const total=results.length;
  const avg=total?Math.round(results.reduce((a,r)=>a+r.percentage,0)/total):0;

  const clearResults=()=>{if(confirm("Delete all demo results?")){localStorage.removeItem("exam_results");refresh()}};
  const addDemo=()=>{
    const id="exam-"+Date.now();
    const newExam={id,title:"New School Examination",subject:"General",grade:"Grade 9",duration:30,questions:demoQuestions};
    const updated=[...exams,newExam]; localStorage.setItem("exam_exams",JSON.stringify(updated)); setExams(updated);
  };

  return <main className="admin-page">
    <div className="admin-title"><div><span className="section-kicker">ADMIN DASHBOARD</span><h1>Examination management</h1><p>Monitor submissions and manage the exam catalogue.</p></div><div className="admin-badge"><ShieldCheck size={16}/> Administrator</div></div>
    <div className="dashboard-grid">
      <div className="dash-stat"><Users/><div><strong>{total}</strong><span>Submissions</span></div></div>
      <div className="dash-stat"><Trophy/><div><strong>{avg}%</strong><span>Average score</span></div></div>
      <div className="dash-stat"><BookOpen/><div><strong>{exams.length}</strong><span>Examinations</span></div></div>
    </div>
    <div className="tabs">
      <button className={tab==="results"?"active":""} onClick={()=>setTab("results")}>Results</button>
      <button className={tab==="reports"?"active":""} onClick={()=>setTab("reports")}>Grade Reports</button>
      <button className={tab==="exams"?"active":""} onClick={()=>setTab("exams")}>Examinations</button>
    </div>
    {tab==="results" && <section className="table-card">
      <div className="table-head"><div><h2>Student submissions</h2><p>Student results are visible here only.</p></div><button className="danger-btn" onClick={clearResults}>Clear demo results</button></div>
      {results.length===0?<div className="empty"><Users size={30}/><h3>No submissions yet</h3><p>Student exam submissions will appear here.</p></div>:
      <div className="table-wrap"><table><thead><tr><th>Student</th><th>ID</th><th>Examination</th><th>Score</th><th>Submitted</th></tr></thead><tbody>{results.map(r=><tr key={r.id}><td><strong>{r.studentName}</strong></td><td>{r.studentId}</td><td>{r.examTitle}</td><td><span className="score-pill">{r.score}/{r.total} • {r.percentage}%</span></td><td>{new Date(r.submittedAt).toLocaleString()}</td></tr>)}</tbody></table></div>}
    </section>}
    {tab==="reports" && <GradeReports results={results} />}

    {tab==="exams" && <section className="table-card"><div className="table-head"><div><h2>Exam catalogue</h2><p>Demo exam management. Connect to a backend for production.</p></div><button className="primary" onClick={addDemo}>+ Add exam</button></div><div className="table-wrap"><table><thead><tr><th>Title</th><th>Grade</th><th>Subject</th><th>Duration</th><th>Questions</th></tr></thead><tbody>{exams.map(e=><tr key={e.id}><td><strong>{e.title}</strong></td><td>{e.grade}</td><td>{e.subject}</td><td>{e.duration} min</td><td>{e.questions.length}</td></tr>)}</tbody></table></div></section>}
  </main>
}


function getGrade(p) {
  if (p >= 90) return {letter:"A+", label:"Excellent"};
  if (p >= 80) return {letter:"A", label:"Very Good"};
  if (p >= 70) return {letter:"B", label:"Good"};
  if (p >= 60) return {letter:"C", label:"Satisfactory"};
  if (p >= 50) return {letter:"D", label:"Pass"};
  return {letter:"F", label:"Fail"};
}

function GradeReports({results}) {
  const students = useMemo(() => {
    const map = {};
    results.forEach(r => {
      if (!map[r.studentId]) map[r.studentId] = {name:r.studentName, id:r.studentId, results:[]};
      map[r.studentId].results.push(r);
    });
    return Object.values(map).sort((a,b)=>a.name.localeCompare(b.name));
  }, [results]);

  const [selected,setSelected] = useState(students[0]?.id || "");

  useEffect(() => {
    if (!students.some(s=>s.id===selected)) setSelected(students[0]?.id || "");
  }, [students, selected]);

  const student = students.find(s=>s.id===selected);
  const average = student ? Math.round(student.results.reduce((a,r)=>a+r.percentage,0)/student.results.length) : 0;
  const grade = getGrade(average);

  const printReport = () => window.print();

  if (!student) return <section className="table-card"><div className="empty"><Trophy size={30}/><h3>No student reports yet</h3><p>Once students submit examinations, their grade reports will appear here.</p></div></section>;

  return <section className="report-section">
    <div className="report-toolbar no-print">
      <div>
        <h2>Student Grade Report</h2>
        <p>Generate a printable report from the student's examination records.</p>
      </div>
      <div className="report-controls">
        <select value={selected} onChange={e=>setSelected(e.target.value)}>
          {students.map(s=><option key={s.id} value={s.id}>{s.name} — {s.id}</option>)}
        </select>
        <button className="primary" onClick={printReport}>Print / Save PDF</button>
      </div>
    </div>

    <div className="report-card" id="student-grade-report">
      <div className="report-header">
        <img src="/logo.jpg" alt="Education Bureau logo"/>
        <div>
          <div className="report-kicker">WAXBARASHADA DDS</div>
          <h1>Student Grade Report</h1>
          <p>Official Examination Performance Summary</p>
        </div>
        <div className="report-grade"><strong>{grade.letter}</strong><span>{grade.label}</span></div>
      </div>

      <div className="student-info">
        <div><span>Student Name</span><strong>{student.name}</strong></div>
        <div><span>Student ID</span><strong>{student.id}</strong></div>
        <div><span>Examinations</span><strong>{student.results.length}</strong></div>
        <div><span>Average</span><strong>{average}%</strong></div>
      </div>

      <div className="report-table-wrap">
        <table className="report-table">
          <thead><tr><th>#</th><th>Examination</th><th>Score</th><th>Percentage</th><th>Grade</th></tr></thead>
          <tbody>
            {student.results.map((r,i)=>{
              const g=getGrade(r.percentage);
              return <tr key={r.id}><td>{i+1}</td><td>{r.examTitle}</td><td>{r.score}/{r.total}</td><td>{r.percentage}%</td><td><strong>{g.letter}</strong></td></tr>
            })}
          </tbody>
        </table>
      </div>

      <div className="report-summary">
        <div><span>Overall Average</span><strong>{average}%</strong></div>
        <div><span>Overall Grade</span><strong>{grade.letter}</strong></div>
        <div><span>Status</span><strong>{average >= 50 ? "PASS" : "FAIL"}</strong></div>
      </div>

      <div className="report-footer">
        <div>Generated: {new Date().toLocaleDateString()}</div>
        <div>Administrator Signature: ____________________</div>
      </div>
    </div>
  </section>
}

createRoot(document.getElementById("root")).render(<App />);
