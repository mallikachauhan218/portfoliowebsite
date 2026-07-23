export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="d-flex align-items-center justify-content-center ">
      <div className="text-center">© {year} Mallika Chauhan. All rights reserved.</div>
      {/* <span>Designed &amp; Built with ♥ &amp; GSAP</span> */}
    </footer>
  );
}
