export function Loading() {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 flex justify-center items-center bg-black/20">
      <svg className="w-12 h-12 animate-spin-slower" viewBox="25 25 50 50">
        <circle
          className="stroke-[4px] stroke-white loading__path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
}
