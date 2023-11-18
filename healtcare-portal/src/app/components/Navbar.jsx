import Link from 'next/link';

const Navbar = (props) => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex items-center justify-between">
                <Link href="/" className="text-white text-2xl font-bold">
                    health care portal
                </Link>

                <ul className="flex space-x-4">
                    {props.show ? (
                        <li>
                            <Link href="/symptoms" className="text-white hover:underline">
                                Symptoms
                            </Link>
                        </li>
                    ) : null}


                    <li>
                        <Link href="/treatment" className="text-white hover:underline">
                            Treatment
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className="text-white hover:underline">
                            About
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
