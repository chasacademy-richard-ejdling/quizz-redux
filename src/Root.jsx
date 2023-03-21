import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"

export default function Root() {
    return (
        <div className="h-screen bg-emerald-50">
            <header className="flex justify-between items-center bg-emerald-200 py-4 px-20">
                <Link className="text-4xl" to={'/'}>
                    <h1>Quizz Redux</h1>
                </Link>
                <nav className="flex gap-4 text-lg">
                    <Link to={'/admin'}>Create Quizz</Link>
                    <Link to={'/quizz'}>Take Quizz</Link>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}