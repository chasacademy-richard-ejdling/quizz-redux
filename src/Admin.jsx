import { useReducer, useRef, useState } from "react"
import { setQuizz } from "./redux/quizz";

function quizzReducer(state, action) {
    switch (action.type) {
        case 'SET_TITLE':
            return { ...state, title: action.payload };
        case 'SET_QUESTION':
            return { ...state, questions: [...state.questions, action.payload] };
        case 'DELETE_QUESTION':
            return { ...state, questions: state.questions.filter(question => question.id != action.payload) };
        case 'EDIT_QUESTION':
            return { ...state, questions: state.questions.map(question => question.id === action.payload.id ? action.payload : question) };
        case 'RESET_QUIZ':
            return { title: '', questions: [] }
    }
}

let count = 0
let message = ''

export default function Admin() {
    const [quizz, dispatchQuiz] = useReducer(quizzReducer, {
        title: '',
        questions: [],
    })

    const [title, setTitle] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [question, setQuestion] = useState('')
    const [newQuestion, setNewQuestion] = useState({ default: '', new: '' })
    const [altOne, setAltOne] = useState('')
    const [newAltOne, setNewAltOne] = useState({ default: '', new: '' })
    const [altX, setAltX] = useState('')
    const [newAltX, setNewAltX] = useState({ default: '', new: '' })
    const [altTwo, setAltTwo] = useState('')
    const [newAltTwo, setNewAltTwo] = useState({ default: '', new: '' })
    const [correct, setCorrect] = useState('')
    const [newCorrect, setNewCorrect] = useState({ default: '', new: '' })
    const [editingTitle, setEditingTitle] = useState(false)
    const [isEditing, setIsEditing] = useState({ state: false, id: 0 })


    const questionRef = useRef(null)
    const altOneRef = useRef(null)
    const altXRef = useRef(null)
    const altTwoRef = useRef(null)

    function handleTitleChange() {
        dispatchQuiz({
            type: 'SET_TITLE',
            payload: newTitle ? newTitle : title
        })
        setEditingTitle(false)
    }

    function handleChange(id) {
        dispatchQuiz({
            type: 'EDIT_QUESTION',
            payload: {
                question: newQuestion.new ? newQuestion.new : newQuestion.default,
                alts: [
                    newAltOne.new ? newAltOne.new : newAltOne.default,
                    newAltX.new ? newAltX.new : newAltX.default,
                    newAltTwo.new ? newAltTwo.new : newAltTwo.default
                ],
                correctAnswer: newCorrect.new,
                id: id
            }
        })
        setIsEditing({ state: false, id: 0 })
    }

    function handleAddQuestion(e) {
        dispatchQuiz({
            type: 'SET_QUESTION',
            payload: {
                question: question,
                alts: [altOne, altX, altTwo],
                correctAnswer: correct,
                id: count++
            }
        })
        e.preventDefault()
        setCorrect('')
        setQuestion('')
        setAltOne('')
        setAltX('')
        setAltTwo('')
        questionRef.current.value = ''
        altOneRef.current.value = ''
        altXRef.current.value = ''
        altTwoRef.current.value = ''
        questionRef.current.focus()
    }

    function handleEditClick(id, defQ, alts, corr) {
        setIsEditing({ ...isEditing, state: true, id: id })
        setNewQuestion({ ...newQuestion, default: defQ })
        setNewAltOne({ ...newAltOne, default: alts[0] })
        setNewAltX({ ...newAltX, default: alts[1] })
        setNewAltTwo({ ...newAltTwo, default: alts[2] })
        setNewCorrect({ ...newCorrect, default: corr })
    }

    function handleCreateQuizz() {
        setQuizz(quizz)
        dispatchQuiz({ type: 'RESET_QUIZ' })
        setTitle('')
        setQuestion('')
        setAltOne('')
        setAltX('')
        setAltTwo('')
        setCorrect('')
        message = 'Quizz created. Go to the "Take Quizz" tab to take it or create another one.'
    }

    return (
        <>
            <h1 className="text-center text-4xl font-bold p-2">Create Quizz</h1>
            <div className="w-3/4 mx-auto">
                <section className="inline-block align-top w-1/2">
                    <fieldset className="border-black border-[1px] bg-emerald-100">
                        <div className="m-4 text-center">
                            {!quizz.title ? (
                                <form onSubmit={(e) => { message = '', dispatchQuiz({ type: 'SET_TITLE', payload: title }), e.preventDefault() }} className="flex flex-col gap-2 items-center">
                                    <div>
                                        <label htmlFor="name">Quiz name: </label>
                                        <input type="text" id="name" onChange={(event) => setTitle(event.target.value)} />
                                    </div>
                                    <button type="submit" disabled={!title} className="px-2 border border-black rounded-md bg-gray-50 enabled:hover:bg-gray-200 w-fit disabled:opacity-70">Add</button>
                                </form>
                            ) : (
                                <form onSubmit={(e) => handleAddQuestion(e)}>
                                    <div className="grid grid-cols-[repeat(2,_auto)] grid-rows-[repeat(4,_auto)] gap-2 mb-2">
                                        <div>
                                            <div>
                                                <label htmlFor="question">Question: </label>
                                                <input type="text" id="question" ref={questionRef} onChange={(event) => setQuestion(event.target.value)} />
                                            </div>
                                        </div>
                                        <p>Correct answer:</p>
                                        <div>
                                            <label htmlFor="1" className="font-mono">1. </label>
                                            <input type="text" id="1" ref={altOneRef} onChange={(event) => setAltOne(event.target.value)} />
                                        </div>
                                        <input type="radio" name="correct-answer" value='0' checked={correct === '0'} onChange={(event) => setCorrect(event.target.value)} className="ml-2 h-4 self-center" />
                                        <div>
                                            <label htmlFor="x" className="font-mono">X. </label>
                                            <input type="text" id="x" ref={altXRef} onChange={(event) => setAltX(event.target.value)} />
                                        </div>
                                        <input type="radio" name="correct-answer" value='1' checked={correct === '1'} onChange={(event) => setCorrect(event.target.value)} className="ml-2 h-4 self-center" />
                                        <div>
                                            <label htmlFor="2" className="font-mono">2. </label>
                                            <input type="text" id="2" ref={altTwoRef} onChange={(event) => setAltTwo(event.target.value)} />
                                        </div>
                                        <input type="radio" name="correct-answer" value='2' checked={correct === '2'} onChange={(event) => setCorrect(event.target.value)} className="ml-2 h-4 self-center" />
                                    </div>
                                    <button type="submit" disabled={!question || !altOne || !altX || !altTwo || !correct} className="px-2 border border-black rounded-md bg-gray-50 enabled:hover:bg-gray-200 w-fit disabled:opacity-70">Add</button>
                                </form>
                            )}
                        </div>
                    </fieldset>
                </section>
                <section className="inline-block align-top w-1/2 px-8">
                    <h2 className="mb-2 text-center">Preview</h2>
                    <p>{message}</p>
                    {!editingTitle ? quizz.title && (
                        <div className="flex justify-center">
                            <p className="font-bold text-xl inline mr-2">{quizz.title}</p>
                            <button onClick={() => setEditingTitle(true)} className="px-2 border border-black rounded-md bg-gray-50 enabled:hover:bg-gray-200 w-fit disabled:opacity-70">Edit</button>
                        </div>
                    ) : (
                        <>
                            <input type="text" onChange={(event) => setNewTitle(event.target.value)} defaultValue={quizz.title} />
                            <button onClick={() => setEditingTitle(false)} className="px-2 border border-black rounded-md bg-gray-50 enabled:hover:bg-gray-200 w-fit disabled:opacity-70 mr-1">Cancel</button>
                            <button onClick={handleTitleChange} className="px-2 border border-black rounded-md bg-gray-50 enabled:hover:bg-gray-200 w-fit disabled:opacity-70">Apply</button>
                        </>
                    )}
                    <br />
                    {quizz.questions.map((question) => {
                        let qCount = 0
                        return (
                            <div key={question.id}>
                                {isEditing.state && isEditing.id === question.id ? (
                                    <>
                                        <input type="text" onChange={(event) => setNewQuestion({ ...newQuestion, new: event.target.value })} defaultValue={question.question} />
                                        <button onClick={() => setIsEditing({ ...isEditing, state: false })} className="px-2 border border-black rounded-md bg-gray-50 enabled:hover:bg-gray-200 w-fit disabled:opacity-70 mr-1">Cancel</button>
                                        <button onClick={() => handleChange(question.id)} className="px-2 border border-black rounded-md bg-gray-50 enabled:hover:bg-gray-200 w-fit disabled:opacity-70">Apply</button>
                                    </>
                                ) : (
                                    <>
                                        <span className="font-semibold mr-2">{question.question}</span>
                                        <button onClick={() => handleEditClick(question.id, question.question, question.alts, question.correctAnswer)} className="px-2 border border-black rounded-md bg-gray-50 enabled:hover:bg-gray-200 w-fit disabled:opacity-70 mr-1">Edit</button>
                                        <button onClick={() => dispatchQuiz({ type: 'DELETE_QUESTION', payload: question.id })} className="px-2 border border-black rounded-md bg-gray-50 enabled:hover:bg-gray-200 w-fit disabled:opacity-70">Delete</button>
                                    </>
                                )}

                                <div className="flex flex-col">
                                    {question.alts.map((alt, i) => {
                                        if (isEditing.state && isEditing.id === question.id) {
                                            switch (qCount) {
                                                case 0:
                                                    qCount++
                                                    return (
                                                        <div key={i}>
                                                            <label htmlFor="changeCorrect1">1. </label>
                                                            <input type='text' defaultValue={alt} onChange={(event) => setNewAltOne({ ...newAltOne, new: event.target.value })} />
                                                            <input type="radio" id="changeCorrect1" name="correct-answer" value='0' defaultChecked={question.correctAnswer === '0'} onClick={(event) => setNewCorrect({ ...newCorrect, new: event.target.value })} className="ml-2 h-4 self-center" />
                                                        </div>
                                                    )

                                                case 1:
                                                    qCount++
                                                    return (
                                                        <div key={i}>
                                                            <label htmlFor="changeCorrectX">X. </label>
                                                            <input type='text' defaultValue={alt} onChange={(event) => setNewAltX({ ...newAltX, new: event.target.value })} />
                                                            <input type="radio" id="changeCorrectX" name="correct-answer" value='1' defaultChecked={question.correctAnswer === '1'} onClick={(event) => setNewCorrect({ ...newCorrect, new: event.target.value })} className="ml-2 h-4 self-center" />
                                                        </div>
                                                    )
                                                case 2:
                                                    qCount++
                                                    return (
                                                        <div key={i}>
                                                            <label htmlFor="changeCorrect2">2. </label>
                                                            <input type='text' defaultValue={alt} onChange={(event) => setNewAltTwo({ ...newAltTwo, new: event.target.value })} />
                                                            <input type="radio" id="changeCorrect2" name="correct-answer" value='2' defaultChecked={question.correctAnswer === '2'} onClick={(event) => setNewCorrect({ ...newCorrect, new: event.target.value })} className="ml-2 h-4 self-center" />
                                                        </div>
                                                    )
                                            }
                                        } else {
                                            switch (qCount) {
                                                case 0:
                                                    qCount++
                                                    return (
                                                        <p key={i} style={{ color: question.correctAnswer === '0' ? 'green' : 'red' }}> {`1. ${alt}`}</p>
                                                    )

                                                case 1:
                                                    qCount++
                                                    return <p key={i} style={{ color: question.correctAnswer === '1' ? 'green' : 'red' }}>{`X. ${alt}`}</p>;
                                                case 2:
                                                    qCount++
                                                    return <p key={i} style={{ color: question.correctAnswer === '2' ? 'green' : 'red' }}>{`2. ${alt}`}</p>;
                                            }
                                        }
                                    })}
                                </div>
                            </div>
                        )
                    })}
                    <br />
                    <button onClick={handleCreateQuizz} disabled={!quizz.questions[0]} className="block mx-auto px-2 border border-black rounded-md bg-gray-50 enabled:hover:bg-gray-200 w-fit disabled:opacity-70">Create Quizz</button>
                </section>
            </div >
        </>
    )
}