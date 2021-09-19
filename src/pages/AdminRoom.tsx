import { useHistory, useParams } from 'react-router';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';

import { RoomCode } from '../components/RoomCode';
//import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';

import '../styles/room.css';
import '../styles/question.css';
import { database } from '../services/firebase';


type RoomsParams = {
    id: string;
}

export function AdminRoom() {
    //const {user} = useAuth();
    const history = useHistory();
    const params = useParams<RoomsParams>();
    const roomId = params.id;

    const { title, questions } = useRoom(roomId);

    async function handleDeleteRoom(){
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/');
    }

    async function handleDeleteQuestion(questionId: string){
        const confirmWindow = window.confirm('Tem certeza que deseja excluir esta pergunta?');
        if(confirmWindow){
             await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        });
    }
    async function handleHighlightQuestion(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true
        });
    }

    return (
        <div id="page-root">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask"/>
                    <div>
                    <RoomCode code={roomId} />
                    <Button isOutlined
                        onClick={handleDeleteRoom}
                    >Encerrar Sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
                </div>
                
                <div className="question-list">
                    {questions.map(question => {
                        return(
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered} 
                                isHighlighted={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => handleCheckQuestionAsAnswered(question.id)}   
                                    >
                                        <img src={checkImg} alt="Marcar pergunta como respondida" />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleHighlightQuestion(question.id)}    
                                    >
                                        <img src={answerImg} alt="Dar destaque a pergunrta" />
                                    </button>
                                </>
                                )}
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}    
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}