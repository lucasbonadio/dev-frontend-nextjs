import Link from "next/link";

type BackButtonProps = {
  href: string;
  text?: string; 
  className?: string; 
};

export function BackButton({
  href,
  text = "Voltar",
}: BackButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-3xl bg-blue-600 text-white hover:bg-blue-700 transition font-medium shadow w-fit`}
      aria-label={text}
    >
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeWidth="2" d="M15 19l-7-7 7-7" />
      </svg>
      {text}
    </Link>
  );
}