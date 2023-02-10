import BoardCSS from './Board.module.css'
import { useNavigate } from 'react-router-dom';

function Board({ board : {boardCode, boardTitle, memberId, imgUrl, regDate}}) {

    const navigate = useNavigate();

    const onClickBoardHandler = (boardCode) => {
        navigate(`/board/${boardCode}`, { replace: false });
    }

    return (
        <div 
            className={ BoardCSS.boardDiv }
            onClick={ () => onClickBoardHandler(boardCode) }
        >
            <img src={ imgUrl } alt="이미지확인!"/>
            <h5>{ boardTitle }</h5>
            {/* <h5>{ memberId }</h5> */}
            {/* <h5>{ regDate }</h5> */}
        </div>
    );
}

export default Board;