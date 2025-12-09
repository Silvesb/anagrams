import { Head, Link } from "@inertiajs/react";

export default function Welcome() {
    return (
        <>
            <Head title="Welcome">
            </Head>
            <div className="container text-center">
                <h1 className="mb-4">Welcome to the anagram finder</h1>
                <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
                    <Link href="/wordbase/import" className="btn btn-primary">
                        Import Wordbase
                    </Link>

                    <Link href="/anagram/search" className="btn btn-primary">
                        Find Anagrams
                    </Link>
                </div>
            </div>
        </>
    );
}
