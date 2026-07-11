import "../../styles/animation.css"
export default function InputInlineError({ ErrorMsg }) {
  return (
    <>
      <span
        className="text-sm text-destructive flex items-center gap-1 fade-slide-up error-shake  py-1"
        
      >
        <div className="material-symbols-outlined  text-error" style={{fontSize:"18px",fontWeight:"700"}}>
                    error
                  </div>
                  <p className="font-bold text-sm text-error ">{ErrorMsg}</p>
      </span>
    </>
  );
}