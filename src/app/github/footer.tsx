export default function Footer() {
  return (
    <footer className="mt-auto w-full bg-[#151b23]" role="contentinfo">
      <ul className="py-4 flex items-center justify-center flex-col md:flex-row md:gap-8 md:mx-auto text-[#9198a1] text-xs gap-2">
        <li>
          <a
            data-analytics-event='{"category":"Footer","action":"go to Terms","label":"text:terms"}'
            href="https://docs.github.com/site-policy/github-terms/github-terms-of-service"
            data-view-component="true"
            className="Link--secondary Link"
          >
            Terms
          </a>
        </li>

        <li>
          <a
            data-analytics-event='{"category":"Footer","action":"go to privacy","label":"text:privacy"}'
            href="https://docs.github.com/site-policy/privacy-policies/github-privacy-statement"
            data-view-component="true"
            className="Link--secondary Link"
          >
            Privacy
          </a>
        </li>

        <li>
          <a
            data-analytics-event='{"category":"Footer","action":"go to docs","label":"text:docs"}'
            href="https://docs.github.com"
            data-view-component="true"
            className="Link--secondary Link"
          >
            Docs
          </a>
        </li>

        <li>
          <a
            data-analytics-event='{"category":"Footer","action":"go to microsoft help","label":"text:microsoft-linked-identity-help"}'
            target="_blank"
            rel="noopener noreferrer"
            href="https://support.microsoft.com/en-us/help/4501231/microsoft-account-link-your-github-account"
            data-view-component="true"
            className="Link--secondary Link"
          >
            Contact Microsoft
          </a>
        </li>

        <li className="mx-2">Manage cookies</li>

        <li className="mx-2">Do not share my personal information</li>
      </ul>
    </footer>
  );
}
