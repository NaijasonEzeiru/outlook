export default function Footer() {
  return (
    <footer className="absolute left-0 sm:left-auto sm:right-0 bottom-0 w-fit overflow-visible z-50 min-h-5 clear-both mx-2 text-black/70 text-xs">
      <a
        className="mx-2 hover:underline"
        href="https://www.microsoft.com/en-US/servicesagreement/"
        target="_blank"
      >
        Terms of use
      </a>
      <a
        className="mx-2 hover:underline"
        href="https://privacy.microsoft.com/en-US/privacystatement"
        target="_blank"
      >
        Privacy &amp; cookies
      </a>
      <a className="mx-2">...</a>
    </footer>
  );
}
