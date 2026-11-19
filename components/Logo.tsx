import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  size?: number;
  className?: string;
  showText?: boolean;
  light?: boolean;
};

export default function Logo({
  size = 80,
  className = "",
  showText = true,
  light = false,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 select-none ${className}`}
      aria-label="ReclaimRefinance home"
    >
      <Image
        src="/ReclaimRefinance.png"
        alt="ReclaimRefinance logo"
        width={1774}
        height={887}
        priority
        className={`h-auto w-auto ${light ? "brightness-0 invert" : ""}`}
        style={{ height: size }}
      />
    </Link>
  );
}
