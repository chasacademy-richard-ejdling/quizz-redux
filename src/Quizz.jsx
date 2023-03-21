import { useState } from "react"
import { useQuizz } from "./redux/quizz"

export default function Quizz() {
    const [isPlaying, setIsPlaying] = useState({ hasStarted: false, currentQuizz: 0, nrOfQuestions: 0, currentQuestion: 0, score: 0 })
    const [isChecked, setIsChecked] = useState('')

    const quizzes = useQuizz().quizzes

    function handleStart(index, nr) {
        setIsPlaying({ ...isPlaying, hasStarted: true, currentQuizz: index, nrOfQuestions: nr })
    }

    function handleAnswer(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const formJson = Object.fromEntries(formData.entries())
        console.log(formJson)

        if (formJson.answer === quizzes[isPlaying.currentQuizz].questions[isPlaying.currentQuestion].correctAnswer) {
            setIsPlaying({ ...isPlaying, score: isPlaying.score++, currentQuestion: isPlaying.currentQuestion++ })
        } else {
            setIsPlaying({ ...isPlaying, currentQuestion: isPlaying.currentQuestion++ })
        }

        setIsPlaying({ ...isPlaying })
        setIsChecked('')
    }

    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold p-2">Take Quizz</h1>
            {!isPlaying.hasStarted ? (
                <>
                    <ul className="flex flex-col items-center gap-2">
                        {quizzes.map((quizz, i) => <button key={i} onClick={() => {
                            handleStart(i, quizz.questions.length)
                        }
                        } className="px-2 border border-black rounded-md bg-gray-50 enabled:hover:bg-gray-200 w-fit disabled:opacity-70">{quizz.title}</button>)}
                    </ul>
                </>
            ) : isPlaying.currentQuestion === isPlaying.nrOfQuestions ? (
                <>
                    <h2 className="font-semibold text-2xl">{quizzes[isPlaying.currentQuizz].title}</h2>
                    <p>Result: {isPlaying.score}/{isPlaying.nrOfQuestions}</p>
                    <button onClick={() => setIsPlaying({ hasStarted: false, currentQuizz: 0, nrOfQuestions: 0, currentQuestion: 0, score: 0 })} className="justify-self-center px-2 border border-black rounded-md bg-gray-50 enabled:hover:bg-gray-200 w-fit disabled:opacity-70 mt-2">New Quizz</button>
                </>
            ) : (
                <>
                    <h2 className="font-semibold text-2xl">{quizzes[isPlaying.currentQuizz].title}</h2>
                    <br />
                    <h3 className="font-semibold text-xl">{isPlaying.currentQuestion + 1}. {quizzes[isPlaying.currentQuizz].questions[isPlaying.currentQuestion].question}</h3>
                    <form onSubmit={handleAnswer} className="grid grid-cols-[repeat(2,_auto)] grid-rows-[repeat(4,_auto)] gap-2 justify-center">
                        <label className="w-fit" htmlFor="1">1. {quizzes[isPlaying.currentQuizz].questions[isPlaying.currentQuestion].alts[0]}</label>
                        <input onChange={() => setIsChecked('1')} checked={isChecked === '1'} className="w-fit" type="radio" id="1" name="answer" value='0' />
                        <label className="w-fit" htmlFor="x">X. {quizzes[isPlaying.currentQuizz].questions[isPlaying.currentQuestion].alts[1]}</label>
                        <input onChange={() => setIsChecked('x')} checked={isChecked === 'x'} className="w-fit" type="radio" id="x" name="answer" value='1' />
                        <label className="w-fit" htmlFor="2">2. {quizzes[isPlaying.currentQuizz].questions[isPlaying.currentQuestion].alts[2]}</label>
                        <input onChange={() => setIsChecked('2')} checked={isChecked === '2'} className="w-fit" type="radio" id="2" name="answer" value='2' />
                        <button type="submit" disabled={!isChecked} className="justify-self-center px-2 border border-black rounded-md bg-gray-50 enabled:hover:bg-gray-200 w-fit disabled:opacity-70">Answer</button>
                    </form>
                </>
            )}
        </div>
    )
}