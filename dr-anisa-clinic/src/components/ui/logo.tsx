export function ClinicLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Outer elegant circle/swirl */}
      <path d="M50 5C25.147 5 5 25.147 5 50C5 74.853 25.147 95 50 95C74.853 95 95 74.853 95 50" stroke="#1F5E3B" strokeWidth="3" strokeLinecap="round" />
      
      {/* Abstract profile / wellness shape */}
      <path d="M45 20C45 20 25 35 30 65C32 77 45 80 45 80C45 80 40 60 50 50C60 40 70 50 70 50C70 50 65 30 45 20Z" fill="#1F5E3B" />
      
      {/* Golden leaf */}
      <path d="M55 55C55 55 65 70 85 65C85 65 80 50 65 50C55 50 55 55 55 55Z" fill="#C9A227" />
      
      {/* Green leaf */}
      <path d="M35 75C35 75 45 95 65 90C65 90 60 75 45 70C35 65 35 75 35 75Z" fill="#7DAA5C" />
    </svg>
  );
}
