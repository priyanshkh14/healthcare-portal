import Link from "next/link";

const Navbar = (props) => {
  return (
    <nav className="bg-black p-3">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-white text-2xl font-bold">
          health care portal
        </Link>

        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-white hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/symptom" className="text-white hover:underline">
              Treatment and Symptoms Report
            </Link>
          </li>
          <li>
            <Link href="/chronicDiagnosis" className="text-white hover:underline">
              Chronic Disease Detection
            </Link>
          </li>
          <li>
            <Link href="http://localhost/login_register/" className="text-white hover:underline">
              Login / SignUp
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
