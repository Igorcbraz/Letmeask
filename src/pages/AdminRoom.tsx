import Modal  from 'react-modal';

import { useState } from 'react';
import { useHistory, useParams} from 'react-router';

import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { ToggleTheme } from '../components/ToggleTheme';
import { Stats } from '../components/Stats';
import { Question } from '../components/Question';

import { RoomCode } from '../components/RoomCode';
import { database } from '../services/firebase';
import { useRoom } from '../hooks/useRoom';

import Delete from '../assets/images/delete.svg';

import '../styles/room.css';
import '../styles/question.css';


type RoomsParams = {
    id: string;
}

export function AdminRoom() {
    const [modalDeleteIsOpen, setDeleteIsOpen] = useState(false);
    const [modalRoomOffIsOpen, setRoomOffIsOpen] = useState(false);
    const history = useHistory();
    const params = useParams<RoomsParams>();
    const roomId = params.id;

    const { title, questions} = useRoom(roomId);

    async function handleDeleteRoom(){
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/');
    }

    async function handleDeleteQuestion(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();

        setDeleteIsOpen(false);
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

    function getAllLikes(){
        const allLikeQuestions = questions.reduce((somaLikes, question) => {
            return somaLikes + question.likeCount;
        }, 0)

        return allLikeQuestions;
    }

    function getAllAnsweredQuestions(){            
        const allAnsweredQuestions = questions.reduce((somaAnswered, question) => {
            if(question.isAnswered){
                somaAnswered++;
            }
            return somaAnswered;
        }, 0)

        return allAnsweredQuestions;
    }

    return (
        <div id="page-root">

            <header>
                <div className="content">
                    <Logo width="157" height="75"/>
                    <div>
                    <RoomCode code={roomId} />
                    <Button isOutlined
                        onClick={() => setRoomOffIsOpen(true)}
                    >Encerrar Sala</Button>
                    <ToggleTheme/>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
                </div>

                <div className="all-stats">
                    <Stats text="Respondida(s)" firstStats={getAllAnsweredQuestions()} borderColor="var(--purple)"/>
                    <Stats text="Likes" secondStats={getAllLikes()} borderColor="var(--pink-dark)"/>
                </div>
                
                <div className="question-list">
                    {questions.map(question => {
                        return(
                            <>
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

                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12.0003" cy="11.9998" r="9.00375" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleHighlightQuestion(question.id)}    
                                        >
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => setDeleteIsOpen(true)}    
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 5.99988H5H21" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>

                                    </button>
                                </Question>

                                <Modal
                                    isOpen={modalDeleteIsOpen}
                                    aria={{
                                        labelledby: "heading",
                                        describedby: "full_description"
                                      }}
                                    id="modalDelete"
                                >
                                    <div className="modalDeleteItems">
                                        <img src={Delete} alt="??cone deletar pergunta" />

                                        <h1>Excluir Pergunta</h1>
                                        <p>Tem certeza que voc?? deseja excluir esta pergunta?</p>

                                        <div>
                                            <button id="buttonClose" onClick={() => setDeleteIsOpen(false)}>Voltar</button>
                                            <button id="buttonDelete" onClick={ () => handleDeleteQuestion(question.id)}>Sim, excluir</button>
                                        </div>
                                    </div>
                                </Modal>
                            </>
                        );
                    })}
                </div>
            </main>

            <Modal
                isOpen={modalRoomOffIsOpen}
                aria={{
                    labelledby: "heading",
                    describedby: "full_description"
                    }}
                id="modalDelete"
            >
                <div className="modalDeleteItems">
                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="var(--danger)">
                        <path d="M0 0h24v24H0V0z" fill="none"/>
                        <path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    </svg>

                    <h1>Encerrar sala</h1>
                    <p>Tem certeza que voc?? deseja encerrar esta sala?</p>

                    <div>
                        <button id="buttonClose" onClick={() => setRoomOffIsOpen(false)}>Cancelar</button>
                        <button id="buttonDelete" onClick={handleDeleteRoom}>Sim, encerrar</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}