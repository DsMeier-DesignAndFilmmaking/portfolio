// ✅ STATIC NAVBAR - Accepts mobile visibility prop
import Image from 'next/image';
import Link from 'next/link';

interface StaticNavbarProps {
  isMobileVisible?: boolean;
}

export default function StaticNavbar({ isMobileVisible = true }: StaticNavbarProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  return (
    <header 
      className={`
        sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b border-gray-200
        transition-transform duration-500 ease-in-out
        md:translate-y-0
        ${isMobileVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      <nav className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
        
        {/* Left: Logo */}
        <Link 
          href="/" 
          className="flex items-center hover:opacity-80 transition-opacity h-12"
          aria-label="Dan Meier - Home"
        >
          <Image
            src={`${basePath}/images/signature-25.png`}
            alt="Dan Meier logo"
            width={86}
            height={29}
            priority
            className="h-7 w-auto max-h-full object-contain"
          />
        </Link>

        {/* Right: Navigation */}
        <ul className="flex items-center gap-8">
          <li>
            <Link
              href="#about"
              className="text-sm font-medium text-[#2F2A3B]/80 hover:text-[#2F2A3B] hover:underline underline-offset-4 transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="#work"
              className="text-sm font-medium text-[#2F2A3B]/80 hover:text-[#2F2A3B] hover:underline underline-offset-4 transition-colors"
            >
              Work
            </Link>
          </li>
          <li>
            <Link
              href="#travelogue"
              className="text-sm font-medium text-[#2F2A3B]/80 hover:text-[#2F2A3B] hover:underline underline-offset-4 transition-colors"
            >
              Travelogue
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="text-sm font-medium text-[#2F2A3B]/80 hover:text-[#2F2A3B] hover:underline underline-offset-4 transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>

      </nav>
    </header>
  );
}
