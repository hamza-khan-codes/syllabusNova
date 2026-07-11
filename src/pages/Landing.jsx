import { useNavigate } from "react-router-dom"

export default function Landing() {
  const navigate = useNavigate()
  return (
    <div className="text-foreground">
      Landing
      <button onClick={()=>navigate("/dashboard")} className="p-5 text-lg bg-accent text-accent-foreground">
        Dashboard
      </button>
    </div>
  )
}
