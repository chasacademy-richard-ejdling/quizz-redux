import { createReduxModule } from 'hooks-for-redux';

const initialState = {
    quizzes: [{
        title: 'Default Quizz',
        questions: [
            {
                question: 'What is the capital city of Sweden?',
                alts: [
                    'Malmö',
                    'Stockholm',
                    'Gothenburg'
                ],
                correctAnswer: '1',
                id: 747474
            }
        ],
    }]
}

export const [useQuizz, { setQuizz }] = createReduxModule(
    'quizz', initialState, {
    setQuizz: (state, quizz) => {
        return {
            ...state,
            quizzes: [...state.quizzes, quizz]
        }
    }
}
)