import { Link } from "react-router-dom";

export default function Home() {
    return(
        <section className="flex flex-col justify-center items-center gap-2 py-4 underline">
            <Link to={'/admin'}>Create Quizz</Link>
            <Link to={'/quizz'}>Take Quizz</Link>
        </section>
    )
}