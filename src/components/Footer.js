import "../styles/Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {currentYear} SPS Group. Todos os direitos reservados.</p>
    </footer>
  );
}
